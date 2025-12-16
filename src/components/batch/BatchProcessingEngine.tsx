import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Square, 
  Download, 
  Plus, 
  Trash2, 
  Copy,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  ImageIcon,
  Zap,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent } from '@/utils/analytics';

interface BatchJob {
  id: string;
  name: string;
  prompts: string[];
  settings: {
    style: string;
    resolution: string;
    count: number;
    quality: string;
  };
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  completedImages: string[];
  failedPrompts: string[];
  startTime?: Date;
  endTime?: Date;
  estimatedTimeRemaining?: number;
}

interface BatchSettings {
  concurrentJobs: number;
  retryAttempts: number;
  pauseBetweenJobs: number;
  saveProgress: boolean;
  notifications: boolean;
}

export const BatchProcessingEngine = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<BatchJob[]>([]);
  const [activeJob, setActiveJob] = useState<BatchJob | null>(null);
  const [newJobPrompts, setNewJobPrompts] = useState('');
  const [newJobName, setNewJobName] = useState('');
  const [batchSettings, setBatchSettings] = useState<BatchSettings>({
    concurrentJobs: 2,
    retryAttempts: 3,
    pauseBetweenJobs: 1000,
    saveProgress: true,
    notifications: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [processingStats, setProcessingStats] = useState({
    totalJobs: 0,
    completedJobs: 0,
    totalImages: 0,
    completedImages: 0,
    failedImages: 0,
    avgProcessingTime: 0
  });

  useEffect(() => {
    loadBatchJobs();
    loadBatchSettings();
  }, []);

  const loadBatchJobs = async () => {
    try {
      // Load jobs from localStorage for now - would use Supabase in production
      const savedJobs = localStorage.getItem('batchJobs');
      if (savedJobs) {
        const parsed = JSON.parse(savedJobs);
        setJobs(parsed);
      }
    } catch (error) {
      console.error('Error loading batch jobs:', error);
    }
  };

  const loadBatchSettings = () => {
    try {
      const savedSettings = localStorage.getItem('batchSettings');
      if (savedSettings) {
        setBatchSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading batch settings:', error);
    }
  };

  const saveBatchJobs = (updatedJobs: BatchJob[]) => {
    localStorage.setItem('batchJobs', JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const saveBatchSettings = (settings: BatchSettings) => {
    localStorage.setItem('batchSettings', JSON.stringify(settings));
    setBatchSettings(settings);
  };

  const createBatchJob = () => {
    if (!newJobName.trim() || !newJobPrompts.trim()) {
      toast.error('Please provide job name and prompts');
      return;
    }

    const prompts = newJobPrompts
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    if (prompts.length === 0) {
      toast.error('Please provide at least one prompt');
      return;
    }

    const newJob: BatchJob = {
      id: Math.random().toString(36).substr(2, 9),
      name: newJobName,
      prompts: prompts,
      settings: {
        style: 'photorealistic',
        resolution: '1024x1024',
        count: 1,
        quality: 'standard'
      },
      status: 'pending',
      progress: 0,
      completedImages: [],
      failedPrompts: []
    };

    const updatedJobs = [...jobs, newJob];
    saveBatchJobs(updatedJobs);
    
    setNewJobName('');
    setNewJobPrompts('');
    
    trackEvent({
      action: 'batch_job_created',
      category: 'batch_processing',
      label: 'create_job',
      custom_parameters: {
        prompt_count: prompts.length,
        job_name: newJobName
      }
    });

    toast.success(`Batch job "${newJobName}" created with ${prompts.length} prompts`);
  };

  const startBatchProcessing = async (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job || !user) {
      toast.error('Please sign in to run batch jobs');
      return;
    }

    setIsProcessing(true);
    setActiveJob(job);

    const updatedJobs = jobs.map(j => 
      j.id === jobId 
        ? { ...j, status: 'running' as const, startTime: new Date() }
        : j
    );
    saveBatchJobs(updatedJobs);

    try {
      const totalPrompts = job.prompts.length;
      let completedCount = 0;
      let failedCount = 0;
      const completedImages: string[] = [];
      const failedPrompts: string[] = [];

      for (let i = 0; i < job.prompts.length; i++) {
        const prompt = job.prompts[i];
        
        try {
          // Real API call to generate image
          const { data, error } = await supabase.functions.invoke('generate-image', {
            body: {
              prompt,
              style: job.settings.style,
              resolution: job.settings.resolution,
            },
          });
          
          if (error) throw error;
          
          if (data?.imageUrl) {
            completedImages.push(data.imageUrl);
            completedCount++;
          } else {
            throw new Error('No image URL returned');
          }
          
          const progress = ((completedCount + failedCount) / totalPrompts) * 100;
          
          // Update job progress
          const progressUpdatedJobs = jobs.map(j => 
            j.id === jobId 
              ? { 
                  ...j, 
                  progress,
                  completedImages: [...completedImages],
                  estimatedTimeRemaining: calculateETA(totalPrompts, completedCount + failedCount)
                }
              : j
          );
          saveBatchJobs(progressUpdatedJobs);
          setGlobalProgress(progress);

          // Add delay between jobs if configured
          if (batchSettings.pauseBetweenJobs > 0) {
            await new Promise(resolve => setTimeout(resolve, batchSettings.pauseBetweenJobs));
          }

        } catch (error) {
          console.error(`Failed to generate image for prompt: ${prompt}`, error);
          failedPrompts.push(prompt);
          failedCount++;
          
          // Retry logic
          let retryCount = 0;
          while (retryCount < batchSettings.retryAttempts) {
            try {
              const { data: retryData, error: retryError } = await supabase.functions.invoke('generate-image', {
                body: {
                  prompt,
                  style: job.settings.style,
                  resolution: job.settings.resolution,
                },
              });
              
              if (retryError) throw retryError;
              
              if (retryData?.imageUrl) {
                // Remove from failed if retry succeeds
                const index = failedPrompts.indexOf(prompt);
                if (index > -1) {
                  failedPrompts.splice(index, 1);
                }
                completedImages.push(retryData.imageUrl);
                completedCount++;
                failedCount--;
                break;
              }
            } catch (retryError) {
              retryCount++;
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
        }
      }

      // Complete the job
      const finalJobs = jobs.map(j => 
        j.id === jobId 
          ? { 
              ...j, 
              status: 'completed' as const,
              progress: 100,
              completedImages,
              failedPrompts,
              endTime: new Date()
            }
          : j
      );
      saveBatchJobs(finalJobs);

      // Update stats
      setProcessingStats(prev => ({
        ...prev,
        completedJobs: prev.completedJobs + 1,
        completedImages: prev.completedImages + completedCount,
        failedImages: prev.failedImages + failedCount
      }));

      if (batchSettings.notifications) {
        toast.success(`Batch job completed! ${completedCount} images generated, ${failedCount} failed.`);
      }

      trackEvent({
        action: 'batch_job_completed',
        category: 'batch_processing',
        label: 'job_completed',
        custom_parameters: {
          job_id: jobId,
          completed_count: completedCount,
          failed_count: failedCount
        }
      });

    } catch (error) {
      console.error('Batch processing error:', error);
      
      const errorJobs = jobs.map(j => 
        j.id === jobId 
          ? { ...j, status: 'failed' as const }
          : j
      );
      saveBatchJobs(errorJobs);
      
      toast.error('Batch processing failed');
    } finally {
      setIsProcessing(false);
      setActiveJob(null);
      setGlobalProgress(0);
    }
  };

  const calculateETA = (total: number, completed: number): number => {
    if (completed === 0) return 0;
    const avgTimePerImage = 8000; // 8 seconds average for real API
    return (total - completed) * avgTimePerImage;
  };


  const pauseJob = (jobId: string) => {
    const updatedJobs = jobs.map(j => 
      j.id === jobId 
        ? { ...j, status: 'paused' as const }
        : j
    );
    saveBatchJobs(updatedJobs);
    setIsProcessing(false);
    toast.info('Job paused');
  };

  const deleteJob = (jobId: string) => {
    const updatedJobs = jobs.filter(j => j.id !== jobId);
    saveBatchJobs(updatedJobs);
    toast.success('Job deleted');
  };

  const duplicateJob = (job: BatchJob) => {
    const newJob = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      name: `${job.name} (Copy)`,
      status: 'pending' as const,
      progress: 0,
      completedImages: [],
      failedPrompts: [],
      startTime: undefined,
      endTime: undefined
    };
    
    const updatedJobs = [...jobs, newJob];
    saveBatchJobs(updatedJobs);
    toast.success('Job duplicated');
  };

  const downloadResults = async (job: BatchJob) => {
    try {
      // Create a zip file with all completed images
      const zip = new (await import('jszip')).default();
      
      for (let i = 0; i < job.completedImages.length; i++) {
        const imageUrl = job.completedImages[i];
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        zip.file(`image_${i + 1}.png`, blob);
      }
      
      // Add metadata file
      const metadata = {
        jobName: job.name,
        prompts: job.prompts,
        settings: job.settings,
        completedCount: job.completedImages.length,
        failedCount: job.failedPrompts.length,
        startTime: job.startTime,
        endTime: job.endTime
      };
      
      zip.file('metadata.json', JSON.stringify(metadata, null, 2));
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${job.name}_results.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Results downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download results');
    }
  };

  const getStatusIcon = (status: BatchJob['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-gray-500" />;
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'paused': return <Pause className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{processingStats.totalJobs}</p>
            <p className="text-sm text-gray-600">Total Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{processingStats.completedImages}</p>
            <p className="text-sm text-gray-600">Images Generated</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{processingStats.failedImages}</p>
            <p className="text-sm text-gray-600">Failed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{isProcessing ? Math.round(globalProgress) : 0}%</p>
            <p className="text-sm text-gray-600">Progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="create">Create Job</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          {/* Global Progress */}
          {isProcessing && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Processing: {activeJob?.name}</span>
                  <span className="text-sm text-gray-600">{Math.round(globalProgress)}%</span>
                </div>
                <Progress value={globalProgress} className="h-2" />
                {activeJob?.estimatedTimeRemaining && (
                  <p className="text-sm text-gray-600 mt-2">
                    Estimated time remaining: {Math.round(activeJob.estimatedTimeRemaining / 1000)}s
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Jobs List */}
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {jobs.map((job) => (
                <Card key={job.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(job.status)}
                        <div>
                          <h3 className="font-medium">{job.name}</h3>
                          <p className="text-sm text-gray-600">
                            {job.prompts.length} prompts • {job.completedImages.length} completed • {job.failedPrompts.length} failed
                          </p>
                        </div>
                      </div>
                      <Badge variant={job.status === 'completed' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>

                    {job.progress > 0 && (
                      <div className="mb-3">
                        <Progress value={job.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{Math.round(job.progress)}% complete</p>
                      </div>
                    )}

                    <div className="flex gap-2 flex-wrap">
                      {job.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => startBatchProcessing(job.id)}
                          disabled={isProcessing}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      )}
                      
                      {job.status === 'running' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => pauseJob(job.id)}
                        >
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                      )}

                      {job.status === 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadResults(job)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateJob(job)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Duplicate
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteJob(job.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>

                    {/* Results Preview */}
                    {job.completedImages.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Generated Images ({job.completedImages.length})</p>
                        <div className="flex gap-2 overflow-x-auto">
                          {job.completedImages.slice(0, 5).map((imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`Generated ${index + 1}`}
                              className="w-12 h-12 object-cover rounded border"
                            />
                          ))}
                          {job.completedImages.length > 5 && (
                            <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-600">
                              +{job.completedImages.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No batch jobs yet</h3>
              <p className="text-gray-600">Create your first batch job to generate multiple images efficiently</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Batch Job</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jobName">Job Name</Label>
                <Input
                  id="jobName"
                  value={newJobName}
                  onChange={(e) => setNewJobName(e.target.value)}
                  placeholder="Enter job name..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="prompts">Prompts (one per line)</Label>
                <Textarea
                  id="prompts"
                  value={newJobPrompts}
                  onChange={(e) => setNewJobPrompts(e.target.value)}
                  placeholder="Enter prompts, one per line..."
                  rows={8}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  {newJobPrompts.split('\n').filter(p => p.trim()).length} prompts
                </p>
              </div>

              <Button onClick={createBatchJob} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Batch Job
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Processing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Concurrent Jobs</Label>
                <Input
                  type="number"
                  value={batchSettings.concurrentJobs}
                  onChange={(e) => setBatchSettings(prev => ({ ...prev, concurrentJobs: parseInt(e.target.value) || 1 }))}
                  min={1}
                  max={5}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">Maximum number of simultaneous image generations</p>
              </div>

              <div>
                <Label>Retry Attempts</Label>
                <Input
                  type="number"
                  value={batchSettings.retryAttempts}
                  onChange={(e) => setBatchSettings(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) || 0 }))}
                  min={0}
                  max={5}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">Number of retry attempts for failed generations</p>
              </div>

              <div>
                <Label>Pause Between Jobs (ms)</Label>
                <Input
                  type="number"
                  value={batchSettings.pauseBetweenJobs}
                  onChange={(e) => setBatchSettings(prev => ({ ...prev, pauseBetweenJobs: parseInt(e.target.value) || 0 }))}
                  min={0}
                  max={10000}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">Delay between individual image generations</p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="saveProgress"
                  checked={batchSettings.saveProgress}
                  onChange={(e) => setBatchSettings(prev => ({ ...prev, saveProgress: e.target.checked }))}
                />
                <Label htmlFor="saveProgress">Save progress automatically</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={batchSettings.notifications}
                  onChange={(e) => setBatchSettings(prev => ({ ...prev, notifications: e.target.checked }))}
                />
                <Label htmlFor="notifications">Enable completion notifications</Label>
              </div>

              <Button onClick={() => saveBatchSettings(batchSettings)} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};