import Banner from "../components/Banner";
import OfferGrid from "../components/OfferGrid";
import Reviews from "../components/Reviews";
import Stats from "../components/Stats";
import TopSellingFoods from "../components/TopSellingFoods";

const Home = () => {
  return (
    <div>
      <Banner />

      <div className="container mx-auto px-4">
        <Stats />

        <OfferGrid />

        <TopSellingFoods />
      </div>

      <Reviews />
    </div>
  );
};

export default Home;
