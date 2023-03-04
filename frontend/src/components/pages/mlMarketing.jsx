import PageTitle from "../cards/pageTitle";
import parse from 'html-react-parser';
import { useContext } from "react";
import { NetworkMarketingContext } from "../../App";

const MlMarketing = () => {
    const networkInfo = useContext(NetworkMarketingContext)

    return (
        <section>
            <PageTitle title="MLM Marketing" />

            <section className="container py-8">
                <section className="row">
                    <section className="col-lg-8 mx-auto">
                        {parse(`${networkInfo.description}`)}
                    </section>
                </section>
            </section>

        </section>
    );
}

export default MlMarketing;