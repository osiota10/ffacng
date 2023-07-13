import { useState, useContext } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CompanyInformationContext } from "../../App";



const ContactForm = () => {
    const companyInfo = useContext(CompanyInformationContext)

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Form
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        email: '',
        phone_number: '',
        message: '',
    });

    const { name, location, email, phone_number, message } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)

        // declare the data fetching function
        const fetchData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({ name, location, email, phone_number, message });

            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/contact-us`, body, config);
                setLoading(false)
                if (res.status === 201) {
                    handleShow()
                    setFormData({
                        name: '',
                        location: '',
                        email: '',
                        phone_number: '',
                        message: '',
                    })
                }
            } catch (err) {
                console.log(err.response.data);
            }
        }
        fetchData()
    };
    return (
        <div class="container py-8">
            <header class="text-center">
                <h2 class="h2">Contact Us</h2>
                <hr class="hr mx-auto" style={{ width: '10%' }} />
            </header>
            <div class="row gy-3">
                <div class="col-lg-5">
                    <section class="row mb-4 p-2 contact-info">
                        <section class="d-flex">
                            <section>
                                <i class="fa-solid fa-magnifying-glass-location  me-2 fs-4 text-primary bg-light p-3 rounded-circle"></i>
                            </section>
                            <section>
                                <h5 class="h5">Head Office</h5>
                                <p class="d-inline">{companyInfo.company_address}</p>
                            </section>
                        </section>
                    </section>

                    <section class="row mb-4 p-2 contact-info">
                        <a href={`mailto:${companyInfo.email}`} class="text-decoration-none">
                            <section class="d-flex">
                                <section>
                                    <i class="fa-solid fa-envelope me-2 fs-4 text-primary bg-light p-3 rounded-circle"></i>
                                </section>
                                <section>
                                    <h5 class="h5">Email</h5>
                                    <span
                                        class="custom-icon"></span>
                                    <p class="d-inline">{companyInfo.email}</p>
                                </section>
                            </section>
                        </a>
                    </section>

                    <section class="row p-2 contact-info">
                        <a href={`tel:${companyInfo.telephone}`} class="text-decoration-none">
                            <section class="d-flex">
                                <section>
                                    <i class="fa-solid fa-phone-volume me-2 fs-4 text-primary bg-light p-3 rounded-circle"></i>
                                </section>
                                <section>
                                    <h5 class="h5">Telephone</h5>
                                    <p class="d-inline">
                                        {companyInfo.telephone}</p>
                                </section>
                            </section>
                        </a>
                    </section>
                </div>

                <div class="col-lg-7">
                    <form onSubmit={e => onSubmit(e)}>
                        <section class="row gy-3">
                            <div class="col-lg-6">
                                <label for="formGroupExampleInput" class="form-label">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="formGroupExampleInput"
                                    placeholder="Full Name"
                                    name="name"
                                    onChange={e => onChange(e)}
                                    value={name}
                                    required
                                />
                            </div>
                            <div class="col-lg-6">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input
                                    type="email"
                                    class="form-control inputfield"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Email Address"
                                    name="email"
                                    onChange={e => onChange(e)}
                                    value={email}
                                    required
                                />
                            </div>
                            <div class="col-lg-6">
                                <label for="formGroupExampleInput" class="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="formGroupExampleInput2"
                                    placeholder="Phone Number"
                                    name="phone_number"
                                    onChange={e => onChange(e)}
                                    maxLength='11'
                                    value={phone_number}
                                    required
                                />
                            </div>
                            <div class="col-lg-6">
                                <label for="formGroupExampleInput" class="form-label">Location</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="formGroupExampleInput3"
                                    placeholder="Current Location"
                                    name="location"
                                    onChange={e => onChange(e)}
                                    value={location}
                                    required
                                />
                            </div>
                            <div class="col-lg-12">
                                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                                <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="4"
                                    placeholder="Enter Message"
                                    name="message"
                                    onChange={e => onChange(e)}
                                    value={message}
                                    required
                                ></textarea>
                            </div>
                            <div class="d-grid">
                                <button type="submit" className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}>
                                    {loading
                                        ?
                                        <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        :
                                        null
                                    }
                                    Send Message
                                </button>
                            </div>
                        </section>
                    </form>
                </div>
            </div>

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
        </div>
    );
}

export default ContactForm;