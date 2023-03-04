

const Referrals = () => {
    return (
        <>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-3">
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Referral ID</p>
                            <h5 class="card-title">123456</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Total Referrals</p>
                            <h5 class="card-title">21</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Referrals Earnings</p>
                            <h5 class="card-title">N30,500</h5>
                        </div>
                    </div>
                </div>
            </div>

            <h5 class="text-center mt-5">Your Referrals</h5>

            <section class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Date Joined</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>23/08/2023</td>
                            <td>Osiota Sam</td>
                            <td>osiota@gmail.com</td>
                            <td>12345678</td>
                        </tr>

                    </tbody>

                    {/* <tbody>
                        <td colspan="4" class="text-center">No Referrals yet</td>
                    </tbody> */}

                </table>
            </section>
        </>
    );
}

export default Referrals;