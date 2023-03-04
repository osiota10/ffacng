import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Payments = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [addPaymentData, setAddPaymentData] = useState([]);

    console.log(paymentData)

    // Form Success
    const [showAddSuccess, setAddSuccessShow] = useState(false);
    const handleAddSuccessClose = () => setAddSuccessShow(false);
    const handleAddSuccessShow = () => setAddSuccessShow(true);

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
                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard/payments`, body, config);
                    setLoading(false)
                    if (res.status === 201) {
                        setAddPaymentData(res.data)
                        handleAddSuccessShow()
                        setFormAddData({
                            amount: '',
                        })
                    }

                } catch (err) {
                    console.log(err);
                }
            } else {
                console.error("User not authenticated");
            }
        }

        submitData()
    };


    // Payment Proof Modal
    const [addPaymentProofSuccess, setAddPaymentProofSuccess] = useState(false);
    const [addPaymentProof, setAddPaymentProof] = useState(false);
    const handleAddPaymentProofClose = () => {
        setAddPaymentProof(false)
    };
    const handleAddPaymentProofShow = () => setAddPaymentProof(true);




    // Add Payment Form Data
    const [paymentFormAddData, setPaymentFormAddData] = useState();

    // const { payment_proof } = paymentFormAddData;

    const handleEdit = (item) => {
        handleAddPaymentProofShow()
        setPaymentFormAddData(item)
        console.log(item)
    }

    // const onPaymentFormChange = e => setPaymentFormAddData({ ...paymentFormAddData, [e.target.name]: e.target.value });
    const onPaymentFormChange = e => setPaymentFormAddData(e.target.files[0]);
    console.log(paymentFormAddData)

    const onAddPaymentSubmit = e => {
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

                const body = JSON.stringify(paymentFormAddData);
                console.log(body)
                try {
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/dashboard/payments/${paymentFormAddData.id}`, body, config);
                    setLoading(false)
                    if (res.status === 200) {
                        setAddPaymentProofSuccess(true)
                        setFormAddData({
                            payment_proof: '',
                        })
                    }

                } catch (err) {
                    console.log(err);
                }
            } else {
                console.error("User not authenticated");
            }
        }

        submitData()
    };


    console.log(addPaymentProof)
    useEffect(() => {
        //List Payment History
        const fetchPaymentData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    axios.get(`${process.env.REACT_APP_API_URL}/dashboard/payments`, config)
                        .then(res => {
                            setPaymentData(res.data)
                        })
                } catch (err) {
                    console.error("User not authenticated");
                }
            } else {
                console.error("User not authenticated");
            }
        }

        fetchPaymentData()
    }, []);

    return (
        <>
            <div class="row row-cols-1 row-cols-lg-4 g-4 mt-3">
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Total Payments</p>
                            <h5 class="card-title">120</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Approved Payments</p>
                            <h5 class="card-title">45</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Pending Payments</p>
                            <h5 class="card-title">5</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Rejected Payments</p>
                            <h5 class="card-title">2</h5>
                        </div>
                    </div>
                </div>
            </div>

            <section className="row mt-8">
                <div className="col-lg-7 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="text-center">Generate Payment PIN</h5>
                            <p className="text-center">Enter Amount and wait for Approval</p>
                            <form onSubmit={e => onAddSubmit(e)}>
                                <div className="mb-3">
                                    <label for="amount" className="form-label">Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        className="form-control inputfield"
                                        id="amount"
                                        placeholder="Enter Amount to Pay..."
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
                                        Generate PIN
                                    </button>
                                </section>
                            </form>
                        </div>
                    </div>
                </div>

            </section>

            <h3 className="text-center mt-8">Your Payment History</h3>

            <section className="table-responsive mt-3">
                <table className="table table-striped table-hover">
                    {paymentData
                        ?
                        <>
                            <thead className="table-primary">
                                <tr>
                                    <th scope="col">Date Requested</th>
                                    <th scope="col">Payment Pin</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Upload Payment Proof</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paymentData.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.date}</td>
                                        <td>{item.pin}</td>
                                        <td>{item.amount}</td>
                                        <td><span className={item.status === 'Approved' ? 'badge rounded-pill bg-primary' : 'badge rounded-pill bg-danger'}>{item.status}</span></td>
                                        <td>
                                            <span className="btn btn-primary btn-sm me-2"
                                                onClick={() => handleEdit(item)}
                                            >
                                                Upload
                                            </span>

                                            {item.payment_proof
                                                ?
                                                <span className="btn btn-info btn-sm me-2">View</span>
                                                :
                                                <span className="btn btn-info btn-sm me-2 disabled">View</span>
                                            }

                                        </td>
                                    </tr>


                                )}

                            </tbody>
                        </>
                        :
                        <tbody>
                            <td colspan="4" class="text-center">You are yet to make a Withdrawal Request</td>
                        </tbody>
                    }
                </table>
            </section>

            {/* Pin Generation Success Message */}
            <Modal
                show={showAddSuccess}
                onHide={handleAddSuccessClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Pin successfully Generated</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <section class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead class="table-primary">
                                <tr>
                                    <th scope="col" colspan="2" class="text-center">Payment Information</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Date Generated:</td>
                                    <td>{addPaymentData.date}</td>
                                </tr>
                                <tr>
                                    <td>Pin:</td>
                                    <td>{addPaymentData.pin}</td>
                                </tr>
                                <tr>
                                    <td>Amount:</td>
                                    <td>{addPaymentData.amount}</td>
                                </tr>
                                <tr>
                                    <td>Status:</td>
                                    <td>{addPaymentData.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="btn btn-danger" onClick={handleAddSuccessClose} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Payment Proof Forms */}
            <Modal
                show={addPaymentProof}
                onHide={handleAddPaymentProofClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {addPaymentProofSuccess
                            ?
                            'Upload Success'
                            :
                            'Upload Payment Proof'
                        }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {addPaymentProofSuccess
                        ?
                        <p>Payment Proof has been updated Successfully</p>
                        :
                        <form onSubmit={e => onAddPaymentSubmit(e)}>
                            <div class="input-group mb-3">
                                <input
                                    type="file"
                                    class="form-control"
                                    id="inputGroupFile02"
                                    name="payment_proof"
                                    onChange={e => onPaymentFormChange(e)}
                                    required
                                />
                                <label class="input-group-text" for="inputGroupFile02">Upload</label>
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
                                    Submit
                                </button>
                            </section>
                        </form>
                    }
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="btn btn-danger" onClick={handleAddPaymentProofClose} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Payments;