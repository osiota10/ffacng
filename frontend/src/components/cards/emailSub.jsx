import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const EmailSub = () => {
    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Form
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // e.target.reset();
        setLoading(true)

        // declare the data fetching function
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({ email });

            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/email-subscription`, body, config);
                setLoading(false)
                if (res.status === 201) {
                    handleShow()
                    setFormData({
                        email: '',
                    })
                }
            } catch (err) {
                console.error("User not authenticated");
            }
        }
        fetchData()
    };

    return (
        <section className="py-8 email bg-light">
            <section className="container">
                <header className="text-center ">
                    <h2 className="h2 text-primary fw-bolder">Subscribe to our Newsletter</h2>
                    <h6 className="h6 text-primary">Recieve exclusive updates straight to your inbox</h6>
                </header>

                <section className="row justify-content-center mt-2">
                    <section className="col-lg-6">
                        <form onSubmit={e => onSubmit(e)}>
                            <div Name="mb-1">
                                <label for="inputEmail3" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control inputfield"
                                    id="inputEmail3"
                                    name="email"
                                    onChange={e => onChange(e)}
                                    value={email}
                                    required
                                />
                            </div>
                            <div className="mt-1">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="gridCheck"
                                        required
                                    />
                                    <label className="form-check-label " for="gridCheck">
                                        <small>
                                            By submitting you agree to the <Link to="privacy-policy" className="text-decoration-none fw-bold">Privacy Policy</Link> and <Link to="terms-and-conditions" className="text-decoration-none fw-bold">Terms and Conditions</Link>
                                        </small>
                                    </label>
                                </div>

                                <div className="d-grid mt-3">
                                    <button type="submit" className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}>
                                        {loading
                                            ?
                                            <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            :
                                            null
                                        }

                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                </section>
            </section>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Thank you</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thank you for subscribing to our email marketing. You are sure to recieve latest updates from us on-the-go.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default EmailSub;