import Banner from "../components/Banner";
import Reviews from "../components/Reviews";
import Stats from "../components/Stats";
import TopSellingFoods from "../components/TopSellingFoods";

const Home = () => {
  return (
    <div>
      <Banner />

      <Stats/>

      <div className="container mx-auto px-4">
        <TopSellingFoods />
      </div>

      <Reviews />
    </div>
  );
};

export default Home;
