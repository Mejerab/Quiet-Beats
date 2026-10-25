import Pagination from '@mui/material/Pagination';

const PaginationHook = () => {
    return (
        <div className="mx-auto w-fit mt-7">
            <Pagination className='text-white' color='#fff' count={10} />
        </div>
    );
};

export default PaginationHook;