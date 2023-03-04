import { Outlet, NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext, createContext } from "react";
import { CompanyInformationContext } from "../../App";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import axios from "axios";

export const UserInfoContext = createContext(null)


const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Notifications</Popover.Header>
        <Popover.Body>
            No Notifications
        </Popover.Body>
    </Popover>
);

function DashboardSideBar({ logout, isAuthenticated }) {
    const [redirect, setRedirect] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const navigate = useNavigate();
    // setTimeout(() => {
    //     if (!isAuthenticated) {
    //         logout_user()
    //         return navigate('/login')
    //     }
    // }, 600000)

    // const CurrentUserInfo = useContext(UserInfoContext)
    const companyInfo = useContext(CompanyInformationContext)
    const [toggleSideMenu, setToggleSideMenu] = useState(true)
    const [activeSideBarElement, setActiveSideBarElement] = useState(false)

    // Toggle Menu
    function handleToggleSideMenu() {
        setToggleSideMenu(!toggleSideMenu)
    }

    // Fetch Current User
    const fetchUser = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
                setUserInfo(res.data)

            } catch (err) {
                console.log(err);
            }
        } else {
            console.error("User not authenticated");
        }
    }

    useEffect(() => {
        // Calling fetchUser
        fetchUser()
    }, []);


    return (
        <UserInfoContext.Provider value={userInfo}>
            <section>

                {redirect ? <Navigate to='/login' /> : null}

                {toggleSideMenu
                    ?
                    <div class="side-navbar active-nav d-flex justify-content-between flex-wrap flex-column" id="sidebar">
                        <ul class="nav flex-column text-white w-100">
                            <p class="nav-link h3 text-white my-2">
                                <img src={userInfo.get_photo_url} className="rounded-circle mx-auto me-1" width="40" height="40" alt="..." />
                                <span></span>
                                Hi, {userInfo.first_name}
                            </p>
                            <li className='nav-link text-white py-1'>
                                <NavLink to="/dashboard" end className='text-decoration-none' aria-current="page">
                                    <i class="fs-6 fa-solid fa-house"></i>
                                    <span class="ms-1 d-sm-inline">Dashboard</span>
                                </NavLink>
                            </li>

                            <li class='nav-link py-1'>
                                <NavLink to="/dashboard/Withdrawals" end className='text-decoration-none' aria-current="page">
                                    <i class="fs-6 fa-solid fa-money-bill-transfer"></i>
                                    <span class="ms-1 d-sm-inline">Withdrawals</span>
                                </NavLink>
                            </li>

                            <li className='nav-link py-1'>
                                <NavLink to="/dashboard/levels" end className='text-decoration-none' aria-current="page">
                                    <i className="fs-6 fa-solid fa-list-check"></i>
                                    <span className="ms-1 d-sm-inline">Levels</span>
                                </NavLink>
                            </li>

                            <li class="nav-link py-1">
                                <NavLink to="/dashboard/downlines" end className='text-decoration-none' aria-current="page">
                                    <i class="fs-6 fa-solid fa-timeline"></i>
                                    <span class="ms-1 d-sm-inline">Downlines</span>
                                </NavLink>
                            </li>

                            <li class='nav-link py-1'>
                                <NavLink to="/dashboard/payments" end className='text-decoration-none' aria-current="page">
                                    <i class="fs-6 fa-solid fa-key"></i>
                                    <span class="ms-1 d-sm-inline">Payment PIN</span>
                                </NavLink>
                            </li>

                            <li class="nav-link py-1">
                                <NavLink to="/dashboard/referrals" end className='text-decoration-none' aria-current="page">
                                    <i class="fs-6 fa-solid fa-users"></i>
                                    <span class="ms-1 d-sm-inline">Referrals</span>
                                </NavLink>
                            </li>

                            <li class="nav-link py-1">
                                <NavLink to="/dashboard/help-and-support" end className='text-decoration-none' aria-current="page">
                                    <i class="fs-6 fa-solid fa-circle-info"></i>
                                    <span class="ms-1 d-sm-inline">Help and Support</span>
                                </NavLink>
                            </li>
                        </ul>

                        <div>
                            <a class="nav-link pb-4 text-decoration-none" href="#"><i class="fs-6 uil uil-signout"></i><span
                                class="ms-1 d-sm-inline">Sign Out</span></a>
                        </div>
                    </div>
                    :
                    null
                }

                {/* "my-container active-cont " */}
                <div className={toggleSideMenu ? "my-container active-cont " : null}>
                    {/* dashboard top menu */}
                    <nav className='navbar navbar-dark bg-white shadow sticky-top' >
                        <div className="container-fluid">
                            <a role="button"><i className="fs-3 fa-solid fa-bars text-primary" id="menu-btn" onClick={handleToggleSideMenu}></i></a>


                            <section>
                                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                    <span className="me-3 position-relative" >
                                        <i className="fs-5 fa-solid fa-bell text-primary">
                                            <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1">
                                                <span class="visually-hidden">
                                                    unread messages
                                                </span>
                                            </span>
                                        </i>
                                    </span>
                                </OverlayTrigger>

                                <div className="btn-group">
                                    <section className="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                        <a>
                                            <img src={userInfo.get_photo_url} className="rounded-circle mx-auto" width="50" height="50" alt="..." />
                                        </a>
                                    </section>

                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                                        <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                                        <li><a class="dropdown-item" href="#">Sign Out</a></li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </nav>

                    {/* Dashboard Main contents */}
                    <section class="container min-vh-100">
                        <Outlet />
                    </section>

                </div>
            </section>
        </UserInfoContext.Provider>

    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(DashboardSideBar);