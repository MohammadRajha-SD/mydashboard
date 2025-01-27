import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Footer from '@/footer/Footer';
import Header from '@/shared/components/header/Header';
import AsideDefault from '@/sidebar/asideDefault';
import asideConfig from '@/config/asideConfig'
import AsideTopSubMenuItem from '@/sidebar/asideTopSubMenuItem'
export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [isResponsiveMenu, setIsResponsiveMenu] = useState(false);
    const [isMenuCollapse, setIsMenuCollapse] = useState(false);

    const menuClick = () => {
        setIsResponsiveMenu(!isResponsiveMenu);
    };

    const menuIconClick = () => {
        setIsMenuCollapse(!isMenuCollapse);
    };

    return (
        <div className="d-flex flex-row flex-column-fluid">
            <AsideDefault
                asideConfig={asideConfig}
                isResponsiveMenu={isResponsiveMenu}
                menuClick={menuClick}
                menuIconClick={menuIconClick}
                isMenuCollapse={isMenuCollapse}
            />
            <div
                // ${isMenuCollapse === true ? "wrapper-res" : "wrapper"}
                className={` d-flex flex-column flex-row-fluid`}
            >
                <div className="d-flex align-items-stretch justify-content-between header">
                    <div className="container-fluid d-flex align-items-stretch justify-content-xxl-between flex-grow-1">
                        <button
                            type="button"
                            className="btn d-flex align-items-center d-xl-none px-0"
                            title="Show aside menu"
                            onClick={menuClick}
                        >
                            <FontAwesomeIcon icon={faBars} className="fs-1" />
                        </button>

                        <AsideTopSubMenuItem
                            asideConfig={asideConfig}
                            isMenuCollapse={isMenuCollapse}
                        />

                        <Header user={user} />
                    </div>
                </div>
                <div className="content d-flex flex-column flex-column-fluid pt-7">
                    <div className="d-flex flex-column-fluid">
                        <div className="container-fluid">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
