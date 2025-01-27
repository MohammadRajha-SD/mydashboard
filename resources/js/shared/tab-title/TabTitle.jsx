import React from 'react';
import {Helmet} from 'react-helmet';

const TabTitle = (props) => {
    const { title } = props;

    return (
        <Helmet>
            <title>{title + ' '} Mhmd-xcode</title>
        </Helmet>
    )
}

export default TabTitle;
