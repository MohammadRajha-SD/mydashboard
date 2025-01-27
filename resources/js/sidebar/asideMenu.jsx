import React, { useEffect, useState } from "react";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    ProSidebar,
    SidebarHeader,
    SidebarContent,
    Menu,
    SubMenu,
    MenuItem
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { placeholderText, getFormattedMessage } from '@/Helpers/Helpers'
import { Link, usePage } from '@inertiajs/react';


const AsideMenu = (props) => {
    const {
        asideConfig,
        isResponsiveMenu,
        menuClick,
        menuIconClick,
        isMenuCollapse,
    } = props;

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMenu, setFilteredMenu] = useState([]);
    const { url } = usePage();

    const filterMenu = (asideConfig, searchTerm) => {
        // if (!searchTerm) {
        return asideConfig;
        // }
    }

    useEffect(() => {
        setFilteredMenu(filterMenu(asideConfig));
    }, []);
    return (
        <ProSidebar collapsed={isMenuCollapse}
            className={`${isResponsiveMenu === true ? "open-menu" : "hide-menu"
                } aside-menu-container`}>
            <SidebarHeader className="aside-menu-container__aside-logo flex-column-auto pb-2 pt-3">
                <a
                    href="/"
                    className="text-decoration-none sidebar-logo text-gray-900 fs-4"
                >
                    <div
                        className={`${isMenuCollapse
                            ? "d-none"
                            : "image image-mini me-3"
                            }`}
                    >
                        <img
                            src={'https://www.vectorkhazana.com/assets/images/products/lada_xcode_logo,.jpg'}
                            className="img-fluid object-fit-contain"
                            alt="profile image"
                        />
                    </div>
                    {isMenuCollapse
                        ? null
                        : 'Mhmd-Rajha'}
                </a>
                <button
                    type="button"
                    onClick={(e) => menuIconClick(e)}
                    className="btn p-0 fs-1 aside-menu-container__aside-menubar d-lg-block d-none sidebar-btn border-0"
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className="text-gray-600"
                    />
                </button>
            </SidebarHeader>

            <SidebarContent className="sidebar-scrolling">
                <div
                    className={`d-flex position-relative aside-menu-container__aside-search search-control ${isMenuCollapse ? "d-none" : ""
                        } py-3 mt-1`}
                >
                    <div className="position-relative d-flex w-100">
                        <input
                            className={`form-control ps-8 ${isMenuCollapse ? "d-none" : ""
                                }`}
                            type="search"
                            id="search"
                            placeholder={placeholderText(
                                "react-data-table.searchbar.placeholder"
                            )}
                            aria-label="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="position-absolute d-flex align-items-center top-0 bottom-0 left-0 text-gray-600 ms-3">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </div>
                <Menu>
                    {filteredMenu.length ? (
                        filteredMenu.map((item, index) => {
                            return item.isSubMenu ? (
                                <SubMenu
                                    key={index}
                                    title={item.title}
                                    className={`${item.paths.includes(url) ? "pro-active-sub myDIV" : "myDIV"}`}
                                    icon={item.fontIcon}
                                >
                                    {item.items.map((subItem, subIndex) => {
                                        return (
                                            <MenuItem
                                                key={subIndex}
                                                icon={subItem.fontIcon}
                                                className={`${isMenuCollapse === false ? subItem.class : ""}  flex-column`}
                                                active={url == subItem.to}
                                            >
                                                <Link href={subItem.to}>{subItem.title}</Link>
                                            </MenuItem>
                                        )
                                    })}

                                </SubMenu>
                            ) : (
                                <MenuItem
                                    key={index}
                                    icon={item.fontIcon}
                                    className={`${isMenuCollapse === false ? item.class : ""} flex-column`}
                                    active={url === item.to}
                                >
                                    <Link href={item.to}>{item.title}</Link>
                                </MenuItem>
                            )
                        })
                    ) : (
                        <div className="text-center">
                            {getFormattedMessage("side-menu.empty.message")}
                        </div>
                    )}
                </Menu>
            </SidebarContent>
        </ProSidebar >
    );
};

export default AsideMenu;

