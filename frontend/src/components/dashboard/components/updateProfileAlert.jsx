import { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../navBar";
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";



const UpdateProfileAlert = () => {
    const userInfo = useContext(UserInfoContext)
    const [emptyField, setEmptyField] = useState(true)

    const handleUserInfoCheck = () => {
        for (const [key, value] of Object.entries(userInfo)) {
            if (key !== 'recommended_by_email' && value === null) {
                setEmptyField(false)
            }
        }
    }

    useEffect(() => {
        handleUserInfoCheck()
    }, [userInfo])

    return (
        <>
            {
                emptyField
                    ?
                    null
                    :
                    <Alert variant="danger">
                        Welcome!
                        <Link
                            to="/dashboard/edit-profile"
                            className="mx-1 text-decoration-none fw-bold"
                        >
                            Click here
                        </Link>
                        to update your Profile
                    </Alert>
            }
        </>
    );
}

export default UpdateProfileAlert;