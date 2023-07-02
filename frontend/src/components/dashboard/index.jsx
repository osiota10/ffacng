import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserInfoContext } from "./navBar";
import { DownlineListContext, ReferralListContext, WithdrawalListContext, UserAccountInfoContext } from "./navBar";
import CopyToClipboardButton from "./components/clipCopy";
import UpdateProfileAlert from "./components/updateProfileAlert";


function DashboardHome() {
    const downlineList = useContext(DownlineListContext)
    const referralList = useContext(ReferralListContext)
    const withdrawalList = useContext(WithdrawalListContext)
    const userAccountInfo = useContext(UserAccountInfoContext)


    // Downline List
    const reversedList = downlineList.reverse();
    const lastFourDownlines = reversedList.slice(0, 4);
    const totalDownline = Object.keys(downlineList).length

    //Referral List
    const reversedReferralList = referralList.reverse();
    const lastFourReferrals = reversedReferralList.slice(0, 4);

    //Withdrawal List
    const reversedWithdrawalList = withdrawalList.reverse();
    const lastFourWithdrawals = reversedWithdrawalList.slice(0, 4)

    //User Info
    const userInfo = useContext(UserInfoContext)

    return (
        <section className="container mt-4">
            <UpdateProfileAlert />
            <div class="row row-cols-1 row-cols-lg-4 g-4">
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center" >
                            <p class="card-text">Total Balance</p>
                            <h5 class="card-title">{`N${userAccountInfo.total_balance}`}</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Total Downlines</p>
                            <h5 class="card-title">{totalDownline}</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Match Bonus</p>
                            <h5 class="card-title">{`N${userAccountInfo.match_bonus_earned}`}</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Referral Bonus</p>
                            <h5 class="card-title">{`N${userAccountInfo.referral_bonus_earned}`}</h5>
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

                            <header className="text-center mb-1">
                                <h4 className="card-title">Level {userAccountInfo.depth}</h4>
                                <span className={userInfo.status === 'Active' ? 'badge rounded-pill bg-primary me-1' : 'badge rounded-pill bg-danger me-1'}>
                                    {userInfo.status}
                                </span>

                                <span className={userInfo.plan === 'Premium' ? 'badge rounded-pill bg-secondary' : 'badge rounded-pill bg-info'}>
                                    {userInfo.plan} Plan
                                </span>
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
                                            <td>
                                                {userInfo.code}
                                                <span className="ms-3">
                                                    <CopyToClipboardButton text={userInfo.code} />
                                                </span>
                                            </td>
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
                                            <td>{userInfo.recommended_by_email}</td>
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
                                <h5 class="card-title text-center mb-2">Latest Referrals</h5>
                                <section class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead class="table-primary">
                                            <tr>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                        </thead>

                                        {Object.keys(referralList).length === 0
                                            ?
                                            <tbody>
                                                <tr>
                                                    <td colspan="3" class="text-center">No Referrals yet</td>
                                                </tr>
                                            </tbody>
                                            :
                                            <tbody>
                                                {lastFourReferrals.map((item) =>
                                                    <tr>
                                                        <td>{item.first_name}</td>
                                                        <td>{item.last_name}</td>
                                                        <td>{item.email}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        }
                                    </table>
                                    <Link to="/dashboard/referrals" className="d-grid btn btn-primary">See All</Link>
                                </section>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-center mb-2">Latest Downlines</h5>
                                <section class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead class="table-primary">
                                            <tr>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                            </tr>
                                        </thead>
                                        {Object.keys(downlineList).length === 0
                                            ?
                                            <tbody>
                                                <tr>
                                                    <td colspan="3" class="text-center">No Downline yet</td>
                                                </tr>

                                            </tbody>
                                            :
                                            <tbody>
                                                {lastFourDownlines.map((item) => (
                                                    <tr>
                                                        <td>{item.first_name}</td>
                                                        <td>{item.last_name}</td>
                                                        <td>{item.email}</td>
                                                    </tr>

                                                ))}
                                            </tbody>
                                        }
                                    </table>
                                    <Link to="/dashboard/downlines" className="d-grid btn btn-primary">See All</Link>
                                </section>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-center mb-2">Withdrawal Requests</h5>
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

                                        {Object.keys(withdrawalList).length === 0
                                            ?
                                            <tbody>
                                                <tr>
                                                    <td colspan="4" class="text-center">You are yet to make a Withdrawal Request</td>
                                                </tr>
                                            </tbody>
                                            :
                                            <tbody>
                                                {lastFourWithdrawals.map((item) =>
                                                    <tr>
                                                        <td>{item.created_at}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.balance_before}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        }

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