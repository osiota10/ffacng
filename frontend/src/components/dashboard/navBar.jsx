import { Outlet, NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, createContext } from "react";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useEffect } from "react";
import axios from "axios";
import NotificationCard from "./components/notificationCard";

export const UserInfoContext = createContext(null)
export const DownlineListContext = createContext(null)
export const ReferralListContext = createContext(null)
export const WithdrawalListContext = createContext(null)
export const UserAccountInfoContext = createContext(null)
export const NotificationContext = createContext(null)

function DashboardSideBar({ logout, isAuthenticated }) {
    const [redirect, setRedirect] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [downlineData, setDownlineData] = useState([]);
    const [refferalData, setRefferalData] = useState([]);
    const [withdrawalData, setWithdrawalData] = useState([]);
    const [userAccountInfo, setUserAccountinfo] = useState([]);
    const [notification, setNotification] = useState([])

    // Log user out
    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    // Any unread Notification
    const isAnyNewNotification = notification.some((item) => !item.is_read);

    // Notification popover
    const popover = (
        <Popover id="popover-basic" className="shadow">
            <NotificationCard popover={true} />
        </Popover>
    );

    const navigate = useNavigate();
    // setTimeout(() => {
    //     if (!isAuthenticated) {
    //         logout_user()
    //         return navigate('/login')
    //     }
    // }, 600000)

    // const CurrentUserInfo = useContext(UserInfoContext)

    const [toggleSideMenu, setToggleSideMenu] = useState(true)

    // Toggle Menu
    function handleToggleSideMenu() {
        setToggleSideMenu(!toggleSideMenu)
    }

    // Fetch Notifications
    const fetchNotifications = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                axios.get(`${process.env.REACT_APP_API_URL}/dashboard/user-notifications`, config)
                    .then(res => {
                        setNotification(res.data)
                    })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
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

    //List Downline
    const fetchDownlineData = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                axios.get(`${process.env.REACT_APP_API_URL}/dashboard/downlines`, config)
                    .then(res => {
                        setDownlineData(res.data)
                    })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
    }

    //List Refferals
    const fetchRefferalData = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                axios.get(`${process.env.REACT_APP_API_URL}/dashboard/refferals`, config)
                    .then(res => {
                        setRefferalData(res.data)
                    })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
    }

    //List Withdrawals
    const fetchWithdrawalData = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                axios.get(`${process.env.REACT_APP_API_URL}/dashboard/withdrawals`, config)
                    .then(res => {
                        setWithdrawalData(res.data)
                    })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
    }

    //User Account
    const fetchUserAccountInfoData = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                axios.get(`${process.env.REACT_APP_API_URL}/dashboard/user-account-info`, config)
                    .then(res => {
                        setUserAccountinfo(res.data)
                    })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
    }

    useEffect(() => {
        // Calling fetchUser
        fetchUser()

        // Calling Downline
        fetchDownlineData()

        // Calling Refferal Data
        fetchRefferalData()

        // Calling Withdrawals
        fetchWithdrawalData()

        // Calling User Account Info
        fetchUserAccountInfoData()

        // Calling Notifications
        fetchNotifications();
    }, []);

    return (
        <UserInfoContext.Provider value={userInfo}>
            <DownlineListContext.Provider value={downlineData}>
                <ReferralListContext.Provider value={refferalData}>
                    <WithdrawalListContext.Provider value={withdrawalData}>
                        <UserAccountInfoContext.Provider value={userAccountInfo}>
                            <NotificationContext.Provider value={notification}>
                                <section>
                                    {redirect ? <Navigate to='/login' /> : null}

                                    {toggleSideMenu
                                        ?
                                        <div className="side-navbar active-nav d-flex justify-content-between flex-wrap flex-column" id="sidebar">
                                            <ul className="nav flex-column text-white w-100">
                                                <p className="nav-link h3 text-white my-2">
                                                    <img src={userInfo.get_photo_url} className="rounded-circle mx-auto me-1" width="40" height="40" alt="..." />
                                                    <span></span>
                                                    Hi, {userInfo.first_name}
                                                </p>
                                                <li className='nav-link text-white py-1'>
                                                    <NavLink to="/dashboard" end className='text-decoration-none' aria-current="page">
                                                        <i className="fs-6 fa-solid fa-house"></i>
                                                        <span className="ms-1 d-sm-inline">Dashboard</span>
                                                    </NavLink>
                                                </li>

                                                <li class='nav-link py-1'>
                                                    <NavLink to="/dashboard/Withdrawals" end className='text-decoration-none' aria-current="page">
                                                        <i className="fs-6 fa-solid fa-money-bill-transfer"></i>
                                                        <span className="ms-1 d-sm-inline">Withdrawals</span>
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
                                                        <i className="fs-6 fa-solid fa-timeline"></i>
                                                        <span className="ms-1 d-sm-inline">Downlines</span>
                                                    </NavLink>
                                                </li>

                                                <li class='nav-link py-1'>
                                                    <NavLink to="/dashboard/payments" end className='text-decoration-none' aria-current="page">
                                                        <i className="fs-6 fa-solid fa-key"></i>
                                                        <span className="ms-1 d-sm-inline">Payment PIN</span>
                                                    </NavLink>
                                                </li>

                                                <li class="nav-link py-1">
                                                    <NavLink to="/dashboard/referrals" end className='text-decoration-none' aria-current="page">
                                                        <i className="fs-6 fa-solid fa-users"></i>
                                                        <span className="ms-1 d-sm-inline">Referrals</span>
                                                    </NavLink>
                                                </li>

                                                {/* <li class="nav-link py-1">
                                                <NavLink to="/dashboard/help-and-support" end className='text-decoration-none' aria-current="page">
                                                    <i className="fs-6 fa-solid fa-circle-info"></i>
                                                    <span className="ms-1 d-sm-inline">Help and Support</span>
                                                </NavLink>
                                            </li> */}

                                                <li class="nav-link py-1">
                                                    <NavLink to="/dashboard/notifications" end className='text-decoration-none' aria-current="page">
                                                        <i className="fs-6 fa-solid fa-bell"></i>
                                                        <span className="ms-1 d-sm-inline">Notifications</span>
                                                    </NavLink>
                                                </li>
                                            </ul>

                                            <div>
                                                <Link className="nav-link pb-4 text-decoration-none" onClick={logout_user}>
                                                    <i class="fs-6 uil uil-signout"></i>
                                                    <span className="ms-1 d-sm-inline">Sign Out</span>
                                                </Link>
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
                                                <Link>
                                                    <i
                                                        className="fs-3 fa-solid fa-bars text-primary"
                                                        id="menu-btn"
                                                        onClick={handleToggleSideMenu}
                                                    >
                                                    </i>
                                                </Link>
                                                <section>
                                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
                                                        <span className="me-3 position-relative" >
                                                            <i className="fs-5 fa-solid fa-bell text-primary">
                                                                <span className={isAnyNewNotification ? "position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1" : "position-absolute top-0 start-100 translate-middle"}>
                                                                    <span className="visually-hidden">
                                                                        unread messages
                                                                    </span>
                                                                </span>
                                                            </i>
                                                        </span>
                                                    </OverlayTrigger>

                                                    <div className="btn-group">
                                                        <section className="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" data-bs-auto-close="true">
                                                            <Link>
                                                                <img src={userInfo.get_photo_url} className="rounded-circle mx-auto" width="50" height="50" alt="..." />
                                                            </Link>
                                                        </section>

                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                                                            <li><Link to='/dashboard/edit-profile' className="dropdown-item">Edit Profile</Link></li>
                                                            <li><Link to='#' className="dropdown-item" onClick={logout_user}>Sign Out</Link></li>
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
                            </NotificationContext.Provider>
                        </UserAccountInfoContext.Provider>
                    </WithdrawalListContext.Provider>
                </ReferralListContext.Provider>
            </DownlineListContext.Provider>
        </UserInfoContext.Provider>

    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(DashboardSideBar);