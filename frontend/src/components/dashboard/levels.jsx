import { useState, useContext, useEffect } from "react";
import { DownlineListContext, UserAccountInfoContext, UserInfoContext } from "./navBar";
import axios from "axios";

const Levels = () => {
    const downlineList = useContext(DownlineListContext)
    const totalDownline = Object.keys(downlineList).length
    const userInfoBalance = useContext(UserAccountInfoContext)
    const userInfo = useContext(UserInfoContext)

    const [levelInformation, setLevelInformation] = useState([])

    useEffect(() => {
        fetchLevelData()
    }, []);

    //List Level Information
    const fetchLevelData = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                axios.get(`${process.env.REACT_APP_API_URL}/dashboard/level-information`, config)
                    .then(res => {
                        setLevelInformation(res.data)
                    })
            } catch (err) {
                console.error("User not authenticated");
            }
        } else {
            console.error("User not authenticated");
        }
    }

    return (
        <section className="container">
            <div className="row row-cols-1 row-cols-lg-3 g-4 mt-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body text-center">
                            <p className="card-text">Current Level</p>
                            <h5 className="card-title">{userInfoBalance.depth}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <p className="card-text">Current Plan</p>
                            <h5 className="card-title">{userInfo.plan}</h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body text-center">
                            <p className="card-text">My Downlines</p>
                            <h5 className="card-title">{totalDownline}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="text-center mt-5 mb-2">Level Information</h4>

            <section className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">Levels</th>
                            <th scope="col">Expected Downlines</th>
                            <th scope="col">Match Bonus</th>
                            <th scope="col">Rewards</th>
                        </tr>
                    </thead>

                    <tbody>
                        {levelInformation.map((item) =>
                            <tr key={item.id}>
                                <td>Level {item.level}</td>
                                <td>{item.expected_downlines} Downlines</td>
                                <td>N{item.expected_match_bonus}</td>
                                <td>{item.additional_reward}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </section>
    );
}

export default Levels;