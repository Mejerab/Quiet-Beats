import PointHook from "../../hooks/PointHook";

const Newsletter = () => {
    return (
        <div className="bg-prime relative">
            <div className="bg-[url(https://i.ibb.co.com/M5tGQCH4/Vector.png)] bg-cover h-120">
                <div className="max-w-7xl mx-auto px-4 lg:px-64 flex flex-col items-center justify-center h-full gap-y-7">
                    <PointHook title={'Get Started With Unlock Exclusive Music & Updates'} white/>
                    <form className="lg:w-2/3 w-full mx-auto relative">
                        <svg className="absolute top-1/2 -translate-1/2 left-7 stroke-white z-10" width="24" height="19" viewBox="0 0 24 19" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.00500015 3.32533L11.9999 9.32279L23.995 3.32526C23.9045 1.74973 22.5982 0.5 21 0.5H3C1.40178 0.5 0.0954521 1.74977 0.00500015 3.32533Z" fill="white" />
                            <path d="M24 6.67686L11.9999 12.6769L0 6.67693V15.5C0 17.1569 1.34315 18.5 3 18.5H21C22.6569 18.5 24 17.1569 24 15.5V6.67686Z" fill="white" />
                        </svg>
                        <input placeholder="Email Address" type="text" className="input text-base placeholder:text-[#ffffffD1] w-full font-bold text-white bg-[#1212124D] focus:outline-0 border-[#ffffff99] py-7 pl-14" />
                        <button className="btn bg-white border-0 right-2 top-2 text-[#121212] hover:text-white hover:bg-[#121212] transition-colors text-lg font-bold absolute py-5.25! z-20">Subscribe</button>
                    </form>
                    <img className="absolute top-1/2 -translate-y-1/2 right-0 lg:block hidden" src="https://i.ibb.co.com/9mVxPyyR/Image-2.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Newsletter;