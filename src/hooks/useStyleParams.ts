
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useStyleParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  useEffect(() => {
    const styleParam = searchParams.get('style');
    if (styleParam) {
      setSelectedStyle(styleParam);
    }
  }, [searchParams]);

  const updateStyleParam = (style: string) => {
    if (style) {
      setSearchParams({ style });
    } else {
      setSearchParams({});
    }
    setSelectedStyle(style);
  };

  const clearStyleParam = () => {
    setSearchParams({});
    setSelectedStyle('');
  };

  return {
    selectedStyle,
    updateStyleParam,
    clearStyleParam,
    hasStyleParam: !!searchParams.get('style')
  };
};
