import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, FabricText, Line, PencilBrush, FabricImage } from 'fabric';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Crop,
  RotateCw,
  Move,
  Square,
  Circle as CircleIcon,
  Type,
  Paintbrush,
  Eraser,
  Download,
  Upload,
  Undo,
  Redo,
  Trash2,
  Filter,
  Palette,
  Contrast,
  Sun,
  Zap,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/analytics';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageBlob: Blob) => void;
  onClose: () => void;
}

interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sepia: number;
  grayscale: number;
}

export const AdvancedImageEditor = ({ imageUrl, onSave, onClose }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<'select' | 'crop' | 'draw' | 'text' | 'rectangle' | 'circle' | 'eraser'>('select');
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [textSize, setTextSize] = useState(24);
  const [filters, setFilters] = useState<FilterSettings>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    blur: 0,
    sepia: 0,
    grayscale: 0
  });
  const [cropMode, setCropMode] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      selection: activeTool === 'select',
      defaultCursor: 'default'
    });

    // Load the image
    const loadImage = () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const fabricImg = new FabricImage(img, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false
        });

        // Scale image to fit canvas
        const scaleX = canvas.width! / img.width;
        const scaleY = canvas.height! / img.height;
        const scale = Math.min(scaleX, scaleY);
        
        fabricImg.scale(scale);
        fabricImg.center();
        
        canvas.add(fabricImg);
        canvas.sendObjectToBack(fabricImg);
        canvas.renderAll();
        
        saveState();
        setIsLoading(false);
        toast.success('Image loaded successfully!');
      };
      img.onerror = () => {
        toast.error('Failed to load image');
        setIsLoading(false);
      };
      img.src = imageUrl;
    };

    loadImage();
    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  // Update canvas settings when tool changes
  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === 'draw' || activeTool === 'eraser';
    fabricCanvas.selection = activeTool === 'select';

    if (activeTool === 'draw') {
      if (fabricCanvas.freeDrawingBrush) {
        fabricCanvas.freeDrawingBrush.color = brushColor;
        fabricCanvas.freeDrawingBrush.width = brushSize;
      }
    } else if (activeTool === 'eraser') {
      if (fabricCanvas.freeDrawingBrush) {
        fabricCanvas.freeDrawingBrush.color = '#ffffff';
        fabricCanvas.freeDrawingBrush.width = brushSize;
      }
    }

    fabricCanvas.defaultCursor = activeTool === 'crop' ? 'crosshair' : 'default';
  }, [activeTool, brushSize, brushColor, fabricCanvas]);

  // Save state for undo/redo
  const saveState = useCallback(() => {
    if (!fabricCanvas) return;
    
    const state = JSON.stringify(fabricCanvas.toJSON());
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(state);
    
    if (newHistory.length > 20) { // Limit history to 20 steps
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  }, [fabricCanvas, history, historyStep]);

  // Apply filters
  const applyFilters = useCallback(() => {
    if (!fabricCanvas) return;

    const objects = fabricCanvas.getObjects();
    const backgroundImage = objects.find(obj => obj.type === 'image');
    
    if (backgroundImage) {
      const filterString = `
        brightness(${1 + filters.brightness / 100})
        contrast(${1 + filters.contrast / 100})
        saturate(${1 + filters.saturation / 100})
        blur(${filters.blur}px)
        sepia(${filters.sepia / 100})
        grayscale(${filters.grayscale / 100})
      `;
      
      // Apply CSS filters to the canvas element
      const canvasElement = fabricCanvas.getElement();
      if (canvasElement) {
        canvasElement.style.filter = filterString;
      }
    }
    
    fabricCanvas.renderAll();
  }, [fabricCanvas, filters]);

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);
    setCropMode(tool === 'crop');

    if (tool === 'rectangle' && fabricCanvas) {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: brushColor,
        width: 100,
        height: 100,
        stroke: brushColor,
        strokeWidth: 2
      });
      fabricCanvas.add(rect);
      saveState();
    } else if (tool === 'circle' && fabricCanvas) {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: 'transparent',
        radius: 50,
        stroke: brushColor,
        strokeWidth: 2
      });
      fabricCanvas.add(circle);
      saveState();
    } else if (tool === 'text' && fabricCanvas) {
      const text = new FabricText('Double click to edit', {
        left: 100,
        top: 100,
        fontSize: textSize,
        fill: brushColor,
        fontFamily: 'Arial'
      });
      fabricCanvas.add(text);
      saveState();
    }

    trackEvent({
      action: 'editor_tool_selected',
      category: 'image_editor',
      label: tool
    });
  };

  const handleUndo = () => {
    if (historyStep > 0 && fabricCanvas) {
      const previousState = history[historyStep - 1];
      fabricCanvas.loadFromJSON(previousState, () => {
        fabricCanvas.renderAll();
        setHistoryStep(historyStep - 1);
      });
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1 && fabricCanvas) {
      const nextState = history[historyStep + 1];
      fabricCanvas.loadFromJSON(nextState, () => {
        fabricCanvas.renderAll();
        setHistoryStep(historyStep + 1);
      });
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    
    // Keep only the background image
    const objects = fabricCanvas.getObjects();
    const backgroundImage = objects.find(obj => obj.type === 'image');
    
    fabricCanvas.clear();
    if (backgroundImage) {
      fabricCanvas.add(backgroundImage);
    }
    fabricCanvas.renderAll();
    saveState();
    toast.success('Canvas cleared!');
  };

  const handleRotate = () => {
    if (!fabricCanvas) return;
    
    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => {
      if (obj.type === 'image') {
        obj.rotate((obj.angle || 0) + 90);
      }
    });
    fabricCanvas.renderAll();
    saveState();
  };

  const handleSave = async () => {
    if (!fabricCanvas) return;

    try {
      // Remove filters temporarily for export
      const canvasElement = fabricCanvas.getElement();
      const originalFilter = canvasElement.style.filter;
      canvasElement.style.filter = 'none';

      // Export canvas to blob
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1
      });

      // Restore filters
      canvasElement.style.filter = originalFilter;

      // Convert dataURL to blob
      const response = await fetch(dataURL);
      const blob = await response.blob();

      onSave(blob);
      
      trackEvent({
        action: 'image_edited_saved',
        category: 'image_editor',
        label: 'save_edited_image'
      });

      toast.success('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image');
    }
  };

  const resetFilters = () => {
    setFilters({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      blur: 0,
      sepia: 0,
      grayscale: 0
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading image editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      {/* Toolbar */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Image Editor</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleUndo} disabled={historyStep <= 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleRedo} disabled={historyStep >= history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Download className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="mt-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeTool === 'select' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolClick('select')}
              >
                <Move className="h-4 w-4 mr-1" />
                Select
              </Button>
              <Button
                variant={activeTool === 'draw' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolClick('draw')}
              >
                <Paintbrush className="h-4 w-4 mr-1" />
                Draw
              </Button>
              <Button
                variant={activeTool === 'eraser' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolClick('eraser')}
              >
                <Eraser className="h-4 w-4 mr-1" />
                Eraser
              </Button>
              <Button
                variant={activeTool === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolClick('text')}
              >
                <Type className="h-4 w-4 mr-1" />
                Text
              </Button>
              <Button
                variant={activeTool === 'rectangle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolClick('rectangle')}
              >
                <Square className="h-4 w-4 mr-1" />
                Rectangle
              </Button>
              <Button
                variant={activeTool === 'circle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolClick('circle')}
              >
                <CircleIcon className="h-4 w-4 mr-1" />
                Circle
              </Button>
              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCw className="h-4 w-4 mr-1" />
                Rotate
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="filters" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label>Brightness</Label>
                <Slider
                  value={[filters.brightness]}
                  onValueChange={([value]) => setFilters(prev => ({ ...prev, brightness: value }))}
                  min={-100}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">{filters.brightness}%</span>
              </div>
              <div>
                <Label>Contrast</Label>
                <Slider
                  value={[filters.contrast]}
                  onValueChange={([value]) => setFilters(prev => ({ ...prev, contrast: value }))}
                  min={-100}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">{filters.contrast}%</span>
              </div>
              <div>
                <Label>Saturation</Label>
                <Slider
                  value={[filters.saturation]}
                  onValueChange={([value]) => setFilters(prev => ({ ...prev, saturation: value }))}
                  min={-100}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">{filters.saturation}%</span>
              </div>
              <div>
                <Label>Blur</Label>
                <Slider
                  value={[filters.blur]}
                  onValueChange={([value]) => setFilters(prev => ({ ...prev, blur: value }))}
                  min={0}
                  max={20}
                  step={0.5}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">{filters.blur}px</span>
              </div>
              <div>
                <Label>Sepia</Label>
                <Slider
                  value={[filters.sepia]}
                  onValueChange={([value]) => setFilters(prev => ({ ...prev, sepia: value }))}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">{filters.sepia}%</span>
              </div>
              <div>
                <Label>Grayscale</Label>
                <Slider
                  value={[filters.grayscale]}
                  onValueChange={([value]) => setFilters(prev => ({ ...prev, grayscale: value }))}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">{filters.grayscale}%</span>
              </div>
            </div>
            <Button variant="outline" onClick={resetFilters} className="mt-4">
              Reset Filters
            </Button>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Brush Size</Label>
                <Slider
                  value={[brushSize]}
                  onValueChange={([value]) => setBrushSize(value)}
                  min={1}
                  max={50}
                  step={1}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">{brushSize}px</span>
              </div>
              <div>
                <Label>Brush Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="w-8 h-8 rounded border"
                  />
                  <Input
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="flex-1"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div>
                <Label>Text Size</Label>
                <Slider
                  value={[textSize]}
                  onValueChange={([value]) => setTextSize(value)}
                  min={8}
                  max={72}
                  step={1}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">{textSize}px</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        <div className="flex justify-center">
          <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white">
            <canvas ref={canvasRef} className="max-w-full max-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
