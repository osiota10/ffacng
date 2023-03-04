

const Withdrawals = () => {
    return (
        <>
            <div class="row row-cols-1 row-cols-lg-4 g-4 mt-3">
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Total Withdrawal Request</p>
                            <h5 class="card-title">8</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Total Referrals</p>
                            <h5 class="card-title">8</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Approved Withdrawals</p>
                            <h5 class="card-title">9</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Available Withdrawal</p>
                            <h5 class="card-title">N30,500</h5>
                        </div>
                    </div>
                </div>
            </div>

            <section class="row mt-3">
                <div class="col-lg-7 mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="text-center">Withdrawal Request</h5>
                            <p class="text-center">Enter Amount and wait for Approval</p>
                            <form>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">Amount</label>
                                    <input type="number" name="amount" class="form-control inputfield" id="formGroupExampleInput2"
                                        placeholder="Enter Amount to Withdraw..." />
                                </div>
                                <button type="submit" class="btn btn-primary form-control">Submit Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section class="row">
                <h5 class="text-center mt-5">Your Withdrawal History</h5>
                <section class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Date Requested</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                                <th scope="col">Current Balance</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>23/08/2022</td>
                                <td>N20,000</td>
                                <td>Pending</td>
                                <td>N90,000</td>
                            </tr>
                        </tbody>

                        {/* <tbody>
                            <td colspan="4" class="text-center">You are yet to make a Withdrawal Request</td>
                        </tbody> */}

                    </table>
                </section>

            </section>
        </>
    );
}

export default Withdrawals;