
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ShowcaseMobileCarouselProps {
  items: Array<{
    id: number;
    imageUrl: string;
    prompt: string;
    style: string;
    author: string;
  }>;
}

export const ShowcaseMobileCarousel = ({ items }: ShowcaseMobileCarouselProps) => {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className="pl-1">
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <p className="font-medium text-sm">{item.prompt}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-purple-500 bg-opacity-50 rounded-full px-2 py-0.5 inline-block">
                    {item.style}
                  </span>
                  <span className="text-xs">by {item.author}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
