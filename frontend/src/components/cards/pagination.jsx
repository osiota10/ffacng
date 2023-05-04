import ReactPaginate from "react-paginate";



function Items({ currentItems }) {
    return (
        <section className='container py-8'>
            <section className='row row-cols-1 row-cols-lg-3 g-6 justify-content-center'>
                {currentItems &&
                    currentItems.map((item) => (
                        <section>
                            <Link className='text-decoration-none' to="#">
                                <AthleteCard
                                    key={item.id}
                                    firstName={item.first_name}
                                    lastName={item.last_name}
                                    pic={item.get_photo_url}
                                    sport={item.sport}
                                    state_of_origin={item.state_of_origin}
                                    nationality={item.nationality}
                                    weight={item.weight}
                                    height={item.height}
                                    sportstats={item.sportstats}
                                />
                            </Link></section>
                    ))}
            </section>
        </section>
    );
}

function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const AthleteList = useContext(AthleteContext)
    const items = Object.values(AthleteList);
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <section className='container'>
                <Items currentItems={currentItems} />

                {Object.keys(items).length > itemsPerPage
                    ?
                    <ReactPaginate
                        previousLabel={`Prev`}
                        nextLabel={'Next'}
                        breakLabel="..."
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        renderOnZeroPageCount={null}
                        marginPagesDisplayed={3}
                        // CSS Classes
                        containerClassName={'pagination justify-content-center py-8'}
                        pageClassName={'page-item me-1'}
                        pageLinkClassName={'page-link rounded'}
                        previousClassName={'page-item me-5'}
                        previousLinkClassName={'page-link rounded'}
                        nextClassName={'page-item ms-4'}
                        nextLinkClassName={'page-link rounded'}
                        breakClassName={'page-item me-1'}
                        breakLinkClassName={'page-link rounded'}
                        activeClassName={'active'}
                    />
                    :
                    null
                }
            </section>
        </>
    );
}
