import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import docs from '../../assets/home/docs.png';
import calendar from '../../assets/home/calendario.png';

const Car = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [docs, calendar];

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  });

  return (
    <div
      {...handlers}
      className="relative w-full h-full flex justify-center items-center bg-gray-100 overflow-hidden"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex justify-center items-center"
          >
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl w-full h-[85%] mx-auto flex justify-center items-center">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botones */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-6 z-10">
        <button
          onClick={() => handleSwipe('right')}
          className="bg-gray-800 text-white p-5 rounded-full hover:bg-gray-600"
        >
          &#8592;
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-6 z-10">
        <button
          onClick={() => handleSwipe('left')}
          className="bg-gray-800 text-white p-5 rounded-full hover:bg-gray-600"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Car;
