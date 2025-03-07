import { JSX, useState } from "react";

interface Props {
  images: string[];
  captions: string[];
}

const Carousel = ({ images, captions }: Props): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="relative w-full flex-shrink-0">
            <div className="absolute inset-0 mx-2 flex items-center justify-center">
              <span className="bg-primary/80 bg-opacity-50 rounded p-2 text-center text-3xl font-bold text-white">
                {captions[index]}
              </span>
            </div>
            <img
              className="aspect-square w-full rounded-3xl object-cover md:aspect-16/9 md:max-h-[250px] lg:max-h-[300px] xl:max-h-[400px] 2xl:max-h-[500px]"
              src={src}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="button absolute top-1/2 left-4 -translate-y-1/2 transform px-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="button absolute top-1/2 right-4 -translate-y-1/2 transform px-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
