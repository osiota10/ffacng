import PageTitle from "../cards/pageTitle";
import parse from 'html-react-parser';
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";


const PrivacyPolicy = () => {
    const companyInfo = useContext(CompanyInformationContext)

    return (
        <div className="">
            <PageTitle title="Privacy Policies" />

            <section className="container py-8">
                <section className="row">
                    <section className="col-lg-8 mx-auto">
                        {parse(`${companyInfo.privacy_policy}`)}
                    </section>
                </section>
            </section>
        </div>
    );
}

export default PrivacyPolicy;