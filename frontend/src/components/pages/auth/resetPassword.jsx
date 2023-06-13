import { reset_password } from "../../../actions/auth";
import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { CompanyInformationContext } from "../../../App";
import { myStyle } from "./login";
import LoaderIcon from "../../cards/utilities/spinner";


function ResetPassword({ reset_password, error, status }) {
    const [loading, setLoading] = useState(false);

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const companyInfo = useContext(CompanyInformationContext)

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)

        async function resetPasswordHandler() {
            try {
                await reset_password(email);
                // handle successful Password Reset
            } catch (error) {
                // handle Password Reset error
            } finally {
                setLoading(false);
            }
        }

        resetPasswordHandler()
    };

    useEffect(() => {
        if (status === 204) {
            handleShow()
        }
    }, [status]);

    return (
        <section style={myStyle}>
            <section className="container reg-forms min-vh-100">
                <section className="row">
                    <section className="col-lg-5 mx-auto min-vh-100">
                        <div className="px-4 py-6 mx-auto bg-light min-vh-100">
                            <Link to="/" className="text-decoration-none">
                                <header className="text-center mb-5">
                                    <img src={companyInfo.get_logo_url} alt="" width="50" height="50" className="mx-auto" />
                                    <h5 className="mt-1">{companyInfo.company_name}</h5>
                                </header>
                            </Link>

                            <h4 className="text-center">Reset Password</h4>
                            <form className="mt-3" onSubmit={e => onSubmit(e)}>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control inputfield"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        placeholder="johnsmith@example.com"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    {error ?
                                        <small className="text-danger fw-bold">
                                            {error}
                                        </small>
                                        :
                                        null}
                                </div>

                                <section className="d-grid">
                                    <button type="submit" className={loading ? "btn btn-primary disabled" : "btn btn-primary"}>
                                        {loading
                                            ?
                                            <LoaderIcon />
                                            :
                                            "Reset Password"
                                        }
                                    </button>
                                </section>
                                <Link className="d-flex justify-content-center btn btn-outline-primary mt-2" to="/login">Back to Login</Link>
                            </form>
                        </div>
                    </section>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Email Sent</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Instructions to reset your password has be sent to your <span className="fw-bold"> email</span>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="btn btn-outline-primary" onClick={handleClose}>
                                Close
                            </Button>
                            <Link className="btn btn-primary" to="/login">Login</Link>
                        </Modal.Footer>
                    </Modal>
                </section>
            </section >
        </section>
    );
}

const mapStateToProps = state => ({
    error: state.auth.error,
    status: state.auth.status,
});

export default connect(mapStateToProps, { reset_password })(ResetPassword);