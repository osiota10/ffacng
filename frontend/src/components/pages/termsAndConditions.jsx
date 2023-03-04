import PageTitle from "../cards/pageTitle";
import { useContext } from "react";
import { CompanyInformationContext } from "../../App";
import parse from 'html-react-parser';

const TermsAndConditions = () => {
    const companyInfo = useContext(CompanyInformationContext)

    return (
        <div className="">
            <PageTitle title="Terms and Conditions" />

            <section className="container py-8">
                <section className="row">
                    <section className="col-lg-8 mx-auto">
                        {parse(`${companyInfo.term_and_conditions}`)}
                    </section>
                </section>
            </section>
        </div>
    );
}

export default TermsAndConditions;