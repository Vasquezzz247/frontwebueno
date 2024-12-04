import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer.jsx";
//import Calendar from "../../components/Calendar/calendar.jsx";
import Calendar2 from "../../components/Calendar/calendar2.jsx";

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <Navbar />
      {/* Contenedor principal con espacio dinámico y mayor margen superior */}
      <div className="flex flex-grow justify-center items-center overflow-hidden pt-28">
        {/* Ajusta el padding-top según sea necesario */}
        <Calendar2 />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
