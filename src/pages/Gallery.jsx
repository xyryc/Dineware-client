import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(null);

  const slides = [
    {
      src: "https://i.ibb.co.com/CnQDNfk/biriyani.jpg",
      alt: "Bangladeshi Biriyani",
      name: "Mohammad Anik",
      description: "Aromatic and flavorful Bangladeshi Biriyani.",
    },
    {
      src: "https://i.ibb.co.com/VgFK5F0/Pasta-al-Promodoro-Wide.webp",
      alt: "Spicy Pasta",
      name: "Mariya",
      description: "Deliciously spicy and creamy Italian Pasta.",
    },
    {
      src: "https://i.ibb.co.com/0MWk7wR/front-view-yummy-meat-cheeseburger-with-french-fries-dark-background-dinner-burgers-snack-fast-food.jpg",
      alt: "Cheeseburger with Fries",
      name: "Mike",
      description: "Juicy cheeseburger served with crispy fries.",
    },
    {
      src: "https://i.ibb.co.com/XzYtDR3/fruit-salad-plate.jpg",
      alt: "Fruit Salad",
      name: "Adam",
      description: "Refreshing mix of fresh seasonal fruits.",
    },
    {
      src: "https://i.ibb.co.com/KhMBWDc/Maqluba-0c9985a265.jpg",
      alt: "Palestinian Maqluba",
      name: "Najwa",
      description:
        "A traditional Palestinian dish with rice, meat, and vegetables.",
    },
    {
      src: "https://i.ibb.co.com/R9J6z25/bahn-mi.webp",
      alt: "Vietnamese Bahn Mi",
      name: "Nguyen",
      description: "A crispy baguette with savory Vietnamese fillings.",
    },
    {
      src: "https://i.ibb.co.com/xhL2QdD/stir-fry-chicken-sweet-peppers-green-beans.jpg",
      alt: "Chicken Stir Fry",
      name: "Franklin",
      description: "A colorful stir-fry of chicken and vegetables.",
    },
    {
      src: "https://i.ibb.co.com/XZYq9dC/chocolate-dessert-with-fresh-raspberry-mint-leaf-generated-by-artificial-intellingence.jpg",
      alt: "Chocolate Dessert",
      name: "Yun",
      description:
        "Decadent chocolate dessert garnished with fresh raspberries.",
    },
    {
      src: "https://i.ibb.co.com/JK4sNGF/spaghetti-bolognese.jpg",
      alt: "Spaghetti Bolognese",
      name: "Isabella",
      description: "Classic Italian spaghetti with rich Bolognese sauce.",
    },
    {
      src: "https://i.ibb.co.com/qkcL4d7/korean-ramen.jpg",
      alt: "Korean Ramen",
      name: "Jin",
      description: "Savory and spicy Korean ramen with flavorful broth.",
    },
    {
      src: "https://i.ibb.co.com/KqfMTQn/hilsha-curry.jpg",
      alt: "Hilsha Curry",
      name: "Anas",
      description: "Traditional Bangladeshi Hilsha curry in mustard sauce.",
    },
    {
      src: "https://i.ibb.co.com/ChdWJds/butter-chicken-image1-197844-1.jpg",
      alt: "Butter Chicken",
      name: "Samy",
      description: "Creamy Bangladeshi butter chicken with rich spices.",
    },
  ];

  return (
    <div className="min-h-[90vh] flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>

      {/* Hover Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full lg:w-[70%]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`relative transition-all w-full h-[200px] cursor-pointer duration-300 ease-in-out transform ${
              hovered !== null && hovered !== index
                ? "blur-sm scale-95"
                : "scale-100"
            } hover:scale-105 hover:z-10 hover:blur-none`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              setCurrentSlide(index);
              setOpen(true);
            }}
          >
            {/* Image */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full rounded-md object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md">
              <h2 className="text-lg font-semibold">{slide.name}</h2>
              <p className="text-sm mt-1 w-4/5 text-center">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentSlide}
      />
    </div>
  );
};

export default Gallery;
