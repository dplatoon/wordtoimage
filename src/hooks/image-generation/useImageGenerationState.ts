
import { useReducer } from 'react';

export interface ImageGenerationState {
  style: string;
  resolution: string;
  count: number;
  sourceImage: string;
  authModalOpen: boolean;
}

export type ImageGenerationAction = 
  | { type: 'SET_STYLE'; payload: string }
  | { type: 'SET_RESOLUTION'; payload: string }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_SOURCE_IMAGE'; payload: string }
  | { type: 'SET_AUTH_MODAL_OPEN'; payload: boolean };

const initialState: ImageGenerationState = {
  style: 'auto',
  resolution: '1024x1024',
  count: 1,
  sourceImage: '',
  authModalOpen: false
};

const imageGenerationReducer = (state: ImageGenerationState, action: ImageGenerationAction): ImageGenerationState => {
  switch (action.type) {
    case 'SET_STYLE':
      return { ...state, style: action.payload };
    case 'SET_RESOLUTION':
      return { ...state, resolution: action.payload };
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_SOURCE_IMAGE':
      return { ...state, sourceImage: action.payload };
    case 'SET_AUTH_MODAL_OPEN':
      return { ...state, authModalOpen: action.payload };
    default:
      return state;
  }
};

export const useImageGenerationState = () => {
  const [state, dispatch] = useReducer(imageGenerationReducer, initialState);

  const setStyle = (style: string) => dispatch({ type: 'SET_STYLE', payload: style });
  const setResolution = (resolution: string) => dispatch({ type: 'SET_RESOLUTION', payload: resolution });
  const setCount = (count: number) => dispatch({ type: 'SET_COUNT', payload: count });
  const setSourceImage = (sourceImage: string) => dispatch({ type: 'SET_SOURCE_IMAGE', payload: sourceImage });
  const setAuthModalOpen = (open: boolean) => dispatch({ type: 'SET_AUTH_MODAL_OPEN', payload: open });

  return {
    state,
    setStyle,
    setResolution,
    setCount,
    setSourceImage,
    setAuthModalOpen
  };
};
