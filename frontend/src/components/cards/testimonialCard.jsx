import parse from 'html-react-parser';


const TestimonialCard = ({ name, location, testimony, photo }) => {
    return (
        // <section class="col">
        <div class="card">
            <section className="d-flex justify-content-center align-items-center pt-3">
                <img src={photo} className="img-fluid rounded-circle" alt="..." style={{ width: '100px', height: '100px' }} />
            </section>

            <div class="card-body">
                <h4 class="h4 card-title text-center">{name}</h4>
                <h6 class="card-subtitle text-center mt-1">{location}</h6>
                <i class="fa-solid fa-quote-left text-primary"></i>
                <p class="card-text"><em>{parse(`${testimony}`)}</em></p>
                <i class="fa-solid fa-quote-right d-flex justify-content-end text-primary"></i>
            </div>
        </div>
        // </section>
    );
}

export default TestimonialCard;