import { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../cards/pageTitle";


const Contact = () => {
    const [branchAddress, setBranchAddress] = useState([]);

    useEffect(() => {
        // Branch Address
        axios.get(`${process.env.REACT_APP_API_URL}/branch-address`)
            .then(res => {
                setBranchAddress(res.data)
            })
    }, []);
    return (
        <div className="">
            <PageTitle title="Contact Us" />

            {Object.keys(branchAddress).length === 0
                ?
                null
                :
                <section className="container py-8 values">
                    <header className="text-center ">
                        <h2 className="h2 text-center">Our Branch Offices</h2>
                        <h6 className="h6">Locate any of our nearest Office to you</h6>
                        <hr className="hr mx-auto" style={{ width: '10%' }} />
                    </header>
                    <div className="row row-cols-1 row-cols-lg-3 g-4 justify-content-center">
                        {branchAddress.map(item =>
                            <div className="col-lg">
                                <div className="card mx-auto" style={{ maxWidth: '379px' }}>
                                    <div className="card-body text-center">
                                        <section className="d-flex justify-content-center align-items-center mb-1">
                                            <i className="fa-solid fa-magnifying-glass-location  me-2 fs-4 text-primary bg-light p-3 rounded-circle"></i>
                                        </section>

                                        <h5 className="card-title">{item.branch_name} Branch</h5>
                                        <p>{item.phone_number}</p>
                                        <p>{item.branch_address}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            }
        </div>
    );
}

export default Contact;