import { useState, useEffect } from "react";
import axios from "axios";
import Stat from "../cards/stat";

const StatGroup = () => {
    const [stat, setStat] = useState([]);

    useEffect(() => {
        // Stat
        axios.get(`${process.env.REACT_APP_API_URL}/stat`)
            .then(res => {
                setStat(res.data)
            })
    }, []);

    return (
        <>
            {Object.keys(stat).length === 0
                ?
                null
                :
                <section className="bg-light py-8">
                    <section className="container">
                        <section class="row row-cols-1 row-cols-lg-3 g-4 justify-content-center align-items-center">
                            {stat.map(item =>
                                <Stat
                                    id={item.id}
                                    figure={item.stat_figure}
                                    title={item.stat_title}
                                    pic={item.get_image_url}
                                />
                            )}

                        </section>
                    </section>
                </section>
            }
        </>

    );
}

export default StatGroup;