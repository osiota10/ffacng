import { Link } from "react-router-dom";
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";


function PageTitle({ title }) {
    const companyInfo = useContext(CompanyInformationContext)

    const myStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(0, 61, 43, 0.5), rgba(0, 61, 43, 0.5)), url(${companyInfo.get_page_header_image})`,
        height: '394px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };


    return (
        <>
            <section style={myStyle} >
                <h1 className='container text-white text-center'>{title}</h1>
            </section>

            <div className='py-3 bg-light'>
                <nav aria-label="breadcrumb" className='container'>
                    <ol class="breadcrumb ">
                        <li className="breadcrumb-item">
                            <Link to="/" className='nav-link text-decoration-none text-primary fw-bold' aria-current="page">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>
            </div>
        </>
    );
}

// Specifies the default values for props:
PageTitle.defaultProps = {
    title: 'Page Title'
};

export default PageTitle;