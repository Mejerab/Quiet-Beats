import { Link } from "react-router";

const Footer = ({dash}) => {
    return (
        <footer className={`${dash ? 'border-t mt-8 border-[#49DC6733] mx-12' : 'bg-[rgba(73,220,103,0.07)]'}`}>
            <div className={`max-w-7xl mx-auto lg:px-3 px-2 grid lg:grid-cols-3 gap-y-12 items-start ${dash? 'py-8' :'py-20'}`}>
                <div className="bg-[#1a2128] border-2 border-[#49DC6722] rounded flex flex-col items-center justify-center py-4 px-12 space-y-4">
                    <img src="/Logo 1.svg" alt="" />
                    <p className="text-[#ffffff88] text-lg">Quiet Beats delivers calming soundscapes, soft rhythms, and ambient tones</p>
                </div>
                <div className="lg:mx-auto">
                    <h4 className="text-[#49DC67] text-xl font-medium">Pages</h4>
                    <ul className="mt-5 space-y-4">
                        <li className="hover:underline hover:text-[#49DC67] transition-colors">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="hover:underline hover:text-[#49DC67] transition-colors">
                            <Link>Songs</Link>
                        </li>
                        <li className="hover:underline hover:text-[#49DC67] transition-colors">
                            <Link>Dashboard</Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-7">
                    <div className="flex items-center gap-x-8">
                        <div className="p-3 rounded-lg border border-[#FFFFFF33] w-fit">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.645 11.7217C4.62167 12.3613 4 13.4829 4 14.6897V28.4998C4 30.4328 5.567 31.9998 7.5 31.9998H28.5C30.433 31.9998 32 30.4328 32 28.4998V14.6897C32 13.4829 31.3783 12.3613 30.355 11.7217L19.855 5.1592C18.72 4.44986 17.28 4.44986 16.145 5.1592L5.645 11.7217ZM10.2207 15.9606C9.41655 15.4245 8.33003 15.6418 7.79391 16.4459C7.2578 17.2501 7.4751 18.3366 8.27927 18.8728L17.0293 24.7061C17.6171 25.098 18.3829 25.098 18.9707 24.7061L27.7207 18.8728C28.5249 18.3366 28.7422 17.2501 28.2061 16.4459C27.67 15.6418 26.5834 15.4245 25.7793 15.9606L18 21.1468L10.2207 15.9606Z" fill="#49DC67" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-2xl">Email Address</h4>
                            <p className="para">quietbeats@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-8">
                        <div className="p-3 rounded-lg border border-[#FFFFFF33] w-fit">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.33794 7.58794C14.1219 2.80402 21.8781 2.80402 26.6621 7.58794C31.446 12.3719 31.446 20.1281 26.6621 24.9121L18 33.5741L9.33794 24.9121C4.55402 20.1281 4.55402 12.3719 9.33794 7.58794ZM18 19.75C19.933 19.75 21.5 18.183 21.5 16.25C21.5 14.317 19.933 12.75 18 12.75C16.067 12.75 14.5 14.317 14.5 16.25C14.5 18.183 16.067 19.75 18 19.75Z" fill="#49DC67" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-2xl">Location</h4>
                            <p className="para">Alom Nagar housing</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-8">
                        <div className="p-3 rounded-lg border border-[#FFFFFF33] w-fit">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 5.75C4 4.7835 4.7835 4 5.75 4H9.51753C10.373 4 11.1031 4.61847 11.2437 5.4623L12.5375 13.2251C12.6638 13.9829 12.2811 14.7345 11.5939 15.078L8.8847 16.4326C10.8382 21.2871 14.7129 25.1618 19.5674 27.1153L20.922 24.4061C21.2655 23.7189 22.0171 23.3362 22.7749 23.4625L30.5377 24.7563C31.3815 24.8969 32 25.627 32 26.4825V30.25C32 31.2165 31.2165 32 30.25 32H26.75C14.1855 32 4 21.8145 4 9.25V5.75Z" fill="#49DC67" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-2xl">Phone Number</h4>
                            <p className="para">+888 999 5555 4444</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="py-3 para text-center border-t border-t-[#49DC6721]">&copy;: All Rights reserved by Mr.Omi</p>
        </footer>
    );
};

export default Footer;