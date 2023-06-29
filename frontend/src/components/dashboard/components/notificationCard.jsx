import { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import LoaderIcon from "../../cards/utilities/spinner";
import { Link } from "react-router-dom";


const NotificationCard = ({ popover, onNewNotification }) => {
    const [notification, setNotification] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const isAnyNewNotification = notification.some((item) => !item.is_read);
    onNewNotification = isAnyNewNotification

    // Fetch messages from API endpoint
    useEffect(() => {
        fetchNotifications();
    }, []);


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
                setIsLoading(true);
                axios.get(`${process.env.REACT_APP_API_URL}/dashboard/user-notifications`, config)
                    .then(res => {
                        setNotification(res.data)
                        setIsLoading(false);
                    })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
    }

    const markAsRead = (notificationId) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({ notificationId });

            try {
                const res = axios.post(`${process.env.REACT_APP_API_URL}/dashboard/user-notifications`, body, config);
                res.then(() => {

                    // Update the notifications list after marking as read
                    const updatedNotifications = notification.map((item) => {
                        if (item.id === notificationId) {
                            return { ...item, is_read: true };
                        }
                        return item;
                    });
                    setNotification(updatedNotifications);

                })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
    };

    return (
        <>
            <ListGroup as="ol">
                {isLoading
                    ?
                    <>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start border-bottom"
                            action
                        >
                            <div className="ms-2 me-auto">
                                User Notifications
                            </div>

                            <Link className="ms-2 me-auto fw-bolder text-decoration-none">
                                See All
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start border-bottom"
                            action
                        >
                            <div className="ms-2 me-auto fw-bold">
                                <LoaderIcon />
                            </div>
                        </ListGroup.Item>
                    </>

                    :
                    <>
                        {Object.keys(notification).length === 0
                            ?
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start border-bottom"
                                action
                            >
                                <div className="ms-2 me-auto fw-bold">
                                    No Notifications
                                </div>
                            </ListGroup.Item>
                            :
                            <>
                                {notification.map((item =>
                                    <ListGroup.Item
                                        as="li"
                                        className={item.is_read === false ? "d-flex justify-content-between align-items-start border-bottom" : "d-flex justify-content-between align-items-start border-bottom bg-light"}
                                        action
                                        onClick={item.is_read === true
                                            ?
                                            null
                                            :
                                            () => {
                                                markAsRead(item.id)
                                            }
                                        }
                                        key={item.id}
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.subject}</div>
                                            {item.message}
                                        </div>
                                        <Badge bg={item.is_read === false ? "danger" : "primary"} pill>
                                            {item.is_read === false ? "Unread" : "Read"}
                                        </Badge>
                                    </ListGroup.Item>
                                ))}
                            </>
                        }

                        {popover
                            ?
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start border-bottom"
                                action
                            >
                                <Link className="ms-2 me-auto fw-bolder text-decoration-none">
                                    See All Notifications
                                </Link>
                            </ListGroup.Item>
                            :
                            null
                        }
                    </>
                }
            </ListGroup>

        </>
    );
}

export default NotificationCard;