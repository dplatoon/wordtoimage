
interface ImageOverlayProps {
  prompt: string;
  style?: string;
}

export const ImageOverlay = ({ prompt, style }: ImageOverlayProps) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100">
      <p className="text-white text-sm font-medium line-clamp-2 mb-2">{prompt}</p>
      {style && (
        <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs rounded mb-2">{style}</span>
      )}
    </div>
  );
};
