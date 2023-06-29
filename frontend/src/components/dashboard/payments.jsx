import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CopyToClipboardButton from "./components/clipCopy";
import LoaderIcon from "../cards/utilities/spinner";
import SuccessModal from "./components/successModalMsg";
import { UserInfoContext } from "./navBar";


const Payments = () => {
    const userInfo = useContext(UserInfoContext)

    //Fetch Payment Pin info
    const [paymentData, setPaymentData] = useState([]);
    // Loading
    const [loading, setLoading] = useState(false);
    // Update File
    const [paymentProofFile, setPaymentProofFile] = useState([]);
    // Add Payment Form Data
    const [paymentFormAddData, setPaymentFormAddData] = useState([]);
    const [addPaymentProof, setAddPaymentProof] = useState(false);
    const handleAddPaymentProofClose = () => {
        setAddPaymentProof(false)
    };
    const handleAddPaymentProofShow = () => setAddPaymentProof(true);
    // Form Success
    const [showAddSuccess, setAddSuccessShow] = useState(false);
    const handleAddSuccessClose = () => setAddSuccessShow(false);
    const handleAddSuccessShow = () => setAddSuccessShow(true);

    //Check if First Item exist
    const firstItem = paymentData && paymentData.length > 0

    // Call Payment Proof Modal
    const handleEdit = (item) => {
        handleAddPaymentProofShow()
        setPaymentFormAddData(item)
    }

    // Update Payment Proof input
    const onPaymentFormChange = e => setPaymentProofFile(e.target.files[0]);

    // Payment Proof input onSubmit
    const onAddPaymentSubmit = e => {
        e.preventDefault();
        setLoading(true)

        const submitData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                const formData = new FormData();
                formData.append('payment_proof', paymentProofFile);
                formData.append('id', paymentFormAddData.id);

                try {
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/dashboard/payments`, formData, config);
                    setLoading(false)

                    if (res.status === 200) {
                        handleAddPaymentProofClose()
                        handleAddSuccessShow()
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
        <section className='container'>
            <div className="row row-cols-1 row-cols-lg-3 g-4 mt-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body text-center">
                            <p className="card-text">Payment PIN</p>
                            <h5 className="card-title">{firstItem ? paymentData[0].pin : null}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <p className="card-text">Payment Status</p>
                            <h5 className="card-title">{firstItem ? paymentData[0].status : null}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <p className="card-text">Current Plan</p>
                            <h5 className="card-title">{userInfo.plan}</h5>
                        </div>
                    </div>
                </div>
            </div>

            {
                Object.keys(paymentData).length === 0
                    ?
                    null
                    :
                    <section className="card mt-6">
                        <section className="row row-cols-1 row-cols-lg-2 g-4 p-4">
                            <div className="col">
                                <h3 className="text-center mb-3">Payment Information</h3>
                                <section className="table-responsive">
                                    <table class="table ">
                                        <thead className="table-primary">
                                            <tr>
                                                <th scope="col" colspan="2" className="text-center">Payment Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Date Created:</td>
                                                <td>{firstItem ? paymentData[0].date : null}</td>
                                            </tr>
                                            <tr>
                                                <td>Payment PIN:</td>
                                                <td>
                                                    {firstItem ? paymentData[0].pin : null}
                                                    <span className="ms-3">
                                                        <CopyToClipboardButton text={firstItem ? paymentData[0].pin : null} />
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Amount:</td>
                                                <td>{firstItem ? <>N{paymentData[0].amount}</> : null}</td>
                                            </tr>
                                            <tr>
                                                <td>Purpose:</td>
                                                <td>One-time registration fee</td>
                                            </tr>
                                            <tr>
                                                <td>Status:</td>
                                                <td>
                                                    {firstItem
                                                        ?
                                                        <span
                                                            className={paymentData[0].status === 'Approved'
                                                                ?
                                                                'badge rounded-pill bg-primary'
                                                                :
                                                                'badge rounded-pill bg-danger'}>
                                                            {paymentData[0].status}
                                                        </span>
                                                        :
                                                        null
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Actions:</td>
                                                <td>
                                                    <span className="btn btn-primary btn-sm me-2"
                                                        onClick={() => handleEdit(paymentData[0])}
                                                    >
                                                        <i class="fa-solid fa-upload me-1"></i>
                                                        Upload Payment Proof
                                                    </span>

                                                    {firstItem && paymentData[0].payment_proof
                                                        ?
                                                        <a href={firstItem ? paymentData[0].get_image_url : null} target="_blank" rel="noreferrer"><span className="btn btn-info btn-sm me-2"><i class="fa-solid fa-image me-1"></i>View</span></a>
                                                        :
                                                        <span className="btn btn-info btn-sm disabled"><i class="fa-solid fa-image me-1"></i>View</span>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>

                            <div class="col">
                                <h3 className="text-center mb-3">Payment Instructions</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque qui et animi deserunt libero esse rem necessitatibus? Modi voluptatum incidunt mollitia, ducimus optio, aspernatur nam fuga exercitationem tenetur eaque vero eveniet excepturi? Reprehenderit sequi, quisquam voluptatibus accusamus sit eaque in distinctio laboriosam totam eum beatae tenetur inventore nihil, nesciunt eos laudantium quasi modi quod nostrum culpa repellat illo! Minima, voluptatum?</p>
                            </div>
                        </section>
                    </section>
            }

            {/* Add Payment Proof Success Message */}
            {
                showAddSuccess
                    ?
                    <SuccessModal
                        title='Upload Success'
                        message='you have successfully uploaded Payment Proof'
                        show={showAddSuccess}
                        onClose={handleAddSuccessClose}
                    />
                    :
                    null
            }

            {/* Add Payment Proof Forms */}
            <Modal
                show={addPaymentProof}
                onHide={handleAddPaymentProofClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Upload Payment Proof
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                                    <LoaderIcon />
                                    :
                                    null
                                }
                                Submit
                            </button>
                        </section>
                    </form>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="btn btn-danger" onClick={handleAddPaymentProofClose} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default Payments;