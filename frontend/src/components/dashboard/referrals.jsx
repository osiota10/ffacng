import { useState, useContext } from "react";
import { ReferralListContext, UserInfoContext, UserAccountInfoContext } from "./navBar";
import ReactPaginate from "react-paginate";
import CopyToClipboardButton from "./components/clipCopy";

function Items({ currentItems }) {
    return (
        <section>
            <h4 className="text-center mt-8 mb-2">Your Referrals</h4>

            <section className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
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

const Referrals = () => {
    const userInfo = useContext(UserInfoContext)
    const referralList = useContext(ReferralListContext)
    const totalReferrals = Object.keys(referralList).length
    const userAccountInfo = useContext(UserAccountInfoContext)

    return (
        <>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
                <div className="col">
                    <div className="card">
                        <section className="text-center">
                            <CopyToClipboardButton text={userInfo.code} />
                        </section>
                        <div className="card-body text-center">
                            <p className="card-text">Referral ID</p>
                            <h5 className="card-title">{userInfo.code}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <p className="card-text">Total Referrals</p>
                            <h5 className="card-title">{totalReferrals}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body text-center">
                            <p className="card-text">Referrals Earnings</p>
                            <h5 className="card-title">{`N${userAccountInfo.referral_bonus_earned}`}</h5>
                        </div>
                    </div>
                </div>
            </div>

            {
                Object.keys(referralList).length === 0
                    ?
                    <section className="text-center">
                        <h4 className="mt-8">Your Referrals</h4>
                        <p>Your Referral List is currently empty</p>
                    </section>
                    :
                    <PaginatedItems itemsPerPage={6} data={referralList} />
            }
        </>
    );
}

export default Referrals;