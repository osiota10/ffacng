import CountUp from 'react-countup';

const Stat = ({ id, figure, title, pic }) => {
    return (
        <section class="col" key={id}>
            <div class="card mx-auto " style={{ maxWidth: '379px' }}>
                <div class="card-body">
                    <section className="d-flex justify-content-center align-items-center">
                        <img src={pic} className="img-fluid rounded-circle" alt="..." style={{ width: '70px', height: '70px' }} />
                    </section>
                    <h2 class="card-title text-center"><CountUp end={figure} duration={10} suffix="+" /></h2>
                    <h6 class="card-text text-center">{title}</h6>
                </div>
            </div>
        </section>
    );
}

export default Stat;