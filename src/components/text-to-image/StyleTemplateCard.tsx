import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
        "relative overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <div className="aspect-square relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {isPro && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-gradient-primary text-primary-foreground"
          >
            PRO
          </Badge>
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            </div>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </Card>
  );
};