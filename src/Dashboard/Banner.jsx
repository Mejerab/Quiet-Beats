import PointHook from "../hooks/PointHook";

const Banner = () => {
    return (
        <div className="lg:block hidden bg-[url(https://i.ibb.co.com/tMqhyhJv/Bg.png)] bg-cover bg-center rounded">
            <div className="bg-linear-to-r from-[#1B232AF5] to-[#1B232AEB] h-113 w-full rounded">
                <div className="max-w-330 mx-auto flex items-center justify-between p-3 px-6">
                    <h3 className="text-[80px] font-medium leading-[106%] w-1/2"><PointHook bigger title={'Peaceful Mind, Quiet Beat Therapy'} /></h3>
                    <img className="pl-12" src="https://i.ibb.co.com/bj5Zqcx0/Image-Mask.png" alt="Hero" />
                </div>
            </div>
        </div>
    );
};

export default Banner;