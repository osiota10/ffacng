

const Downlines = () => {
    return (
        <>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-3">
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Current Downlines</p>
                            <h5 class="card-title">20</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-center">
                        <div class="card-body">
                            <p class="card-text">Expected Downlines</p>
                            <h5 class="card-title">300</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body text-center">
                            <p class="card-text">Remaining Downlines</p>
                            <h5 class="card-title">32</h5>
                        </div>
                    </div>
                </div>
            </div>

            <h5 class="text-center mt-5">Your Downlines</h5>

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
                            <td>12/01/2022</td>
                            <td>Osiota Sam</td>
                            <td>osiota@gmail.com</td>
                            <td>123456789</td>
                        </tr>
                    </tbody>

                    {/* <tbody>
                        <td colspan="4" class="text-center">No Downline yet</td>
                    </tbody> */}

                </table>
            </section>
        </>
    );
}

export default Downlines;