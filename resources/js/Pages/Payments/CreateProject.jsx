import React, { useEffect, useState } from 'react';
import HeaderTitle from '@/Components/header';
import { getFormattedMessage, placeholderText, numValidate } from '@/Helpers/Helpers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm } from '@inertiajs/react';
import ReactSelect from '@/shared/select/reactSelect';

const CreateProject = (props) => {
    const { customers } = props;
    const [dataStatus, setDataStatus] = useState([
        { "value": "Pending", "label": "Pending" },
        { "value": "In Progress", "label": "In Progress" },
        { "value": "Completed", "label": "Completed" },
    ]);

    const [customersData, setCustomerData] = useState();
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        total_amount: '',
        status: 'pending',
        customer_id: '',
    });

    useEffect(() => {
        let x = customers.map((customer) => {
            return { "value": customer.id, "label": customer.name };
        });

        setCustomerData(x);
    }, [customers]);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    }

    const handleStatus = (selectedOption) => {
        setData("status", selectedOption?.value);
    }
    const handleCustomer = (selectedOption) => {
        setData("customer_id", selectedOption?.value);
    }

    return (
        <AuthenticatedLayout>
            <HeaderTitle title={getFormattedMessage('product.create.title')} to='/projects' />

            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            {/* TITLE */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.title.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    type="text"
                                    name="title"
                                    placeholder={placeholderText(
                                        "globally.input.title.placeholder.label"
                                    )}
                                    className="form-control"
                                    autoFocus={true}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors.title ? errors.title : null}</span>
                            </div>
                            {/* TITLE */}

                            {/* DESCRIPTION */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.input.description.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    placeholder={placeholderText(
                                        "globally.input.description.placeholder.label"
                                    )}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors.description ? errors.description : null}
                                </span>
                            </div>
                            {/* DESCRIPTION */}

                            {/* TOTAL AMOUNT */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.total_amount.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    type="text"
                                    name="total_amount"
                                    className="form-control"
                                    placeholder={placeholderText(
                                        "globally.total_amount.label"
                                    )}
                                    onKeyPress={(event) => numValidate(event)}
                                    onChange={(e) => setData('total_amount', e.target.value)}
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors.total_amount ? errors.total_amount : null}
                                </span>
                            </div>
                            {/* TOTAL AMOUNT */}

                            {/* CUSTOMER */}
                            <div className="col-md-6 mb-3">
                                <ReactSelect
                                    title={getFormattedMessage(
                                        "customer.title"
                                    )}
                                    placeholder={placeholderText(
                                        "customer.choose.customer"
                                    )}
                                    defaultValue={
                                        data.customer_id
                                    }
                                    value={data.customer_id
                                        ? {
                                            value: data.customer_id,
                                            label: customers.find((customer) => customer.id === data.customer_id)?.name
                                        }
                                        : null}

                                    data={customersData}
                                    onChange={handleCustomer}
                                    errors={errors.customer_id}
                                />
                            </div>
                            {/* CUSTOMER */}

                            {/* STATUS */}
                            <div className="col-md-12 mb-3">
                                <ReactSelect
                                    title={getFormattedMessage(
                                        "project.input.status.label"
                                    )}
                                    placeholder={placeholderText(
                                        "project.input.status.placeholder.label"
                                    )}
                                    defaultValue={
                                        data.status
                                    }
                                    value={data.status ? { value: data.status, label: dataStatus.find((status) => status.value === data.status)?.label } : null}
                                    data={dataStatus}
                                    onChange={handleStatus}
                                    errors={errors.status}
                                />
                            </div>
                            {/* STATUS */}

                            <button className='btn btn-primary me-3' type='submit' disabled={processing}>
                                {processing ? placeholderText("globally-saving-btn-label") : placeholderText("globally.save-btn")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

export default CreateProject;
