import ServiceCard from "../cards/serviceCard";
import { useContext } from "react";
import { ServiceContext } from "../../App";

const ServicesGroup = () => {
    const ServiceList = useContext(ServiceContext)

    return (
        <>
            {
                Object.keys(ServiceList).length === 0
                    ?
                    null
                    :
                    <section className="container py-8">
                        <header class="text-center mb-4">
                            <h2 class="h2">What We Do</h2>
                            <h6 class="h6">Our Top Notch Services</h6>
                            <hr class="hr mx-auto" style={{ width: "10%" }} />
                        </header>
                        <div className='row row-cols-1 row-cols-lg-3 g-6 justify-content-center'>
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
        </>
    );
}

export default ServicesGroup;