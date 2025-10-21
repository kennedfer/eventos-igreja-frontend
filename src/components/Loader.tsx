// Loader.tsx
import { type FC } from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: FC<LoaderProps> = ({ message = 'Carregando...' }) => {
  return (
    <div className="flex items-center justify-center gap-2 p-4 h-full" role="status">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
      <span className="text-gray-700 text-base">{message}</span>
    </div>
  );
};

