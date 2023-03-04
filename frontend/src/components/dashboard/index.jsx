import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { UserInfoContext } from "./navBar";


function DashboardHome() {
    const userInfo = useContext(UserInfoContext)

    return (
        <section className="container">
            <div class="row row-cols-1 row-cols-lg-4 g-4 mt-4">
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center" >
                            <p class="card-text">Total Balance</p>
                            <h5 class="card-title">N18,000</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Total Downlines</p>
                            <h5 class="card-title">35</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Match Bonus</p>
                            <h5 class="card-title">N30,500</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Referral Bonus</p>
                            <h5 class="card-title">N50,000</h5>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row g-5 mt-4">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <section class="text-center">
                                <img src={userInfo.get_photo_url} class="rounded-circle mx-auto" width="150" height="150"
                                    alt="..." />
                            </section>

                            <header class="text-center mb-1">
                                <h4 class="card-title">Level 1</h4>
                                <span class="badge rounded-pill bg-primary">active</span>
                            </header>
                            <section class="table-responsive">
                                <table class="table ">
                                    <thead class="table-primary">
                                        <tr>
                                            <th scope="col" colspan="2" class="text-center">Bio-Data</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Sponsored ID:</td>
                                            <td>{userInfo.code}</td>
                                        </tr>
                                        <tr>
                                            <td>First Name:</td>
                                            <td>{userInfo.first_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Last Name:</td>
                                            <td>{userInfo.last_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{userInfo.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Date of Birth:</td>
                                            <td>{userInfo.date_of_birth}</td>
                                        </tr>
                                        <tr>
                                            <td>Gender:</td>
                                            <td>{userInfo.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone Number:</td>
                                            <td>{userInfo.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Introduced by:</td>
                                            <td>{userInfo.recommended_by}</td>
                                        </tr>
                                        <tr>
                                            <td>Date Joined:</td>
                                            <td>{userInfo.date_joined}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table ">
                                    <thead class="table-primary">
                                        <tr>
                                            <th scope="col" colspan="2" class="text-center">Bank Account Information</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Bank Name:</td>
                                            <td>{userInfo.bank_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Account Name:</td>
                                            <td>{userInfo.account_name}</td>
                                        </tr>

                                        <tr>
                                            <td>Account Number:</td>
                                            <td>{userInfo.account_number}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table ">
                                    <thead class="table-primary">
                                        <tr>
                                            <th scope="col" colspan="2" class="text-center">Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>State of Origin:</td>
                                            <td>{userInfo.state_of_origin}</td>
                                        </tr>
                                        <tr>
                                            <td>Local govt. of Origin:</td>
                                            <td>{userInfo.local_govt}</td>
                                        </tr>
                                        <tr>
                                            <td>Residential Address:</td>
                                            <td>{userInfo.home_address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="row">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-center">Latest Referrals</h5>
                                <section class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead class="table-primary">
                                            <tr>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>Samuel</td>
                                                <td>Samuel</td>
                                                <td>Samuel</td>
                                            </tr>
                                        </tbody>

                                        {/* <tbody>
                                            <tr>
                                                <td colspan="3" class="text-center">No Referrals yet</td>
                                            </tr>
                                        </tbody> */}
                                    </table>
                                    <Link to="/dashboard/referrals" className="d-grid btn btn-primary">See All</Link>
                                </section>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-center">Latest Downlines</h5>
                                <section class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead class="table-primary">
                                            <tr>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            <tr>
                                                <td>Samuel</td>
                                                <td>Samuel</td>
                                                <td>Samuel</td>
                                            </tr>

                                        </tbody>

                                        {/* <tbody>
                                            <tr>
                                                <td colspan="3" class="text-center">No Downline yet</td>
                                            </tr>

                                        </tbody> */}

                                    </table>
                                    <Link to="/dashboard/downlines" className="d-grid btn btn-primary">See All</Link>
                                </section>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-center">Withdrawal Requests</h5>
                                <section class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead class="table-primary">
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Current Amount</th>
                                            </tr>
                                        </thead>


                                        <tbody>

                                            <tr>
                                                <td>Test</td>
                                                <td>Test</td>
                                                <td>Test</td>
                                                <td>Test</td>
                                            </tr>

                                            {/* <tr>
                                                <td colspan="4" class="text-center">You are yet to make a Withdrawal Request</td>
                                            </tr> */}


                                        </tbody>
                                    </table>
                                    <Link to="/dashboard/withdrawals" className="d-grid btn btn-primary">See All</Link>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardHome;