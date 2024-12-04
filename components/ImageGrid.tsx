// components/ImageGrid.tsx
import React from 'react';

interface ImageGridProps {
  imageIds: string[];
  baseUrl: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({ imageIds, baseUrl }) => {
  return (
    <div className="w-full gap-1 overflow-hidden bg-[#111518] @container p-4">
      <div className="w-full gap-2 aspect-[3/2] rounded-xl grid grid-cols-[2fr_1fr_1fr]">
        {imageIds.map((id) => (
          <div
            key={id}
            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none"
            style={{
              backgroundImage: `url("${baseUrl}/${id}.png")`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
