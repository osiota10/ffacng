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

const myStyle = {
    backgroundImage: `url(${pic.url})`,
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    boxShadow: 'inset 0 0 0 100vh rgba(0, 0, 0, 0.6)',
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
            <section className="ratio ratio-21x9" style={myStyle}>

            </section>

            <div className="container position-absolute top-50 start-50 translate-middle py-5">
                <Slider {...settings}>
                    {hero.map(item =>
                        <section className="custom-slider">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-9 mx-auto">
                                    <h2 className="text-center mb-1 text-white">{item.title}</h2>
                                    <p className="text-white">{item.snippet}</p>

                                    <div className='d-flex justify-content-center'>
                                        <Link to="/contact" className='btn btn-primary mt-3'>Get in Touch</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </Slider>
            </div>

        </section>
    );
}

export default Hero;