import { useState, useEffect, useContext } from "react";
import { CompanyInformationContext } from "../../App";
import axios from "axios";
import ServicesGroup from "../groups/serviceGroup";
import EmailSub from "../cards/emailSub";
import TestimonialGroup from "../groups/testimonialGroup";
import CoreValueGroup from "../groups/coreValueGroup";
import StatGroup from "../groups/statGroup";
import Mlm from "../cards/mlm";
import Slider from "react-slick";
import TextTruncate from 'react-text-truncate';
import Hero from "../cards/hero";
import { Link } from "react-router-dom";

const settings = {
    dots: true,
    arrows: false,
    className: "center",
    infinite: true,
    centerPadding: "160px",
    slidesToShow: 1,
    swipeToSlide: true,
    afterChange: function (index) {
        console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
    },
};

const Home = () => {
    const [photoGallery, setPhotoGallery] = useState([]);

    const companyInfo = useContext(CompanyInformationContext)

    useEffect(() => {
        // Photo Gallery
        axios.get(`${process.env.REACT_APP_API_URL}/photo-gallery`)
            .then(res => {
                setPhotoGallery(res.data)
            })
    }, []);

    return (
        <>
            <Hero />

            {companyInfo.about_company
                ?
                <section className="container py-8">
                    <section className="row">
                        <section className="col-lg-8 mx-auto">
                            <h2 className="text-center">About Us</h2>
                            <TextTruncate
                                line={7}
                                element="p"
                                truncateText="…"
                                text={companyInfo.safe_about_body_html}
                            />
                            <div className='d-flex justify-content-center'>
                                <Link to="/about" className='btn btn-primary mt-3'>Read More</Link>
                            </div>
                        </section>
                    </section>
                </section>
                :
                null
            }

            <StatGroup />
            <CoreValueGroup />
            <ServicesGroup />
            <Mlm />
            <TestimonialGroup />

            {Object.keys(photoGallery).length === 0
                ?
                null
                :
                <section class="py-8 testimonials">
                    <section class="container">
                        <header class="text-center mb-3">
                            <h2 class="h2">Photo Gallery</h2>
                            <h6 class="h6">Photo Speaks</h6>
                            <hr class="hr mx-auto" style={{ width: '10%' }} />
                        </header>
                        <div class="row row-cols-1 row-cols-lg-1 g-4 justify-content-center">
                            <Slider {...settings}>
                                {photoGallery.map(item =>
                                    <section className="col mx-auto">
                                        <img src={item.get_image_url} className="img-fluid mx-auto" alt={item.title} />
                                    </section>
                                )}
                            </Slider>
                        </div>
                    </section>
                </section>
            }

            <EmailSub />
        </>
    );
}

export default Home;