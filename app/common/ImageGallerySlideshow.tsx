import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  IMAGE_FILES_URL: string;
}

const ImageGallerySlideshow: React.FC<ImageGalleryProps> = ({ images, IMAGE_FILES_URL }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadingImages, setLoadingImages] = useState<{ [key: number]: boolean }>({});

  const openSlideshow = (img: string, index: number) => {
    setSelectedImage(`${IMAGE_FILES_URL}/${img.trim()}`);
    setCurrentIndex(index);
  };

  useEffect(() => {
    console.log("Selected Image: ", selectedImage);
}, [selectedImage]);

  const handleClose = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: number) => {
    const totalImages = images.length;
    let newIndex = currentIndex + direction;
   
    if (newIndex < 0) {
      newIndex = totalImages - 1;
    } else if (newIndex >= totalImages) {
      newIndex = 0;
    }
    setCurrentImage(newIndex);
  };

  const setCurrentImage = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(`${IMAGE_FILES_URL}/${images[index].trim()}`);
  };

  const handleImageLoad = (index: number) => {
    setLoadingImages(prev => ({ ...prev, [index]: false }));
  };

  const handleImageStart = (index: number) => {
    setLoadingImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-red-800">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden ${loadingImages[index] ? 'shimmer' : ''}`}
            >
                {/* <h3 className='text-xs'>{IMAGE_FILES_URL}/{img.trim()}</h3> */}

              <Image
                src={`${IMAGE_FILES_URL}/${img.trim()}`}
                alt={`Gallery image ${index + 1}`}
                width={200}
                height={200}
                unoptimized
                className="rounded-lg object-cover w-full h-48 transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => openSlideshow(img, index)}
                onLoadingComplete={() => handleImageLoad(index)}
                onLoadStart={() => handleImageStart(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Slideshow */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white z-60"
            >
              <X size={32} className="text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage(-1)}
              className="absolute left-4 text-white z-60 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={() => navigateImage(1)}
              className="absolute right-4 text-white z-60 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
            >
              <ChevronRight size={32} />
            </button>

            {/* Selected Image */}
            <Image
              src={selectedImage}
              alt={`Fullscreen view ${currentIndex + 1}`}
              width={800}
              height={600}
              unoptimized
              className="rounded-lg object-contain max-w-[90%] max-h-[90%]"
            />
          </div>
        </div>
      )}

      {/* Shimmer Animation Styles */}
      <style jsx global>{`
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right, 
            transparent 0%, 
            rgba(255,255,255,0.2) 50%, 
            transparent 100%
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default ImageGallerySlideshow;