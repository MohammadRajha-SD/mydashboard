import React from 'react';
import HeaderTitle from '@/Components/header';
import { getFormattedMessage, placeholderText, numValidate } from '@/Helpers/Helpers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import ReactDatePicker from '@/shared/datepicker/ReactDatePicker';

const EditCustomer = ({ customer }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        country: customer?.country || '',
        city: customer?.city || '',
        address: customer?.address || '',
        dob: customer?.dob || null,
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(route('customers.update', customer.id));
        } catch (error) {
            console.error("An error occurred while updating the customer:", error);
        }
    };
    const handleCallback = (date) => {
        setData('dob', date);
    };
    return (
        <AuthenticatedLayout>
            <HeaderTitle title={getFormattedMessage('customer.edit.title')} to='/customers' />

            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.input.name.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={placeholderText(
                                        "globally.input.name.placeholder.label"
                                    )}
                                    className="form-control"
                                    value={data.name}
                                    autoFocus={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors.name ? errors.name : null}</span>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.input.email.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={data.email}
                                    placeholder={placeholderText(
                                        "globally.input.email.placeholder.label"
                                    )}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors.email ? errors.email : null}
                                </span>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.input.phone-number.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    pattern="[0-9]*"
                                    placeholder={placeholderText(
                                        "globally.input.phone-number.placeholder.label"
                                    )}
                                    value={data.phone}
                                    onKeyPress={(event) => numValidate(event)}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors.phone ? errors.phone : null}
                                </span>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage("DOB.input.label")}:
                                </label>
                                <div className="position-relative">
                                    <ReactDatePicker
                                        onChangeDate={handleCallback}
                                        newStartDate={data?.dob}
                                        readOnlyref={false}
                                    />
                                </div>
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors.dob ? errors.dob : null}
                                </span>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.input.country.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    type="text"
                                    name="country"
                                    className="form-control"
                                    placeholder={placeholderText(
                                        "globally.input.country.placeholder.label"
                                    )}
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors.country ? errors.country : null}
                                </span>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.input.city.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder={placeholderText(
                                        "globally.input.city.placeholder.label"
                                    )}
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors.city ? errors.city : null}
                                </span>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "globally.input.address.label"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <textarea
                                    type="text"
                                    rows="4"
                                    cols="50"
                                    name="address"
                                    className="form-control"
                                    placeholder={placeholderText(
                                        "globally.input.address.placeholder.label"
                                    )}
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors.address ? errors.address : null}
                                </span>
                            </div>

                            <button className='btn btn-primary me-3' type='submit' disabled={processing}>
                                {processing ? placeholderText("globally-saving-btn-label") : placeholderText("globally.save-btn")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditCustomer;
