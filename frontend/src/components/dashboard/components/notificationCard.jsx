import { useState, useContext } from "react";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { Link } from "react-router-dom";
import { NotificationContext } from "../navBar";


const NotificationCard = ({ popover }) => {

    const notification = useContext(NotificationContext)

    //New state for the context for modification
    const [newNotificationList, setNewNotificationList] = useState(notification)

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
                    const updatedNotifications = newNotificationList.map((item) => {
                        if (item.id === notificationId) {
                            return { ...item, is_read: true };
                        }
                        return item;
                    });
                    setNewNotificationList(updatedNotifications);

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
                <>
                    {Object.keys(newNotificationList).length === 0
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
                            {newNotificationList.map((item =>
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
            </ListGroup>

        </>
    );
}

export default NotificationCard;