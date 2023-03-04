import TextListTemplate from "./textTemplate";
import { useContext } from "react";
import { NetworkMarketingContext } from "../../App";



const Mlm = () => {
    const networkInfo = useContext(NetworkMarketingContext)

    return (
        <>
            {Object.keys(networkInfo).length === 0
                ?
                null
                :
                <section class="container py-8 why-choose-use">
                    <TextListTemplate
                        title={networkInfo.title}
                        sub_title={networkInfo.sub_title}
                        description={networkInfo.description}
                        pic={networkInfo.get_image_url}
                    />
                </section>
            }
        </>
    );
}

export default Mlm;