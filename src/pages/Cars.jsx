import React from "react";
import Carousel from "react-elastic-carousel"
import Item from "../components/Item";
import mini from "../assets/images/mini.png";
import retro from "../assets/images/retro.png";
import small from "../assets/images/small.png";

function Cars() {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  
  return (
    <section className="my-16 m-auto md:my-20 p-4">
      <h1 className="text-center text-4xl font-extrabold">LATEST MODELS</h1>
      <p className="text-center text-gray-500">Please select a car model</p>
      <Carousel breakPoints={breakPoints}>
        <Item>
          <div className='relative bg-gray-200 rounded-full w-48 h-48 my-20 mx-auto md:h-72 md:w-72'>
            <img src={mini} className="h-full object-fill" alt={mini} />
          </div>
        </Item>
        <Item>
          <div className='relative bg-gray-200 rounded-full w-48 h-48 my-20 mx-auto md:h-72 md:w-72'>
            <img src={retro} className="h-full object-fill" alt={retro} />
          </div>
        </Item>
        <Item>
          <div className='relative bg-gray-200 rounded-full w-48 h-48 my-20 mx-auto md:h-72 md:w-72'>
            <img src={small} className="h-full object-fill" alt={small} />
          </div>
        </Item>
        <Item>
          <div className='relative bg-gray-200 rounded-full w-48 h-48 my-20 mx-auto md:h-72 md:w-72'>
            <img src={mini} className="h-full object-fill" alt={mini} />
          </div>
        </Item>
        <Item>
          <div className='relative bg-gray-200 rounded-full w-48 h-48 my-20 mx-auto md:h-72 md:w-72'>
            <img src={retro} className="h-full object-fill" alt={retro} />
          </div>
        </Item>
        <Item>
          <div className='relative bg-gray-200 rounded-full w-48 h-48 my-20 mx-auto md:h-72 md:w-72'>
            <img src={small} className="h-full object-fill" alt={small} />
          </div>
        </Item>
      </Carousel>
    </section>
  );
}

export default Cars;
