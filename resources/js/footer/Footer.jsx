import React from "react";

const Footer = () => {
    // const { allConfigData, frontSetting } = props;
    return (
        <footer className="border-top w-100 pt-4 mt-7 d-flex justify-content-between">
            <p className="fs-6 text-gray-600">
                All Rights Reserved ©{new Date().getFullYear()} 
                <a href="#" className="text-decoration-none">
                    {/* {frontSetting?.value?.company_name} */}
                    {" "} Mhmd XCode
                </a>
            </p>
            <div className="fs-6 text-gray-600">
               
            </div>
        </footer>
    );
};

export default Footer;
