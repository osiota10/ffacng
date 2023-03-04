import PageTitle from "../cards/pageTitle";
import CoreValueGroup from "../groups/coreValueGroup";
import StatGroup from "../groups/statGroup";
import WhyChooseUs from "../cards/whyChooseUs";
import TextListTemplate from "../cards/textTemplate";
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";

const About = () => {
    const companyInfo = useContext(CompanyInformationContext)

    return (
        <div className="">
            <PageTitle title="About Us" />
            <CoreValueGroup />

            {companyInfo.company_history
                ?
                <section className="py-8 history">
                    <TextListTemplate
                        title='Our History'

                        description={companyInfo.company_history}
                        pic={companyInfo.get_history_image}
                    />
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