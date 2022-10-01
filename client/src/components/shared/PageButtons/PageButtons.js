import { useJobsContext } from '../../../context/jobsContext/jobsContext';

function PageButtons() {

    const { page, numOfPages } = useJobsContext();

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });

    const nextPage = () => {
        console.log('nextPage');

    };
    const prevPage = () => {
        console.log('prevPage');
    };


    return (
        <section>
            <button onClick={prevPage} >prev</button>
            {pages.map((pageNum) => (
                <button key={pageNum}>{pageNum}</button>
            ))}
            <button onClick={nextPage} >next</button>
        </section>
    );
}

export default PageButtons;