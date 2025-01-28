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

const Payments = (props) => {
    const { payments, isLoading, total } = props;
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
        router.get(route('payments.edit', { id: id }));
    };

    const deleteUserFunction = (id) => {
        Inertia.delete(route("payments.destroy", id), {
            onSuccess: () => {
                alert("payments deleted successfully!");
            },
            onError: (error) => {
                console.error("Error deleting payments:", error);
            },
        });
    }

    const columns = [
        {
            name: getFormattedMessage("customer.title"),
            selector: (row) => row.customer_name,
            sortField: "name",
            sortable: true,
            cell: (row) => {
                return (
                    <div>
                        <div className="text-primary">{row.customer_name}</div>
                        <div>{row.customer_email}</div>
                    </div>
                );
            },
        },
        {
            name: getFormattedMessage("project.title"),
            selector: (row) => row.project_title,
            sortField: "project_title",
            sortable: true,
        },
        {
            name: getFormattedMessage("globally.total_amount.label"),
            selector: (row) => (
                <div>
                    <span
                        style={{
                            backgroundColor: "#f0f0f0",
                            color: "#333",
                            padding: "5px 10px",
                            borderRadius: "12px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            display: "inline-block",
                        }}
                    >
                        {"$" + row.total_amount}
                    </span>
                </div>
            ),
            sortField: "total_amount",
            sortable: true,
        },
        {
            name: getFormattedMessage("globally.amount.label"),
            selector: (row) => (
                <div>
                    <span
                        style={{
                            backgroundColor: "#f0f0f0",
                            color: "#333",
                            padding: "5px 10px",
                            borderRadius: "12px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            display: "inline-block",
                        }}
                    >
                        {"$" + row.amount}   
                    </span>
                </div>
            ),
            sortField: "amount",
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
        payments.data.length >= 0 &&
        payments.data.map((payment) => ({
            id: payment.id,
            customer_name: payment.project.customer.name,
            customer_email: payment.project.customer.email,
            project_title: payment.project.title,
            total_amount: payment.project.total_amount,
            amount: payment.amount,
            date: getFormattedDate(payment.created_at, 'd-m-y'),
            time: moment(payment.created_at).format("LT"),
        }));

    return (
        <AuthenticatedLayout>
            <TopProgressBar isLoading={isLoading} />
            <TabTitle title={placeholderText("payments.title")} />

            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                ButtonValue={getFormattedMessage("payment.create.title")}
                to="/payments/create"
                totalRows={total}
                isLoading={isLoading}
            />

            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} isDelete={isDelete}
                deleteUserClick={deleteUserFunction} name={getFormattedMessage('payment.title')} />}
        </AuthenticatedLayout>
    )
}

export default Payments;