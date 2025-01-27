import React from 'react';
import Spinner from '@/shared/loaders/Spinner';
import { getFormattedMessage } from '@/Helpers/Helpers';

const EmptyComponent = (props) => {
    const { isLoading } = props;

    return (
        <>
            {isLoading ? <Spinner /> :
                <div
                    className='px-3 py-6 text-center'>
                    {getFormattedMessage('react-data-table.no-record-found.label')}
                </div>
            }
        </>
    );
};

export default EmptyComponent;
