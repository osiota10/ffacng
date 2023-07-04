import { useState, useEffect } from "react";
import axios from "axios";
import TestimonialCard from "../cards/testimonialCard";
import Slider from "react-slick";

export const settings = {
    dots: true,
    arrows: true,
    className: "center",
    infinite: false,
    centerPadding: "160px",
    slidesToShow: 3,
    swipeToSlide: true,
    // afterChange: function (index) {
    //     console.log(
    //         `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //     );
    // },
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }
        },
    ]
};

const TestimonialGroup = () => {
    const [testimonial, setTestimonial] = useState([]);

    useEffect(() => {
        // Testimonials
        axios.get(`${process.env.REACT_APP_API_URL}/testimonials`)
            .then(res => {
                setTestimonial(res.data)
            })
    }, []);

    return (
        <>
            {Object.keys(testimonial).length === 0
                ?
                null
                :
                <section class="py-8 testimonials bg-light">
                    <section class="container">
                        <header class="text-center mb-3">
                            <h2 class="h2">Testimonials</h2>
                            <h6 class="h6">What people say about Us</h6>
                            <hr class="hr mx-auto" style={{ width: '10%' }} />
                        </header>
                        <Slider {...settings}>
                            {testimonial.slice(0, 9).map(item =>
                                <TestimonialCard
                                    name={item.name}
                                    location={item.location}
                                    testimony={item.testimony}
                                    photo={item.get_photo_url}
                                />
                            )}
                        </Slider>
                    </section>
                </section>
            }
        </>
    );
}

export default TestimonialGroup;