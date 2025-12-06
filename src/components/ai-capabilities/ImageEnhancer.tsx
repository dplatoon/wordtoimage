import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  Wand2, 
  Sparkles, 
  Palette, 
  Eraser, 
  ZoomIn,
  Loader2,
  Upload,
  Image as ImageIcon,
  Download
} from "lucide-react";

interface ImageEnhancerProps {
  imageUrl?: string;
  onEnhanced?: (newImageUrl: string) => void;
}

const ENHANCEMENT_TYPES = [
  { id: "edit", label: "AI Edit", icon: Wand2, description: "Edit with custom prompt" },
  { id: "upscale", label: "Upscale", icon: ZoomIn, description: "Enhance resolution" },
  { id: "denoise", label: "Denoise", icon: Sparkles, description: "Remove noise/grain" },
  { id: "colorize", label: "Colorize", icon: Palette, description: "Add or enhance colors" },
  { id: "background-remove", label: "Remove BG", icon: Eraser, description: "Remove background" },
];

export function ImageEnhancer({ imageUrl, onEnhanced }: ImageEnhancerProps) {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string>(imageUrl || "");
  const [enhancementType, setEnhancementType] = useState("edit");
  const [editPrompt, setEditPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedImage(dataUrl);
      setEnhancedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleEnhance = async () => {
    if (!user) {
      toast.error("Please sign in to use AI enhancement");
      return;
    }

    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    if (enhancementType === "edit" && !editPrompt.trim()) {
      toast.error("Please enter an edit prompt");
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/enhance-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            imageUrl: selectedImage,
            editPrompt: editPrompt.trim(),
            enhancementType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Enhancement failed");
      }

      setEnhancedImage(data.enhancedImageUrl);
      onEnhanced?.(data.enhancedImageUrl);
      toast.success("Image enhanced successfully!");

      if (data.creditsRemaining !== "unlimited") {
        toast.info(`Credits remaining: ${data.creditsRemaining}`);
      }
    } catch (error) {
      console.error("Enhancement error:", error);
      toast.error(error instanceof Error ? error.message : "Enhancement failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!enhancedImage) return;
    
    try {
      const response = await fetch(enhancedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `enhanced-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          AI Image Enhancer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
            ${isDragOver 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
            }
          `}
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
          
          {selectedImage ? (
            <div className="space-y-4">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="max-h-64 mx-auto rounded-lg object-contain"
              />
              <p className="text-sm text-muted-foreground">
                Click or drag to replace image
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="font-medium">Drop an image here or click to upload</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports PNG, JPG, WebP
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhancement Types */}
        <Tabs value={enhancementType} onValueChange={setEnhancementType}>
          <TabsList className="grid grid-cols-5 w-full">
            {ENHANCEMENT_TYPES.map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-1">
                <type.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{type.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="edit" className="mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Edit Instructions</label>
              <Textarea
                placeholder="Describe how you want to modify the image... e.g., 'Make it a sunset scene' or 'Add a watercolor effect'"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                className="min-h-24"
              />
            </div>
          </TabsContent>

          {ENHANCEMENT_TYPES.filter(t => t.id !== "edit").map((type) => (
            <TabsContent key={type.id} value={type.id} className="mt-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <type.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{type.label}</p>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Enhance Button */}
        <Button 
          onClick={handleEnhance} 
          disabled={isProcessing || !selectedImage || (enhancementType === "edit" && !editPrompt.trim())}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Enhance Image
            </>
          )}
        </Button>

        {/* Enhanced Result */}
        {enhancedImage && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Enhanced Result
              </h3>
              <Badge variant="secondary">
                {ENHANCEMENT_TYPES.find(t => t.id === enhancementType)?.label}
              </Badge>
            </div>
            
            <div className="relative rounded-xl overflow-hidden bg-muted">
              <img 
                src={enhancedImage} 
                alt="Enhanced" 
                className="w-full max-h-96 object-contain"
              />
            </div>

            <Button 
              onClick={handleDownload} 
              variant="outline" 
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Enhanced Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
