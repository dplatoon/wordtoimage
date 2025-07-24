import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sparkles, Crown } from "lucide-react";

interface StyleTemplateCardProps {
  title: string;
  description: string;
  imageUrl: string;
  prompt: string;
  isSelected?: boolean;
  onClick: () => void;
  isPro?: boolean;
}

export const StyleTemplateCard = ({
  title,
  description,
  imageUrl,
  prompt,
  isSelected = false,
  onClick,
  isPro = false
}: StyleTemplateCardProps) => {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg template-card",
        isSelected && "selected ring-2 ring-primary/50"
      )}
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isPro && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-gradient-primary text-primary-foreground border-0 shadow-md"
          >
            <Crown className="w-3 h-3 mr-1" />
            PRO
          </Badge>
        )}
        
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};