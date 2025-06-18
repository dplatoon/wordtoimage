
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PremiumFeatureGate } from './PremiumFeatureGate';
import { Layers, Play, Pause, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface BatchJob {
  id: string;
  prompts: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  results: string[];
  createdAt: Date;
}

interface BatchGenerationProps {
  onGenerate: (prompts: string[]) => Promise<string[]>;
}

export const BatchGeneration = ({ onGenerate }: BatchGenerationProps) => {
  const [prompts, setPrompts] = useState<string>('');
  const [batchJobs, setBatchJobs] = useState<BatchJob[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const parsePrompts = (text: string): string[] => {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  const startBatchGeneration = async () => {
    const promptList = parsePrompts(prompts);
    
    if (promptList.length === 0) {
      toast.error('Please enter at least one prompt');
      return;
    }

    if (promptList.length > 10) {
      toast.error('Maximum 10 prompts per batch');
      return;
    }

    const jobId = Date.now().toString();
    const newJob: BatchJob = {
      id: jobId,
      prompts: promptList,
      status: 'running',
      progress: 0,
      results: [],
      createdAt: new Date()
    };

    setBatchJobs(prev => [newJob, ...prev]);
    setIsGenerating(true);
    setCurrentJobId(jobId);

    try {
      const results: string[] = [];
      
      for (let i = 0; i < promptList.length; i++) {
        const result = await onGenerate([promptList[i]]);
        results.push(...result);
        
        // Update progress
        const progress = ((i + 1) / promptList.length) * 100;
        setBatchJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { ...job, progress, results: [...results] }
            : job
        ));
      }

      // Mark as completed
      setBatchJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: 'completed', progress: 100 }
          : job
      ));

      toast.success(`Batch generation completed! Generated ${results.length} images.`);
      setPrompts('');
      
    } catch (error) {
      setBatchJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: 'failed' }
          : job
      ));
      toast.error('Batch generation failed');
    } finally {
      setIsGenerating(false);
      setCurrentJobId(null);
    }
  };

  const downloadAllResults = (job: BatchJob) => {
    job.results.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `batch-${job.id}-image-${index + 1}.png`;
      link.click();
    });
    toast.success('Started downloading all images');
  };

  const deleteJob = (jobId: string) => {
    setBatchJobs(prev => prev.filter(job => job.id !== jobId));
    toast.success('Batch job deleted');
  };

  return (
    <PremiumFeatureGate
      feature="Batch Generation"
      requiredPlan="pro"
      description="Generate multiple images simultaneously with different prompts"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Batch Generation
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">Pro</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-3">
            <Label htmlFor="batch-prompts">Enter Prompts (one per line, max 10)</Label>
            <textarea
              id="batch-prompts"
              value={prompts}
              onChange={(e) => setPrompts(e.target.value)}
              placeholder={`A majestic mountain landscape
A futuristic city at sunset
A peaceful garden with flowers
A powerful ocean wave`}
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none"
              disabled={isGenerating}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {parsePrompts(prompts).length} prompts ready
              </span>
              <Button 
                onClick={startBatchGeneration}
                disabled={isGenerating || parsePrompts(prompts).length === 0}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Batch
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            <h3 className="font-semibold">Batch Jobs</h3>
            
            {batchJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No batch jobs yet. Create your first batch above!
              </div>
            ) : (
              <div className="space-y-3">
                {batchJobs.map((job) => (
                  <Card key={job.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={
                                job.status === 'completed' ? 'default' : 
                                job.status === 'running' ? 'secondary' : 
                                job.status === 'failed' ? 'destructive' : 'outline'
                              }
                            >
                              {job.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {job.prompts.length} prompts
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Created: {job.createdAt.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          {job.status === 'completed' && job.results.length > 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadAllResults(job)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteJob(job.id)}
                            disabled={job.status === 'running'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {job.status === 'running' && (
                        <div>
                          <Progress value={job.progress} className="w-full" />
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round(job.progress)}% complete
                          </p>
                        </div>
                      )}
                      
                      {job.results.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {job.results.slice(0, 4).map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`Result ${index + 1}`}
                              className="w-full h-16 object-cover rounded border"
                            />
                          ))}
                          {job.results.length > 4 && (
                            <div className="w-full h-16 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500">
                              +{job.results.length - 4} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </PremiumFeatureGate>
  );
};
