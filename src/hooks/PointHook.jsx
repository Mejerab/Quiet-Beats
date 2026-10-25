import PropTypes from 'prop-types';

const PointHook = ({text, title, white, bigger, small}) => {
    const words = title.trim().split(/\s+/);
    const first = words[0];
    const last = words[words.length - 1];
    const devide = words.slice(1, words.length - 1);
    const newTitle = devide.join(" ")
    return (
        <div className="font-bold space-y-2">
            <h5 className="prime text-xl">{text}</h5>
            {words.length - 1 === 0 ?
            <h3 className={`${bigger?'text-4xl lg:text-[80px]':'text-[48px]'} leading-[120%] overflow-hidden split prime ${white&&'text-center'}`}>{first}</h3>:
            <h3 className={`${bigger?'text-4xl lg:text-[80px]':small?'text-[32px]':'text-[48px]'} leading-[120%] overflow-hidden ${white&&'text-center'}`}><p className={`${white?'text-white': 'prime'} reverse overflow-hidden inline-flex`}>{first}</p>{bigger&&<br/>} {newTitle} <span className={`${white?'text-white': 'prime'} split`}>{last}</span></h3>}
        </div>
    );
};
PointHook.propTpyes = {
    text: PropTypes.string,
    title: PropTypes.string,
    white: PropTypes.bool,
}

export default PointHook;