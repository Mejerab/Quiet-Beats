import SplitedText from "../../animation/SplitedText";
import BtnHook from "../../hooks/BtnHook";

const Hero = () => {
    SplitedText();
    return (
        <div className="max-w-7xl mx-auto lg:px-3 px-2 flex justify-between items-center pb-14 pt-6 gap-x-12">
            <div>
                <h3 className="font-bold text-3xl lg:text-6xl leading-[130%] overflow-hidden"><p className="overflow-hidden"><span className="prime reverse overflow-hidden">Quiet</span> Moments With,</p> Rhythms You <span className="prime split">Love</span></h3>
                <p className="para text-xl text-[#ffffff99]! my-4 mb-8">Our collection blends modern chillout vibestranquil
                    beats, ensuring every listener With Quiet Beats.</p>
                    <BtnHook />
            </div>
            <img className="lg:block hidden" src="https://i.ibb.co.com/Jjk5WNP4/Image-1.png" alt="" />
        </div>
    );
};

export default Hero;