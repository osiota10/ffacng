import { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

const pic = {
    url: 'https://picsum.photos/300/200'
}

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


const getStyle = (imgUrl) => {
    return {
        backgroundImage: `linear-gradient(to right, rgb(3, 98, 63), rgba(3, 98, 63, 0.3)), url(${imgUrl})`,
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // boxShadow: 'inset 0 0 0 100vh rgba(235, 237, 240, 0.93)',
    };
};


const Hero = () => {
    const [hero, setHero] = useState([]);

    useEffect(() => {
        // Hero
        axios.get(`${process.env.REACT_APP_API_URL}/hero`)
            .then(res => {
                setHero(res.data)
            })
    }, []);

    return (
        <section className="card hero">
            <Slider {...settings}>
                {hero.map(item =>
                    <section>
                        <section className="ratio ratio-21x9" style={getStyle(item.get_image_url)}>

                        </section>

                        <div className="container position-absolute top-50 start-50 translate-middle py-5">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-1 text-white">{item.title}</h2>
                                    <p className="text-white">{item.snippet}</p>

                                    <div>
                                        <Link to="/contact" className='btn btn-light mt-3'>Contact Us</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </Slider>
        </section>
    );
}

export default Hero;