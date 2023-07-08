import PageTitle from "../cards/pageTitle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';

const ServiceDetail = () => {
    const { slug } = useParams();
    const [detail, setDetails] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/services/` + slug)
            .then(res => {
                setDetails(res.data)
            })
    }, [slug]);

    return (
        <section>
            <PageTitle title={detail.title} />

            <section className="container py-8">
                <section className="row">
                    <section className="col-lg-8 mx-auto">
                        <div className='ratio ratio-16x9 mb-2'>
                            <img src={detail.get_image_url} className="card-img-top mb-4" alt="..." />
                        </div>
                        {parse(`${detail.description}`)}
                    </section>
                </section>
            </section>
        </section>
    );
}

export default ServiceDetail;