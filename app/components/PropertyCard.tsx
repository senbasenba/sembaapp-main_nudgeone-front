import { useState } from 'react';
import Image from 'next/image';

type PropertyCardProps = {
  property: {
    id: number;
    name: string;
    description: string;
    price: number;
    beds: number;
    images: string[];
  };
  onSelect: () => void;
};

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 cursor-pointer" onClick={onSelect}>
        <Image
          src={property.images[currentImageIndex]}
          alt={property.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
            />
          ))}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{property.name}</h2>
        <p className="text-gray-600">{property.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-lg font-bold">¥{property.price.toLocaleString()}/泊</p>
          <p className="text-sm text-gray-600">ベッド{property.beds}台</p>
        </div>
      </div>
    </div>
  );
}