import React from "react";
import { Dropdown } from "react-bootstrap-v5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { getFormattedMessage } from "@/Helpers/Helpers";
import { Link, usePage } from '@inertiajs/react';

const AsideTopSubMenuItem = (props) => {
    const { asideConfig, isMenuCollapse } = props;
    const { url } = usePage();
    return (
        <nav
            className={`navbar navbar-expand-xl ${isMenuCollapse === true ? "top-navbar" : "top-nav-heding"
                } navbar-light d-xl-flex align-items-stretch d-block px-3 px-xl-0 py-4 py-xl-0`}
        >
            <div className="navbar-collapse">
                <Dropdown className="d-flex align-items-stretch me-3 report_dropdown">
                    <Dropdown.Toggle
                        className="hide-arrow bg-transparent border-0 p-0 d-flex align-items-center"
                        id="dropdown-basic"
                    >
                        <FontAwesomeIcon
                            icon={faPlusSquare}
                            className="shortcut-btn px-sm-3 px-2 d-flex text-decoration-none pos-button pos-button-highlight"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="shortcut-menu">
                        <Dropdown.Item className="py-0 fs-6">
                            <Link
                                href={"/customers/create"}
                                className="nav-link px-4"
                            >
                                <span className="dropdown-icon me-4 text-green-600">
                                    <FontAwesomeIcon icon={faPlusSquare} />
                                </span>
                                <span>
                                    {getFormattedMessage(
                                        "dashboard.recentSales.customer.label"
                                    )}
                                </span>
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>


                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    <div className="nav-item position-relative mx-xl-3 mb-3 mb-xl-0">
                        <Link
                            href="/dashboard"
                            className={`${url === "/dashboard" ? "active" : ""} nav-link p-0`}
                        >
                            <span>
                                {getFormattedMessage("dashboard.title")}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AsideTopSubMenuItem;