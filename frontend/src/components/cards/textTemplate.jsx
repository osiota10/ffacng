import parse from 'html-react-parser';

function TextListTemplate({ title, sub_title, description, pic }) {

    return (
        <section className="service-template" >
            <section className="row g-0 justify-content-center">
                <section className="col-lg-4 align-self-center">
                    <section className="ratio ratio-1x1">
                        <img src={pic} className="img-fluid" alt="..." style={{ zIndex: '1027', borderRadius: '2rem' }} />
                    </section>
                </section>
                <section className="col-lg-7 ms-lg-n6 align-self-center">
                    <section className="card" style={{ zIndex: '1028' }}>
                        <section className="card-body">
                            <h2>{title}</h2>
                            {sub_title
                                ?
                                <h6>{sub_title}</h6>
                                :
                                null
                            }

                            {parse(`${description}`)}
                        </section>
                    </section>
                </section>

            </section>

        </section>
    );
}

export default TextListTemplate;