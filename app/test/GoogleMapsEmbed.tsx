"use client";
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center: google.maps.LatLngLiteral = {
  lat: 17.386026,
  lng: 78.4838382
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface GoogleMapsEmbedProps {
  setEmbedUrl: (url: string) => void;
}

export default function GoogleMapsEmbed({ setEmbedUrl }: GoogleMapsEmbedProps) {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<Coordinates | null>(null);
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedPosition({ lat, lng });
      setShowMap(false);

      const embed = generateEmbedUrl({ lat, lng }, apiKey);
      setEmbedUrl(embed);
    }
  };

  const handleButtonClick = () => {
    setShowMap(true);
  };

  const handleEmbed = () => {
    if (selectedPosition) {
      const embed = generateEmbedUrl(selectedPosition, apiKey);
      setEmbedUrl(embed);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const iframeCode = e.target.value;
    const srcMatch = iframeCode.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      setEmbedUrl(srcMatch[1]);
    }
  };

  return (
    <div className='relative'>
      <div className='flex items-center justify-center space-x-4'>
        <Input
          placeholder="Enter Google Maps Link or iframe code"
          onChange={handleInputChange}
          className="w-full" // Ensure Input takes full width
        />
        {/* <Button type='button' onClick={handleButtonClick}>
          <MapPin className='h-5 w-5' />
        </Button> */}
      </div>
      {showMap && (
        <div className='w-full absolute'>
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onClick={handleMapClick}
            >
              {selectedPosition && <Marker position={selectedPosition} />}
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
}

function generateEmbedUrl(coordinates: Coordinates, apiKey: string): string {
  const { lat, lng } = coordinates;
  return `https://www.google.com/maps/embed/v1/place?q=${lat},${lng}&key=${apiKey}`;
}
