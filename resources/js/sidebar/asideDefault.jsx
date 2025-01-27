import React from "react";
import AsideMenu from "./asideMenu";

const AsideDefault = (props) => {
    const {
        asideConfig,
        isResponsiveMenu,
        menuClick,
        menuIconClick,
        isMenuCollapse,
    } = props;

    return (
        <AsideMenu
            asideConfig={asideConfig}
            isResponsiveMenu={isResponsiveMenu}
            menuClick={menuClick}
            menuIconClick={menuIconClick}
            isMenuCollapse={isMenuCollapse}
        />
    );
};

export default AsideDefault;
