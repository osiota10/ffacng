import { Outlet, Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { CompanyInformationContext } from "../../App";
import Offcanvas from 'react-bootstrap/Offcanvas';

const NavBar = () => {
    const companyInfo = useContext(CompanyInformationContext)
    const [fix, seFix] = useState(false)

    function handleFixNavBar() {
        if (window.scrollY >= 10) {
            seFix(true)
        } else {
            seFix(false)
        }
    }

    window.addEventListener('scroll', handleFixNavBar)

    // Offcanvas
    const [showOffcanvas, setOffcanvasShow] = useState(false);
    const handleOffcanvasClose = () => setOffcanvasShow(false);
    const handleOffcanvasShow = () => setOffcanvasShow(true);

    return (
        <>
            <nav className={fix ? 'navbar fixed-top navbar-expand-lg scroll-navbar bg-white shadow' : 'navbar fixed-top navbar-expand-lg bg-white'} >
                <div class="container-fluid">

                    <Link to="/" className='navbar-brand d-flex align-items-center'>
                        <img src={companyInfo.get_logo_url} alt="Logo" width="50" height="50" className="d-inline-block align-text-top me-1" />
                        <h6>{companyInfo.company_name}</h6>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvass" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" onClick={handleOffcanvasShow}>
                        <i className="fa-solid fa-bars text-primary fs-3"></i>
                        {/* <span className="navbar-toggler-icon"></span> */}
                    </button>

                    <Offcanvas id="offcanvasNavbar" show={showOffcanvas} onHide={handleOffcanvasClose} backdrop="static" responsive="lg" tabIndex="-1">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>{companyInfo.company_name}</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="offcanvas-body">
                                <div className="navbar-nav justify-content-center flex-grow-1 pe-3" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                            <NavLink to="/" className='nav-link ps-2' aria-current="page">Home</NavLink>
                                        </li>

                                        <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                            <NavLink to="/about" className='nav-link ps-2' aria-current="page">About</NavLink>
                                        </li>
                                        <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                            <NavLink to="/services" className='nav-link ps-2'>Services</NavLink>
                                        </li>
                                        <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                            <NavLink to="/mlm-marketing" className='nav-link ps-2'>MLM Marketing</NavLink>
                                        </li>
                                        <li className="nav-item me-3" onClick={handleOffcanvasClose}>
                                            <NavLink to="/contact" className='nav-link ps-2'>Contact</NavLink>
                                        </li>
                                    </ul>
                                    <span className="vstack d-lg-none .d-xl-block mt-3">
                                        <Link className='btn btn-outline-primary text-decoration-none mb-3' to="/login">Log In</Link>
                                        <Link className='btn btn-primary text-decoration-none' to="/signup">Create Account</Link>
                                    </span>
                                </div>
                                <span className="d-none d-lg-block">
                                    <Link className='btn btn-outline-primary text-decoration-none me-1' to="/login">Log In</Link>
                                    <Link className='btn btn-primary text-decoration-none' to="/signup">Create Account</Link>
                                </span>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </nav>

            <section className="mt-8">
                <Outlet />
            </section>
        </>
    );
}

export default NavBar;