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

const Projects = (props) => {
    const { projects, isLoading, total } = props;
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
        router.get(route('projects.edit', { id: id }));
    };

    const deleteUserFunction = (id) => {
        Inertia.delete(route("projects.destroy", id), {
            onSuccess: () => {
                alert("projects deleted successfully!");
            },
            onError: (error) => {
                console.error("Error deleting projects:", error);
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
            name: getFormattedMessage("globally.title.label"),
            selector: (row) => row.title,
            sortField: "title",
            sortable: true,
        },
        {
            name: getFormattedMessage("globally.total_amount.label"),
            selector: (row) => "$" + row.total_amount,
            sortField: "total_amount",
            sortable: true,
        },
        {
            name: getFormattedMessage("globally.status.label"),
            sortField: "status",
            sortable: true,
            cell: (row) => {
                return (
                    (row.status === 'Completed' && (
                        <span className="badge bg-light-success">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.complated.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === "Pending" && (
                        <span className="badge bg-light-primary">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.pending.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === "In Progress" && (
                        <span className="badge bg-light-warning">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.in_progress.label"
                                )}
                            </span>
                        </span>
                    ))
                );
            },
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
        projects.data.length >= 0 &&
        projects.data.map((project) => ({
            id: project.id,
            customer_name: project.customer.name,
            customer_email: project.customer.email,
            title: project.title,
            total_amount: project.total_amount,
            status: project.status,
            date: getFormattedDate(project.created_at, 'd-m-y'),
            time: moment(project.created_at).format("LT"),
        }));
    return (
        <AuthenticatedLayout>
            <TopProgressBar isLoading={isLoading} />
            <TabTitle title={placeholderText("products.title")} />

            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                ButtonValue={getFormattedMessage("product.create.title")}
                to="/projects/create"
                totalRows={total}
                isLoading={isLoading}
            />

            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} isDelete={isDelete}
                deleteUserClick={deleteUserFunction} name={getFormattedMessage('products.table.product.column.title')} />}
        </AuthenticatedLayout>
    )
}

export default Projects;