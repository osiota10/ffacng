import { useState, useEffect } from "react";
import axios from "axios";
import parse from 'html-react-parser';


const WhyChooseUs = () => {
    const [whyChooseUs, setWhyChooseUs] = useState([]);

    useEffect(() => {
        // Why Choose Us
        axios.get(`${process.env.REACT_APP_API_URL}/why-choose-us/1`)
            .then(res => {
                setWhyChooseUs(res.data)
            })
    }, []);

    return (
        <>
            {Object.keys(whyChooseUs).length === 0
                ?
                null
                :
                <section class="container py-8 why-choose-use reveal">

                    <section className="row g-5 mt-6">
                        <section className="col-lg-6">
                            <img src={whyChooseUs.get_image_url} className="img-fluid" alt="..." />
                        </section>

                        <section className="col-lg-6">
                            <h2>{whyChooseUs.title}</h2>
                            {whyChooseUs.sub_title
                                ?
                                <h6>{whyChooseUs.sub_title}</h6>
                                :
                                null
                            }
                            <p>{parse(`${whyChooseUs.description}`)}</p>

                        </section>
                    </section>
                </section>
            }
        </>
    );
}

export default WhyChooseUs;