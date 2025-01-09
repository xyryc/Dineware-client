import { Link } from "react-router-dom";

const OfferGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px] w-full sm:w-[80%] min-h-[400px] mx-auto font-poppins ">
      <div className="col-span-1 lg:col-span-2 overflow-hidden flex justify-between flex-col rounded-sm row-span-1 lg:row-span-2 h-[170px] bg-white lg:h-full relative min-h-60 max-h-[520px]">
        <div className="px-8 absolute bottom-8 z-20 w-full lg:w-[70%]">
          <h4 className="text-5xl font-black text-white font-dancing-script drop-shadow-2xl">
            Pizza Delight
          </h4>
          <p className="text-sm mt-3 text-[#FAFAFA]">
            Savor cheesy, freshly baked pizzas with irresistible toppings!
          </p>
          <Link to="/foods" className="btn btn-sm mt-2 rounded-full">
            Order Now
          </Link>
        </div>

        <img
          alt="product/image"
          src="https://i.ibb.co.com/Yk2PfrJ/185.jpg"
          className="w-full h-full object-cover "
        />
      </div>

      <div className="bg-white rounded-sm col-span-1 lg:col-span-2 flex justify-between items-center  overflow-hidden relative min-h-[190px]">
        <div className="absolute bottom-6 left-6 z-20 w-[70%] lg:w-[50%]">
          <h4 className="text-5xl font-black text-white font-dancing-script drop-shadow-2xl">
            Taco Fiesta
          </h4>
          <p className="text-sm mt-3 text-[#FAFAFA]">
            Enjoy crunchy tacos with savory fillings and fresh ingredients!
          </p>
          <Link to="/foods" className="btn btn-sm mt-2 rounded-full">
            Order Now
          </Link>
        </div>

        <img
          alt="product/image"
          src="https://i.ibb.co.com/7WvJpd9/Tacos-al-Pastor.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white rounded-sm col-span-1 flex justify-between items-center  overflow-hidden relative h-[180px]">
        <div className="absolute bottom-4 z-20 w-[90%] px-4">
          <h4 className="text-4xl font-black text-white font-dancing-script drop-shadow-2xl">
            Pasta Perfection
          </h4>
          <p className="text-sm mt-0.5 text-[#FAFAFA]">Rich, creamy pasta.</p>
          <Link to="/foods" className="btn btn-xs mt-2 rounded-full">
            Order Now
          </Link>
        </div>

        <img
          alt="product/image"
          src="https://i.ibb.co.com/jkwk6GL/pasta.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white rounded-sm col-span-1 flex justify-between items-center overflow-hidden relative h-[180px]">
        <div className="absolute bottom-4 z-20 w-[90%] px-4">
          <h4 className="text-4xl font-black text-white font-dancing-script drop-shadow-2xl">
            Burger Bliss
          </h4>
          <p className="text-sm mt-0.5 text-[#FAFAFA]">
            Juicy, flavorful burgers.
          </p>
          <Link to="/foods" className="btn btn-xs mt-2 rounded-full">
            Order Now
          </Link>
        </div>

        <img
          alt="product/image"
          src="https://i.ibb.co.com/93P8wCB/971.jpg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default OfferGrid;
