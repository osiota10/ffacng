import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../../actions/auth";
import { connect } from 'react-redux';
import { useContext } from "react";
import { CompanyInformationContext } from "../../../App";
import LoaderIcon from "../../cards/utilities/spinner";

const pic = {
    url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
}

export const myStyle = {
    backgroundImage: `linear-gradient(0deg, rgba(0, 61, 43, 0.5), rgba(0, 61, 43, 0.5)), url(${pic.url})`,
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundAttachment: 'fixed'

};

function Login({ login, isAuthenticated, error }) {
    const companyInfo = useContext(CompanyInformationContext)

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)

        async function loginHandler() {
            try {
                await login(email, password);
                // handle successful login
            } catch (error) {
                // handle login error
            } finally {
                setLoading(false);
            }
        }

        loginHandler()

    };


    if (isAuthenticated) {
        return <Navigate to='/dashboard' replace={true} />
    }

    return (
        <section style={myStyle}>
            <section class="container reg-forms min-vh-100">
                <div class="row min-vh-100">
                    <section class="col-lg-5 mx-auto min-vh-100">
                        <section className="px-4 py-6 mx-auto bg-light min-vh-100" >
                            <Link to="/" className="text-decoration-none">
                                <header className="text-center mb-5">
                                    <img src={companyInfo.get_logo_url} alt="" width="50" height="50" className="mx-auto" />
                                    <h5 className="mt-1">{companyInfo.company_name}</h5>
                                </header>
                            </Link>

                            <h3 className="text-center mb-2">Welcome Back!</h3>
                            {error ?
                                <div className="alert alert-danger fw-bold mt-3" role="alert">
                                    Invalid Email/Password
                                </div>
                                :
                                null}

                            <form className="mt-1" onSubmit={e => onSubmit(e)}>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control inputfield" id="email" aria-describedby="emailHelp"
                                        name="email" value={email} onChange={e => onChange(e)} required />
                                </div>

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control inputfield" id="exampleInputPassword1"
                                        name="password" value={password} onChange={e => onChange(e)}
                                        minLength='6' required />
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1"><small class="fw-bold">Remember
                                            Login</small></label>
                                    </div>
                                    <div>
                                        <Link to="/reset-password" class="text-end text-decoration-none fw-bold"><small>Forgot
                                            Password?</small></Link>
                                    </div>
                                </div>

                                <section className="d-grid">
                                    <button type="submit" className={loading ? "btn btn-primary disabled" : "btn btn-primary"}>
                                        {loading
                                            ?
                                            <LoaderIcon />
                                            :
                                            "Login"
                                        }
                                    </button>
                                </section>


                                <div class="mt-3">
                                    <p class="text-center">Don't have an account? <Link to="/signup" class="fw-bold text-decoration-none">Create
                                        Account</Link></p>
                                </div>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </section>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);