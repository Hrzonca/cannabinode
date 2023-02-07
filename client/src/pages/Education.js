import React from "react";

const Education = () => {
    return (
        <div className="education-container">    
            <div className="education-h1-div">
                
                <h1>Higher Education</h1>    

            </div>
            <div className="edcucation-container-content">
                <h2>Strains</h2>
                <ul>
                    <li>
                        <p><strong>Sativa.</strong> strains typically gives the user a cerebral high. They also induce a uplifting and euphoric high that is recomended for daytime use. Sativa strains are not recommended for people who suffer with anxiety.</p>
                    </li>
                    <li>
                        <p><strong>Indica.</strong> strains typically gives the user a body high. They induce relaxation and are recomended for nighttime use.</p>
                    </li>
                    <li>
                        <p><strong>Hybrid.</strong> by definition is cross between 2 strains. Depending on the cross, the bud will produce the desired effects in the new generation. Genetisits are able to create true hybrids, sativa dominate hybrids, and indica dominate hybrids. True hybrids are a 50/50 cross between a sativa and indica plant. A sativa dominate hybrid has more sativa effects than indica effects. The same logic applies to the indica dominate hybrid. See above for indica and sativa effects.</p>
                    </li>
                </ul>
            </div>

            <div className="edcucation-container-content">
                <h2>Cannabis Components</h2>
                <ul>
                    <li>
                        <p><strong>THC.</strong>The technical name is Tetrahydrocannabinol. This is the main psychactive component in cannabis. This molecule causes the user to feel high.</p>
                    </li>
                    <li>
                        <p><strong>CBD.</strong>The techical name is Cannabidiol. CBD does not cause the user to feel high. This moecule is also non-toxic and does not induce depenancy. Patients use CBD to reduce pain, anxiety and seizures. CBD also helps some users with sleep. </p>
                    </li>
                    <li>
                        <p><strong>GBN.</strong>The techical name is Cannabinol. GBN is a derivative of CBD. CGN resembles THC but does not have a psycoactive component. CBN is typically used to help with sleep issues such as insomina and reduced sleep. This is often suggested to cancer patients that are undergoing chemotherapy as it simulates appetite.</p>
                    </li>
                    <li>
                        <p><strong>CBG.</strong>The techical name is Cannabigerol. This moecule is very similar to CBD but does act as an agonist to the CB1 and CB2 receptors. Agonists bind with the receptors and cause them to make a response. CBGs has digestive and antibacterial benefits as well as pain/ inflammation reduction.</p>
                    </li>
                </ul>
            </div>

            <div className="mb-5">
                <h2>Forms</h2>
                <p>Cannabis comes in many forms to give the user options on how they want to ingest it. Forms include flower, topical, edible, tincutre, and extract. </p>

            </div>

            <div className="mb-5 education-footer">
                <p><strong className="strong">Warning: </strong>Marijuana has intoxicating effects and may be habit forming. Smoking is hazardous to your health. There may be health risks associated with the consumptions of marijuana. Marijuana should not be used while pregnant or breastfeeding. Marijuana can impair coordination, concentration, and judgement. Please do not drive while under the influence of marijuana. If you are taking any perscription medications, please consult your physicion on how marijuana may interact with your meducation. </p>
            </div>
        </div>
    )
};

export default Education;