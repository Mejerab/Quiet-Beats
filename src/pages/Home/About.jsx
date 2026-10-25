import BtnHook from "../../hooks/BtnHook";
import PointHook from "../../hooks/PointHook";

const About = () => {
    return (
        <div className='max-w-7xl mx-auto lg:px-3 px-2 flex lg:flex-row flex-col gap-y-6 items-center justify-between gap-x-24'>
            <div className='grid grid-cols-2 grid-rows-1 gap-x-7 gap-y-9'>
                <img src="https://i.ibb.co.com/KdjbsK3/04.png" alt="" />
                <img className='row-span-2' src="https://i.ibb.co.com/ksMHtnGb/5.png" alt="" />
                <img className='row-span-2' src="https://i.ibb.co.com/PGFWB27L/01.png" alt="" />
                <img src="https://i.ibb.co.com/hxV3DLmc/03.png" alt="" />
            </div>
            <div className="lg:w-1/2 space-y-3">
                <PointHook text={'About'} title={'Listening Our Free Audio Music'}/>
                <p className="para">Quiet Beats delivers calming soundscapes, soft rhythms, and ambient tones that help you relax, focus, and find inner balance. Perfect for studying, meditation, or winding down, it’s your personal escape from life’s noise.</p>
                <p className="para">Rhythm for Love, on the other hand, celebrates connection and emotion through heartfelt melodies.
                    Together, Quiet Beats & Rhythm for Love offer a unique blend of serenity and passion—music for every mood, every moment, and every heart.</p>
                <ul className="font-bold text-lg space-y-5 text-[#ffffff99] my-9">
                    <li className="flex items-center gap-x-3"><svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.69 19.31L12 12L1 1H8L19 12L8 23H1" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 1L25 12L14 23" stroke="#49DC67" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Chill & Relax Beats</li>
                    <li className="flex items-center gap-x-3"><svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.69 19.31L12 12L1 1H8L19 12L8 23H1" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 1L25 12L14 23" stroke="#49DC67" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Focus & Study Sounds</li>
                    <li className="flex items-center gap-x-3"><svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.69 19.31L12 12L1 1H8L19 12L8 23H1" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 1L25 12L14 23" stroke="#49DC67" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Sleep & Meditation Tones</li>
                    <li className="flex items-center gap-x-3"><svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.69 19.31L12 12L1 1H8L19 12L8 23H1" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 1L25 12L14 23" stroke="#49DC67" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Calm Ambient Vibes</li>
                </ul>
                <BtnHook />
            </div>
        </div>
    );
};

export default About;