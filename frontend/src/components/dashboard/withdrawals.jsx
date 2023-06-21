import { useState, useContext } from "react";
import { WithdrawalListContext, UserAccountInfoContext } from "./navBar";
import axios from "axios";
import ReactPaginate from "react-paginate";
import SuccessModal from "./components/successModalMsg";

function Items({ currentItems }) {
    return (
        <section className="row">
            <h4 className="text-center mt-5 mb-2">Your Withdrawal History</h4>
            <section className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">Date Requested</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Balance Before</th>
                            <th scope="col">Balance After</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems && currentItems.map((item) =>
                            <tr>
                                <td>{item.created_at}</td>
                                <td>{`N${item.amount}`}</td>
                                <td>{`N${item.balance_before}`}</td>
                                <td>{`N${item.balance_after}`}</td>
                                <td><span className={item.status === 'Approved' ? 'badge rounded-pill bg-primary' : 'badge rounded-pill bg-danger'}>{item.status}</span></td>
                            </tr>
                        )}
                    </tbody>
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


const Withdrawals = () => {

    const userAccountInfo = useContext(UserAccountInfoContext)
    const withdrawalList = useContext(WithdrawalListContext)
    const totalWithdrawalRequest = Object.keys(withdrawalList).length
    const totalPendingRequest = withdrawalList.filter(item => item.status === 'Pending').length
    const totalApprovedRequest = withdrawalList.filter(item => item.status === 'Approved').length

    const withdrawalListReversed = withdrawalList.reverse();

    const [withDrawalStatusData, setWithdralStatusData] = useState([]);
    const [withdrawalError, setWithdrawalError] = useState([])

    // Form Success
    const [showAddSuccess, setAddSuccessShow] = useState(false);
    const handleAddSuccessClose = () => setAddSuccessShow(false);
    const handleAddSuccessShow = () => setAddSuccessShow(true);

    // Error Success
    const [showError, setShowError] = useState(false);
    const handleErrorSuccessClose = () => setShowError(false);
    const handleErrorSuccessShow = () => setShowError(true);

    // Form
    const [loading, setLoading] = useState(false);
    const [formAddData, setFormAddData] = useState({
        amount: '',
    });
    const { amount } = formAddData;

    const onChange = e => setFormAddData({ ...formAddData, [e.target.name]: e.target.value });

    const onAddSubmit = e => {
        e.preventDefault();
        setLoading(true)

        const submitData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                const body = JSON.stringify({ amount });

                try {
                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard/withdrawals`, body, config);
                    setLoading(false)

                    if (res.status === 200) {
                        setWithdralStatusData(res.data)
                        handleAddSuccessShow()
                        setFormAddData({
                            amount: '',
                        })
                    }

                } catch (err) {
                    setWithdrawalError(err.response.data.error);
                    handleErrorSuccessShow()
                    setLoading(false)
                    setFormAddData({
                        amount: '',
                    })
                }
            } else {
                console.error("User not authenticated");
            }
        }

        submitData()
    };

    return (
        <section className="container">
            <div className="row row-cols-1 row-cols-lg-4 g-4 mt-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body text-center">
                            <p className="card-text">Total Withdrawal Request</p>
                            <h5 className="card-title">{totalWithdrawalRequest}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <p className="card-text">Pending Withdrawals</p>
                            <h5 className="card-title">{totalPendingRequest}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body text-center">
                            <p className="card-text">Approved Withdrawals</p>
                            <h5 className="card-title">{totalApprovedRequest}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body text-center">
                            <p className="card-text">Available Withdrawal</p>
                            <h5 className="card-title">{`N${userAccountInfo.total_balance}`}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <section className="row mt-3">
                <div className="col-lg-7 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="text-center">Withdrawal Request</h5>
                            <p className="text-center">Enter Amount and wait for Approval</p>
                            <form onSubmit={e => onAddSubmit(e)}>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        className="form-control inputfield"
                                        id="amount"
                                        placeholder="Enter Amount to withdraw..."
                                        value={amount}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <section className="d-grid">
                                    <button
                                        type="submit"
                                        className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}
                                    >
                                        {loading
                                            ?
                                            <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            :
                                            null
                                        }
                                        Submit Request
                                    </button>
                                </section>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {
                Object.keys(withdrawalListReversed).length === 0
                    ?
                    <section className="text-center">
                        <h4 className="mt-8">Your Withdrawal History</h4>
                        <p>You are yet to make a Withdrawal Request</p>
                    </section>
                    :
                    <PaginatedItems itemsPerPage={6} data={withdrawalListReversed} />
            }

            {/* Success Message */}

            {/* Withdrawal Success Message */}
            {
                showAddSuccess
                    ?
                    <SuccessModal
                        title='Withdrawal Submitted'
                        message='Your withdrawal request has been successfully submitted and is now pending approval'
                        show={showAddSuccess}
                        onClose={handleAddSuccessClose}
                    />
                    :
                    null
            }

            {/* Withdrawal Error Message */}
            {
                showError
                    ?
                    <SuccessModal
                        title='Error'
                        message={withdrawalError}
                        show={showError}
                        onClose={handleErrorSuccessClose}
                    />
                    :
                    null
            }
        </section>
    );
}

export default Withdrawals;