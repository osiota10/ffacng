import PageTitle from "../cards/pageTitle";
import ServiceCard from "../cards/serviceCard";
import { useContext } from "react";
import { ServiceContext } from "../../App";


const Services = () => {
    const ServiceList = useContext(ServiceContext)

    return (
        <div className="">
            <PageTitle title="Services" />

            {Object.keys(ServiceList).length === 0
                ?
                null
                :
                <section className="container mt-8">
                    <div className="row row-cols-1 row-cols-lg-3 g-4 justify-content-center">
                        {ServiceList.map(item =>
                            <ServiceCard
                                id={item.id}
                                title={item.title}
                                description={item.safe_description_body_html}
                                pic={item.get_image_url}
                                slug={item.slug}
                            />
                        )}
                    </div>
                </section>
            }
        </div>
    );
}

export default Services;