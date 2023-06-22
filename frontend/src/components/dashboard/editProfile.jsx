import { useContext, useState } from "react";
import { UserInfoContext } from "./navBar";
import axios from "axios";
import LoaderIcon from "../cards/utilities/spinner";
import SuccessModal from "./components/successModalMsg";

function EditProfile() {
    const CurrentUserInfo = useContext(UserInfoContext)
    const [loading, setLoading] = useState(false);

    // Update Profile Pic
    const [profilePicFile, setProfilePicFile] = useState([]);

    // Update Profile Pic input
    const onProfilePicChange = e => setProfilePicFile(e.target.files[0]);
    console.log(profilePicFile)

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        first_name: CurrentUserInfo.first_name,
        last_name: CurrentUserInfo.last_name,
        email: CurrentUserInfo.email,
        phone_number: CurrentUserInfo.phone_number,
        date_of_birth: CurrentUserInfo.date_of_birth,
        gender: CurrentUserInfo.gender,
        home_address: CurrentUserInfo.home_address,
        local_govt: CurrentUserInfo.local_govt,
        state_of_origin: CurrentUserInfo.state_of_origin,
        nationality: CurrentUserInfo.nationality,
        image: CurrentUserInfo.image,
        get_photo_url: CurrentUserInfo.get_photo_url,
        bank_name: CurrentUserInfo.bank_name,
        account_name: CurrentUserInfo.account_name,
        account_number: CurrentUserInfo.account_number,

    });

    const { first_name, last_name, phone_number, date_of_birth, gender, home_address, local_govt, state_of_origin, nationality, get_photo_url, bank_name, account_name, account_number } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = e => {
        e.preventDefault();

        // declare the data fetching function
        const fetchData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                // const body = JSON.stringify({  , , , , get_photo_url, , ,  });

                const formData = new FormData();
                formData.append('first_name', first_name);
                formData.append('last_name', last_name);
                formData.append('phone_number', phone_number);
                formData.append('date_of_birth', date_of_birth);
                formData.append('home_address', home_address);
                formData.append('local_govt', local_govt);
                formData.append('state_of_origin', state_of_origin);
                formData.append('nationality', nationality);
                formData.append('bank_name', bank_name);
                formData.append('account_name', account_name);
                formData.append('account_number', account_number);
                formData.append('image', profilePicFile);

                try {
                    setLoading(true)
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/auth/users/me/`, formData, config);
                    if (res.status === 200) {
                        setLoading(false)
                        handleShow()
                    }
                } catch (err) {
                    setLoading(false)
                    console.error("User not authenticated");
                }
            } else {
                console.error("User not authenticated");
            }
        }

        fetchData()
    };

    return (
        <div class="container mt-3 pb-5">
            <h2 class="text-center">Edit Profile</h2>
            <div>
                <form class="row" onSubmit={e => onSubmit(e)}>
                    <div class="col-lg-9 mx-auto">
                        <section className="row g-3">
                            <section className="col-12 mt-5">
                                <h5 className="text-center">Profile Picture</h5>
                            </section>
                            <section>
                                <img src={get_photo_url} class="d-flex justify-content-center align-items-center rounded-circle mx-auto" width="200" height="200" alt="..." />

                            </section>
                            <div class="col-12 input-group mb-3">
                                <input
                                    type="file"
                                    class="form-control"
                                    id="image"
                                    name="image"
                                    // value={formData.image}
                                    onChange={e => onProfilePicChange(e)}
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
                                    value={formData.email}
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
                                    // pattern="\d{4}-\d{2}-\d{2}"
                                    class="form-control inputfield"
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    value={date_of_birth}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>

                            <section className="col-12 mt-5">
                                <h5 className="text-center">Bank Information</h5>
                            </section>

                            <div class="col-md-6">
                                <label for="bank_name" class="form-label">Bank Name</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="bank_name"
                                    name="bank_name"
                                    value={bank_name}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="account_name" class="form-label">Account Name</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="account_name"
                                    name="account_name"
                                    value={account_name}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>
                            <div class="col-md-6">
                                <label for="account_number" class="form-label">Account Number</label>
                                <input
                                    type="text"
                                    class="form-control inputfield"
                                    id="account_number"
                                    name="account_number"
                                    value={account_number}
                                    onChange={e => onChange(e)}
                                    required />
                            </div>

                            <section className="col-12 mt-5">
                                <h5 className="text-center">Contact Address</h5>
                            </section>
                            <div class="col-12">
                                <label for="home_address" class="form-label">Residential Address</label>
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

                        <section className="d-grid mt-4">
                            <button
                                type="submit"
                                className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}
                            >
                                {loading
                                    ?
                                    <LoaderIcon />
                                    :
                                    null
                                }
                                Update Profile
                            </button>
                        </section>
                    </div>
                </form>
            </div>

            {
                show
                    ?
                    <SuccessModal
                        title='Profile Updated'
                        message='You have successfully updated your Profile'
                        show={show}
                        onClose={handleClose}
                    />
                    :
                    null
            }
        </div>
    );
}

export default EditProfile;