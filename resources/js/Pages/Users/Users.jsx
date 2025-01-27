import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { placeholderText, getFormattedMessage, getAvatarName, getFormattedDate } from '@/Helpers/Helpers';
import TopProgressBar from '@/shared/loaders/TopProgressBar';
import ReactDataTable from '@/shared/table/ReactDataTable';
import { Link, usePage } from '@inertiajs/react';
import moment from "moment";
import TabTitle from '@/shared/tab-title/TabTitle';
import DeleteUser from './DeleteUser';
import { Inertia } from "@inertiajs/inertia";
import { router } from '@inertiajs/react';
import ActionButton from '@/shared/action-buttons/ActionButton';
import DeleteModel from '../../shared/action-buttons/DeleteModel';

const Users = (props) => {
    const { users, isLoading, totalRecord } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        // fetchUsers(filter, true);

    };

    const goToEdit = (item) => {
        const id = item.id;
        router.get(route('users.edit', { id: id }));
    };

    const deleteUserFunction = (id) => {
        Inertia.delete(route("users.destroy", id), {
            onSuccess: () => {
                alert("User deleted successfully!");
            },
            onError: (error) => {
                console.error("Error deleting user:", error);
            },
        });
    }
    const columns = [
        {
            name: getFormattedMessage("users.table.user.column.title"),
            selector: (row) => row.first_name,
            sortField: "first_name",
            sortable: true,
            cell: (row) => {
                return (
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <Link href={`/users/${row.id}`}>
                                <span className="custom-user-avatar fs-5">
                                    {getAvatarName(
                                        row.first_name + " " + row.last_name
                                    )}
                                </span>
                            </Link>
                        </div>
                        <div className="d-flex flex-column">
                            <Link
                                href={`/users/${row.id}`}
                                className="text-decoration-none"
                            >
                                {row.first_name + " " + row.last_name}
                            </Link>
                            <span>{row.email}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            name: getFormattedMessage("users.table.phone-number.column.title"),
            selector: (row) => row.phone,
            sortField: "phone",
            sortable: true,
        },
        {
            name: getFormattedMessage(
                "globally.react-table.column.created-date.label"
            ),
            selector: (row) => row.created_at,
            sortField: "created_at",
            sortable: true,
            cell: (row) => {
                return (
                    <span className="badge bg-light-info">
                        <div className="mb-1">{row.time}</div>
                        <div>{row.date}</div>
                    </span>
                );
            },
        },
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ActionButton
                    item={row}
                    goToEditProduct={goToEdit}
                    isEditMode={true}
                    onClickDeleteModel={onClickDeleteModel}
                />
            ),
        },
    ];

    const itemsValue =
        users.data.length >= 0 &&
        users.data.map((user) => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            date: getFormattedDate(user.created_at, 'd-m-y'),
            time: moment(user.created_at).format("LT"),
        }));

    return (
        <AuthenticatedLayout>
            <TopProgressBar isLoading={isLoading} />
            <TabTitle title={placeholderText("users.title")} />

            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                ButtonValue={getFormattedMessage("user.create.title")}
                to="/users/create"
                totalRows={1}
                isLoading={isLoading}
            />

            <DeleteUser
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />

            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} isDelete={isDelete}
                deleteUserClick={deleteUserFunction} name={getFormattedMessage('users.table.user.column.title')} />}
        </AuthenticatedLayout>
    )
}

export default Users    