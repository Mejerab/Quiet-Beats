import Footer from "../../shared/Footer";
import Navbar from "../../shared/Navbar";
import About from "./About";
import Hero from "./Hero";
import Latest from "./Latest";
import Newsletter from "./Newsletter";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div className="space-y-28">
            <div className="bg-[url(https://i.ibb.co.com/cW8DpHw/Image-1.png)] bg-cover bg-bottom bg-no-repeat">
                <div className="bg-linear-to-br from-[#1B232A] from-5% via-45% via-[#1B232ACC] to-[#1B232A] to-100%">
                    <Navbar />
                    <Hero />
                </div>
            </div>
            <About />
            <Testimonial />
            <Latest />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;