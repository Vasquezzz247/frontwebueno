import Navbar from "../../components/Navbar/navbar";
import Car from "../../components/carousel/Car.jsx";
import Footer from "../../components/Footer/footer.jsx";

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow">
        <Car />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
