import PageTitle from "../cards/pageTitle";
import CoreValueGroup from "../groups/coreValueGroup";
import StatGroup from "../groups/statGroup";
import WhyChooseUs from "../cards/whyChooseUs";
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";
import parse from 'html-react-parser';

const About = () => {
    const companyInfo = useContext(CompanyInformationContext)

    return (
        <div className="">
            <PageTitle title="About Us" />
            <CoreValueGroup />

            {companyInfo.company_history
                ?
                <section className="container py-8">
                    <section className="row">
                        <section className="col-lg-8 mx-auto">
                            <h2 className="text-center">Our History</h2>
                            {parse(`${companyInfo.company_history}`)}
                        </section>
                    </section>
                </section>
                :
                null
            }

            <StatGroup />

            <WhyChooseUs />
        </div>
    );
}

export default About;