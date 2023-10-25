import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import mini from '../assets/images/mini.png';
import retro from '../assets/images/retro.png';
import small from '../assets/images/small.png';

const images = [
  { url: mini, alt: 'mini' },
  { url: retro, alt: 'retro' },
  { url: small, alt: 'small' },
];

export default function Cars() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? images.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = index === images.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  return (
    <section className="my-16 m-auto md:my-20 p-4">
      <h1 className="text-center text-4xl font-extrabold">LATEST MODELS</h1>
      <p className="text-center text-gray-500">Please select a car model</p>
      <div className="relative flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
        <FaArrowLeft className=" left-0 text-3xl inset-y-1/2 text-gray-400 cursor-pointer" onClick={prevSlide} />
        <FaArrowRight className="absolute right-0 text-3xl inset-y-1/2 text-gray-400 cursor-pointer" onClick={nextSlide} />
        <div className="flex gap-10 py-10 lg:flex-row lg:flex-wrap">
          {images.map((image, i) => (
            // <div key={image.alt} className={index === i ? 'block' : 'hidden'}>
            //   <img src={image.url} alt={image.alt} className="..."/>
            // </div>
            <div key={image.alt} className={`${index === i ? 'block' : 'hidden'} relative bg-gray-200 rounded-full w-48 h-48 my-20 mx-auto md:h-72 md:w-72`}>
              <img src={image.url} className="h-full object-fill" alt={image.url} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
