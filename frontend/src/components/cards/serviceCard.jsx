import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

const ServiceCard = ({ id, title, pic, description, slug }) => {
    return (
        <>
            <section className="col" key={id}>
                <section className="card mx-auto" style={{ maxWidth: '379px' }}>
                    <div class="ratio ratio-16x9">
                        <img src={pic} class="card-img-top" alt="..." />
                    </div>
                    <div class="card-body mt-1">
                        <h5 class="card-title text-center">{title}</h5>
                        <TextTruncate
                            line={6}
                            element="p"
                            truncateText="…"
                            text={description}
                            className='card-title mt-1'
                        />
                        <Link className='d-grid btn btn-primary fw-normal mt-2' to={'/services/' + slug}>Read More</Link>
                    </div>
                </section>
            </section>

        </>

    );
}

export default ServiceCard;