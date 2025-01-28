import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { placeholderText, getFormattedMessage, getFormattedDate } from '@/Helpers/Helpers';
import TopProgressBar from '@/shared/loaders/TopProgressBar';
import ReactDataTable from '@/shared/table/ReactDataTable';
import moment from "moment";
import TabTitle from '@/shared/tab-title/TabTitle';
import { Inertia } from "@inertiajs/inertia";
import { router } from '@inertiajs/react';
import ActionButton from '@/shared/action-buttons/ActionButton';
import DeleteModel from '../../shared/action-buttons/DeleteModel';

const Customers = (props) => {
    const { customers, isLoading, total } = props;
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
        router.get(route('customers.edit', { id: id }));
    };

    const deleteUserFunction = (id) => {
        Inertia.delete(route("customers.destroy", id), {
            onSuccess: () => {
                alert("customers deleted successfully!");
            },
            onError: (error) => {
                console.error("Error deleting customers:", error);
            },
        });
    }
    const columns = [
        {
            name: getFormattedMessage("customer.title"),
            selector: (row) => row.name,
            sortField: "name",
            sortable: true,
            cell: (row) => {
                return (
                    <div>
                        <div className="text-primary">{row.name}</div>
                        <div>{row.email}</div>
                    </div>
                );
            },
        },
        {
            name: getFormattedMessage("globally.input.phone-number.label"),
            selector: (row) => row.phone,
            sortField: "phone",
            sortable: true,
        },
        {
            name: getFormattedMessage(
                "globally.react-table.column.created-date.label"
            ),
            selector: (row) => row.date,
            sortField: "created_at",
            sortable: true,
            cell: (row) => {
                return (
                    <span className="badge bg-light-info">
                        <div className="mb-1">{row.time}</div>
                        {row.date}
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
        customers.data.length >= 0 &&
        customers.data.map((customer) => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            country: customer.country,
            city: customer.city,
            date: getFormattedDate(customer.created_at, 'd-m-y'),
            time: moment(customer.created_at).format("LT"),
        }));

    return (
        <AuthenticatedLayout>
            <TopProgressBar isLoading={isLoading} />
            <TabTitle title={placeholderText("customers.title")} />

            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                ButtonValue={getFormattedMessage("customer.create.title")}
                to="/customers/create"
                totalRows={total}
                isLoading={isLoading}
            />

            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} isDelete={isDelete}
                deleteUserClick={deleteUserFunction} name={getFormattedMessage('customers.table.customer.column.title')} />}
        </AuthenticatedLayout>
    )
}

export default Customers    