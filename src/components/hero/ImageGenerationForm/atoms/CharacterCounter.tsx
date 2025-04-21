
import React from 'react';

interface CharacterCounterProps {
  current: number;
  max: number;
}

export const CharacterCounter = ({ current, max }: CharacterCounterProps) => {
  return (
    <div className="absolute right-2 bottom-[-1.5rem] text-xs text-gray-400 pointer-events-none select-none">
      {current}/{max}
    </div>
  );
};
