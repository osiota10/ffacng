import { useState, useContext } from "react";
import { DownlineListContext } from "./navBar";
import ReactPaginate from "react-paginate";

function Items({ currentItems }) {
    return (
        <section>
            <h4 class="text-center mt-8">Your Downlines</h4>

            <section class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Date Joined</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems && currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.date_joined}</td>
                                <td>{item.first_name} {item.last_name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone_number}</td>
                                <td><span className={item.status === 'Active' ? 'badge rounded-pill bg-primary' : 'badge rounded-pill bg-danger'}>{item.status}</span></td>
                            </tr>
                        ))}

                    </tbody>

                    {/* <tbody>
            <td colspan="4" class="text-center">No Downline yet</td>
        </tbody> */}

                </table>
            </section>
        </section>
    );
}

function PaginatedItems({ itemsPerPage, data }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const dataList = data
    const items = Object.values(dataList);
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
                        containerClassName={'pagination justify-content-center py-3'}
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

const Downlines = () => {
    const downlineList = useContext(DownlineListContext)
    const totalDownline = Object.keys(downlineList).length
    const expectedDownline = 126
    const remainingDownline = expectedDownline - totalDownline

    return (
        <>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-3">
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Current Downlines</p>
                            <h5 class="card-title">{totalDownline}</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Expected Downlines</p>
                            <h5 class="card-title">{expectedDownline}</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Remaining Downlines</p>
                            <h5 class="card-title">{remainingDownline}</h5>
                        </div>
                    </div>
                </div>
            </div>

            {
                Object.keys(downlineList).length === 0
                    ?
                    <section className="text-center">
                        <h4 className="mt-8">Your Downlines</h4>
                        <p>Your Downline is currently empty</p>
                    </section>
                    :
                    <PaginatedItems itemsPerPage={6} data={downlineList} />
            }
        </>
    );
}

export default Downlines;