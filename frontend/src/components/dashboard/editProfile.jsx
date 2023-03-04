import { useContext, useState } from "react";
// import { UserInfoContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function EditProfile() {
    // const CurrentUserInfo = useContext(UserInfoContext)

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        // first_name: CurrentUserInfo.first_name,
        // last_name: CurrentUserInfo.last_name,
        // email: CurrentUserInfo.email,
        // phone_number: CurrentUserInfo.phone_number,
        // date_of_birth: CurrentUserInfo.date_of_birth,
        // height: CurrentUserInfo.height,
        // weight: CurrentUserInfo.weight,
        // gender: CurrentUserInfo.gender,
        // sport: CurrentUserInfo.sport,
        // home_address: CurrentUserInfo.home_address,
        // local_govt: CurrentUserInfo.local_govt,
        // state_of_origin: CurrentUserInfo.state_of_origin,
        // nationality: CurrentUserInfo.nationality,
        // image: CurrentUserInfo.image,
        // get_photo_url: CurrentUserInfo.get_photo_url
    });

    const { first_name, last_name, email, phone_number, date_of_birth, height, weight, gender, sport, home_address, local_govt, state_of_origin, nationality, image, get_photo_url } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();

        // declare the data fetching function
        const fetchData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                const body = JSON.stringify({ first_name, last_name, email, phone_number });

                try {
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config);
                    if (res.status === 200) {
                        handleShow()
                    }
                } catch (err) {
                    console.error("User not authenticated");
                }
            } else {
                console.error("User not authenticated");
            }
        }

        fetchData()

        // setTimeout(() => {
        //     navigate('/dashboard')
        // }, 2000)
    };
    console.log(image)
    return (
        <div class="container mt-3 pb-5">
            {/* <h2 class="text-center">Edit my Profile</h2> */}
            <div>
                <form class="row" onSubmit={e => onSubmit(e)}>
                    <div class="col-lg-9 mx-auto">
                        <section className="row g-3">
                            <section className="col-12 mt-5">
                                <h5 className="text-center">Profile Picture</h5>
                            </section>
                            <section>
                                <img src='' class="d-flex justify-content-center align-items-center rounded-circle mx-auto" width="200" height="200" alt="..." />

                            </section>
                            <div class="col-12 input-group mb-3">
                                <input
                                    type="file"
                                    class="form-control"
                                    id="inputGroupFile02"
                                    name="image"
                                    value={image}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <label class="input-group-text" for="inputGroupFile02">Upload</label>
                            </div>
                            <section className="col-12 mt-5">
                                <h5 className="text-center">Personal Information</h5>
                            </section>
                            <div class="col-md-6">
                                <label for="first_name" class="form-label">First Name</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="first_name"
                                    name="first_name"
                                    value={first_name}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
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
                            </div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control inputfield"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={email}
                                    disabled
                                    required
                                />
                            </div>
                            <div class="col-md-6">
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
                            </div>
                            <div class="col-md-6">
                                <label for="gender" class="form-label">Gender</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="date_of_birth" class="form-label">Date of Birth</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    value={date_of_birth}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="sport" class="form-label">Sport</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="sport"
                                    name="sport"
                                    value={sport}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="height" class="form-label">Height(m)</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="height"
                                    name="height"
                                    value={height}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="weight" class="form-label">Weight(kg)</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="weight"
                                    name="weight"
                                    value={weight}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <section className="col-12 mt-5">
                                <h5 className="text-center">Contact Address</h5>
                            </section>
                            <div class="col-12">
                                <label for="home_address" class="form-label">Home Address</label>
                                <textarea
                                    class="form-control"
                                    id="home_address"
                                    rows="4"
                                    onChange={e => onChange(e)}
                                    name="home_address"
                                    value={home_address}
                                    required
                                ></textarea>
                            </div>
                            <div class="col-md-6">
                                <label for="local_govt" class="form-label">Local Government</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="local_govt"
                                    name="local_govt"
                                    value={local_govt}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="state_of_origin" class="form-label">State of Origin</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="state_of_origin"
                                    name="state_of_origin"
                                    value={state_of_origin}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="nationality" class="form-label">Nationality</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="nationality"
                                    name="nationality"
                                    value={nationality}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                        </section>

                        <div class="col-12 mt-5">
                            <button type="submit" class="btn btn-primary form-control">Update Profile</button>
                        </div>
                    </div>
                </form>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully updated your Profile
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-outline-primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Link className="btn btn-primary" to="/dashboard">Dashboard</Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProfile;