import { useJobsContext } from '../../../context/jobsContext/jobsContext';

function PageButtons() {

    const { page, numOfPages, changePage } = useJobsContext();

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });

    const nextPage = () => {
        let nextPage = page + 1;
        if (nextPage <= numOfPages) {
            changePage(nextPage);
        }

    };
    const prevPage = () => {
        let prevPage = page - 1;
        if (prevPage >= 1) {
            changePage(prevPage);
        }
    };

    return (
        <section>
            <button
                className='btn btn-secondary btn-prev'
                onClick={prevPage}
            >
                prev
            </button>
            {pages.map((pageNum) => (
                <button
                    className={`${pageNum === page ? 'btn btn-primary' : 'btn btn-secondary'}`}
                    key={pageNum}
                    onClick={() => changePage(pageNum)}
                >
                    {pageNum}
                </button>
            ))}
            <button
                className='btn btn-secondary btn-next'
                onClick={nextPage}
            >
                next
            </button>
        </section>
    );
}

export default PageButtons;