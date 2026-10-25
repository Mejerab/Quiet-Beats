import { Link } from "react-router";
import UserHook from "./UserHook";

const BtnHook = () => {
    const user = UserHook();
    return (
        <div>
            {user ?
                <Link to='/dashboard' className="btn w-[220px] h-[58px] tracking-[-1px] rounded text-xl font-bold text-[#121212] hover:text-[#49DC67] border-0 relative button-ani overflow-hidden">< span className="z-10" > Go Web Player</span ></Link > :
                <Link to='/login' className="btn w-[220px] h-[58px] tracking-[-1px] rounded text-xl font-bold text-[#121212] hover:text-[#49DC67] border-0 relative button-ani overflow-hidden"><span className="z-10">Get Inside</span></Link>}
        </div>
    );
};

export default BtnHook;