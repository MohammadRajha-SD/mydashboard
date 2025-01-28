import React from 'react';
import HeaderTitle from '@/Components/header';
import { getFormattedMessage, placeholderText, numValidate } from '@/Helpers/Helpers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm } from '@inertiajs/react';
import ReactDatePicker from '@/shared/datepicker/ReactDatePicker';

const CreateCustomer = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        country: '',
        city:'',
        dob:null
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('customers.store'));
    }
    const handleCallback = (date) => {
       setData('dob', date);
    };

    return (
        <AuthenticatedLayout>
            <HeaderTitle title={getFormattedMessage('customer.create.title')} to='/customers' />

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
}

export default CreateCustomer;
