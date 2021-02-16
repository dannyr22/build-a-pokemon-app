const Pagination = ({goToNextPage, goToPreviousPage}) => {
    return (
        <>
            {goToPreviousPage && <button onClick={goToPreviousPage}>Previous</button>}
            {goToNextPage && <button onClick={goToNextPage}>Next</button>}
        </>
    );
}
 
export default Pagination;