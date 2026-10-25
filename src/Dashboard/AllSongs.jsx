import SongDisplay from "./SongDisplay";

const AllSongs = () => {
    return (
        <div className="mt-6 space-y-6">
            <SongDisplay type={'/sorting?type=latests'} nav={'latests'} title={'Latest Releases'}/>
            <SongDisplay type={'/sorting?type=top-rated'} nav={'top-rated'} title={'Top Rated'}/>
        </div>
    );
};

export default AllSongs;