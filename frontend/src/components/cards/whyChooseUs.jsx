import TextListTemplate from "./textTemplate";
import { useState, useEffect } from "react";
import axios from "axios";


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
                    <TextListTemplate
                        title={whyChooseUs.title}
                        sub_title={whyChooseUs.sub_title}
                        description={whyChooseUs.description}
                        pic={whyChooseUs.get_image_url}
                    />
                </section>
            }
        </>
    );
}

export default WhyChooseUs;