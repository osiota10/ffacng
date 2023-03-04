import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { signup } from "../../../actions/auth";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { CompanyInformationContext } from "../../../App";
import { myStyle } from "./login";


function SignUp({ signup, error, status }) {
    const companyInfo = useContext(CompanyInformationContext)

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, phone_number, email, password, re_password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        signup(first_name, last_name, phone_number, email, password, re_password);
    };

    useEffect(() => {
        if (status === 201) {
            handleShow()
        }
    }, [status]);

    return (
        <section style={myStyle}>
            <section class="container reg-forms">
                <section class="row">
                    <section class="col-lg-5 mx-auto">
                        <div class="px-4 py-6 mx-auto bg-light">
                            <Link to="/" className="text-decoration-none">
                                <header className="text-center mb-5">
                                    <img src={companyInfo.get_logo_url} alt="" width="50" height="50" className="mx-auto" />
                                    <h5 className="mt-1">{companyInfo.company_name}</h5>
                                </header>
                            </Link>

                            <h4 class="text-center">Create Account</h4>
                            <form class="mt-2" onSubmit={e => onSubmit(e)}>
                                <div class="col-md-12 mb-3">
                                    <label for="first_name" class="form-label">First Name</label>
                                    <input
                                        type="text"
                                        class="form-control inputfield"
                                        id="first_name"
                                        name="first_name"
                                        value={first_name}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger">
                                            {error.first_name}
                                        </small>
                                        :
                                        null}
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label for="last_name" class="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        class="form-control inputfield"
                                        id="last_name"
                                        name="last_name"
                                        value={last_name}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger">
                                            {error.last_name}
                                        </small>
                                        :
                                        null}
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input
                                        type="email"
                                        class="form-control inputfield"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger">
                                            {error.email}
                                        </small>
                                        :
                                        null}
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="phone_number" class="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        class="form-control inputfield"
                                        id="phone_number"
                                        aria-describedby="emailHelp"
                                        name="phone_number"
                                        value={phone_number}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger">
                                            {error.phone_number}
                                        </small>
                                        :
                                        null}
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label for="password1" class="form-label">Password</label>
                                    <input
                                        type="password"
                                        class="form-control inputfield"
                                        id="password1"
                                        name="password"
                                        // minLength='6'
                                        value={password}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger">
                                            {error.password}
                                            {error.non_field_errors}
                                        </small>
                                        :
                                        null}
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label for="password2" class="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        class="form-control inputfield"
                                        id="password2"
                                        name="re_password"
                                        // minLength='6'
                                        value={re_password}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger">
                                            {error.password}
                                            {error.non_field_errors}
                                        </small>
                                        :
                                        null}
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck" required />
                                        <label class="form-check-label " for="gridCheck">
                                            <small>By joining, you agree to our <Link to="/terms-and-conditions" className="text-decoration-none text-primary fw-bold">Terms of Service</Link> and <Link to="/privacy-policy" className="text-decoration-none text-primary fw-bold">Privacy Policies</Link></small>
                                        </label>
                                    </div>
                                </div>

                                <section className="d-grid">
                                    <button type="submit" class="btn btn-primary">Create Account</button>
                                </section>
                            </form>

                            <div class="mt-3">
                                <p class="text-center">Already have an account? <Link to="/login" class="fw-bold text-decoration-none">login</Link></p>
                            </div>
                        </div>
                    </section>
                </section>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Profile Created</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You have successfully created your Profile. Kindly Check your email to verify your profile
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn btn-outline-primary" onClick={handleClose}>
                            Close
                        </Button>
                        <Link className="btn btn-primary" to="/login">Login</Link>
                    </Modal.Footer>
                </Modal>
            </section>
        </section>
    );
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    status: state.auth.status,
});

export default connect(mapStateToProps, { signup })(SignUp);