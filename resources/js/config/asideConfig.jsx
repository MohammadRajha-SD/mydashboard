import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPieChart, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { getFormattedMessage } from "@/Helpers/Helpers";

export default [
    {
        title: getFormattedMessage('dashboard.title'),
        name: 'dashboard',
        fontIcon: <FontAwesomeIcon icon={faPieChart} />,
        to: '/dashboard',
        class: "d-flex",
        isSubMenu: false,
    },
    {
        title: getFormattedMessage('pepole.title'),
        name: 'Pepoles',
        to: '/pepoles',
        fontIcon: <FontAwesomeIcon icon={faUser} />,
        class: "d-flex",
        isSubMenu: true,
        paths: [
            '/customers',
            '/users',
        ],
        items: [
            {
                title: getFormattedMessage('customers.title'),
                name: 'Customers',
                to: '/customers',
                fontIcon: <FontAwesomeIcon icon={faUserGroup} />,
                class: "d-flex",
            },
            {
                title: getFormattedMessage('users.title'),
                name: 'Users',
                to: '/users',
                fontIcon: <FontAwesomeIcon icon={faUser} />,
                class: "d-flex",
            },
        ],
    },
];