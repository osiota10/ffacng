import { Link } from "react-router-dom";
import { useContext } from "react";
import { ServiceContext } from "../../App";
import { CompanyInformationContext } from "../../App";
import TextTruncate from 'react-text-truncate';


const Footer = () => {
    const ServiceList = useContext(ServiceContext)
    const companyInfo = useContext(CompanyInformationContext)
    const year = new Date()

    return (
        <div className="bg-primary text-white pb-2">
            <div className="container">
                <div className="row gy-3">

                    {companyInfo.about_company
                        ?
                        <div className="col-lg">
                            <h4 className="h4 text-white">About</h4>
                            <TextTruncate
                                line={6}
                                element="p"
                                truncateText="…"
                                text={companyInfo.safe_about_body_html}
                            />
                        </div>
                        :
                        null
                    }


                    {Object.keys(ServiceList).length === 0
                        ?
                        null
                        :
                        <div className="col-lg">
                            <h4 className="h4 text-white">Services</h4>
                            <ul className="list-group list-group-flush">
                                {ServiceList.map(item =>
                                    <li key={item.id}><Link to='#' class="list-group-item bg-primary text-white"><i
                                        className="fa-solid fa-angles-right me-1"></i>{item.title}</Link></li>
                                )}

                            </ul>
                        </div>
                    }


                    <div className="col-lg">
                        <h4 className="h4 text-white">Quick Links</h4>
                        <ul className="list-group list-group-flush">
                            <li><Link to='/terms-and-conditions' className="list-group-item bg-primary text-white"><i
                                className="fa-solid fa-angles-right me-1"></i>Terms & Conditions</Link></li>
                            <li><Link to='/privacy-policy' className="list-group-item bg-primary text-white"><i
                                class="fa-solid fa-angles-right me-1"></i>Privacy Policy</Link></li>
                            <li><Link to='/contact' className="list-group-item bg-primary text-white"><i
                                className="fa-solid fa-angles-right me-1"></i>Contact us</Link></li>
                            <li><Link to='/about' className="list-group-item bg-primary text-white"><i
                                className="fa-solid fa-angles-right me-1"></i>About us</Link></li>
                        </ul>
                    </div>
                    <section className="col-lg">
                        <h4 className="h4 text-white">MLM Marketing</h4>
                        <ul className="list-group list-group-flush">
                            <li><Link to='/mlm-marketing' className="list-group-item bg-primary text-white"><i
                                className="fa-solid fa-angles-right me-1"></i>How it works</Link></li>
                            <li><Link to='/signup' className="list-group-item bg-primary text-white"><i
                                className="fa-solid fa-angles-right me-1"></i>Create Account</Link></li>
                            <li><Link to='/login' className="list-group-item bg-primary text-white"><i
                                className="fa-solid fa-angles-right me-1"></i>Log in</Link></li>
                        </ul>
                    </section>

                </div>
                <section className="row">
                    <hr className="mt-2 bg-white" style={{ height: 1 }} />
                    <div class="hstack mb-2 justify-content-center">

                        {companyInfo.facebook_url
                            ?
                            <div class="me-1 bg-white p-1"><Link to={companyInfo.facebook_url} target="_blank"><i className="fa-brands fa-square-facebook fs-5 text-primary align-middle"></i></Link></div>
                            :
                            null
                        }

                        {companyInfo.instagram_url
                            ?
                            <div class="me-1 bg-white p-1"><Link to={companyInfo.instagram_url} target="_blank"><i className="fa-brands fa-instagram fs-5 text-primary align-middle"></i></Link></div>
                            :
                            null
                        }

                        {companyInfo.twitter_url
                            ?
                            <div class="me-1 bg-white p-1"><Link to={companyInfo.twitter_url} target="_blank"><i className="fa-brands fa-square-twitter fs-5 text-primary align-middle"></i></Link></div>
                            :
                            null
                        }

                        {companyInfo.linkedin_url
                            ?
                            <div class="me-1 bg-white p-1"><Link to={companyInfo.linkedin_url} target="_blank"><i className="fa-brands fa-linkedin fs-5 text-primary align-middle"></i></Link></div>
                            :
                            null
                        }

                        {companyInfo.youtube_url
                            ?
                            <div class="me-1 bg-white p-1"><Link to={companyInfo.youtube_url} target="_blank"><i className="fa-brands fa-square-youtube fs-5 text-primary align-middle"></i></Link></div>
                            :
                            null
                        }

                        {companyInfo.whatsapp_url
                            ?
                            <div class="me-1 bg-white p-1"><Link to={companyInfo.whatsapp_url} target="_blank"><i className="fa-brands fa-whatsapp fs-5 text-primary align-middle"></i></Link></div>
                            :
                            null
                        }
                    </div>



                    <small className="text-center">&#169; {companyInfo.company_name} {year.getFullYear()}. All rights Reserved</small>
                    <small className="text-center">Designed and Developed by <a href="https://wa.me/message/SMDJVELK7COKN1"
                        className="text-decoration-none text-white fw-bold"
                    >Codehub Technologies</a></small>
                </section>
            </div>
        </div>
    );
}

export default Footer;