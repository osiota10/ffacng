import parse from 'html-react-parser';


const CoreValueCard = ({ key, title, description, pic }) => {
    return (
        <div class="col-lg-4" key={key}>
            <div class="card mx-auto" style={{ maxWidth: '379px' }}>
                <div class="card-body">
                    <section className="d-flex justify-content-center align-items-center mb-1">
                        <img src={pic} className="img-fluid rounded-circle" alt="..." style={{ width: '133px', height: '133px' }} />
                    </section>

                    <h5 class="card-title text-center">{title}</h5>
                    {parse(`${description}`)}
                </div>
            </div>
        </div>
    );
}

export default CoreValueCard;