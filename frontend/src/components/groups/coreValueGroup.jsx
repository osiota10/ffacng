import { useState, useEffect } from "react";
import axios from "axios";
import CoreValueCard from "../cards/coreValueCard";


const CoreValueGroup = () => {
    const [coreValue, setCoreValue] = useState([]);

    useEffect(() => {
        // Core Values
        axios.get(`${process.env.REACT_APP_API_URL}/core-values`)
            .then(res => {
                setCoreValue(res.data)
            })
    }, []);

    return (
        <>
            {Object.keys(coreValue).length === 0
                ?
                null
                :
                <section class="container py-8 values">
                    <header class="text-center mb-4">
                        <h2 class="h2 text-center">Core Values</h2>
                        <h6 class="h6">Our Corporate Goals</h6>
                        <hr class="hr mx-auto mt-3" style={{ width: '10%', height: '10px' }} />
                    </header>
                    <div class="row row-cols-1 row-cols-lg-3 g-4 justify-content-center">
                        {coreValue.map(item =>
                            <CoreValueCard
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                pic={item.get_image_url}
                            />
                        )}
                    </div>
                </section>
            }
        </>

    );
}

export default CoreValueGroup;