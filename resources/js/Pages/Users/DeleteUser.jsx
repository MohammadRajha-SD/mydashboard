import React from 'react';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import { getFormattedMessage } from '@/Helpers/Helpers';

const DeleteUser = (props) => {
    const {deleteUser, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteUser(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} name={getFormattedMessage('users.table.user.column.title')}/>}
        </div>
    )
};

export default DeleteUser;
