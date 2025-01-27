import React, { useCallback, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { getFormattedMessage } from '@/Helpers/Helpers';
import remove from '../../assets/images/remove.png';

const DeleteModel = (props) => {
    const { onClickDeleteModel, deleteUserClick, name, isDelete } = props;

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            onClickDeleteModel(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);
        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, []);

    return (
        <SweetAlert
            custom
            confirmBtnBsStyle='danger mb-3 fs-5 rounded'
            cancelBtnBsStyle='secondary mb-3 fs-5 rounded text-white'
            confirmBtnText={getFormattedMessage('delete-modal.yes-btn')}
            cancelBtnText={getFormattedMessage('delete-modal.no-btn')}
            title={getFormattedMessage('delete-modal.title')}
            onConfirm={(e) => deleteUserClick(isDelete.id)}
            onCancel={onClickDeleteModel}
            showCancel
            focusCancelBtn
            customIcon={remove}
        >
            <span className='sweet-text'>{getFormattedMessage('delete-modal.msg')} '{name}' ?</span>
        </SweetAlert>
    )
};
export default DeleteModel;
