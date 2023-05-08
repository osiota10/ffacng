import { useState, useContext } from "react";
import { DownlineListContext } from "./navBar";

const Levels = () => {
    const downlineList = useContext(DownlineListContext)
    const totalDownline = Object.keys(downlineList).length

    return (
        <>
            <div class="row row-cols-1 row-cols-lg-4 g-4 mt-3">
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Current Level</p>
                            <h5 class="card-title">1</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Referral Bonus</p>
                            <h5 class="card-title">0</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Matching Bonus</p>
                            <h5 class="card-title">0</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">My Downlines</p>
                            <h5 class="card-title">{totalDownline}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <h5 class="text-center mt-5">Level Information</h5>

            <section class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Levels</th>
                            <th scope="col">Downlines</th>
                            <th scope="col">Referral Bonus</th>
                            <th scope="col">Match Bonus</th>
                            <th scope="col">Upgrade Payment</th>
                            <th scope="col">Rewards</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>20</td>
                            <td>N20,000</td>
                            <td>N20,000</td>
                            <td>N20,000</td>
                            <td>N20,000</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default Levels;