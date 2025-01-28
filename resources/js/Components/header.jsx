import React from 'react';
import { Link } from '@inertiajs/react';
import { getFormattedMessage } from '@/Helpers/Helpers';

const HeaderTitle = (props) => {
    const {title, to, editLink} = props;
    return (
    <div className='d-md-flex align-items-center justify-content-between mb-5'>
        {title ? <h1 className='mb-0'>{title}</h1> : ''}
        <div className='text-end mt-4 mt-md-0'>
            {editLink ? <Link to={editLink}
                              className='btn btn-outline-primary me-2'>{getFormattedMessage('globally.edit-btn')}</Link> : null}
            {to ? <Link href={to}
                        className='btn btn-outline-primary'>{getFormattedMessage('globally.back-btn')}</Link> : null}
        </div>
    </div>
    )
};

export default HeaderTitle;
