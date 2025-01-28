import React from 'react';
import HeaderTitle from '@/Components/header';
import { getFormattedMessage, placeholderText, numValidate } from '@/Helpers/Helpers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm } from '@inertiajs/react';


const CreateUser = () => {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        // confirm_password: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        
        post(route('users.store'));
    }

    return (
        <AuthenticatedLayout>
            <HeaderTitle title={getFormattedMessage('user.create.title')} to='/users' />

            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={onSubmit}>
                        <div className='row'>
                            {/* FIRSTNAME START */}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    {getFormattedMessage("user.input.first-name.label")} :<span className="required" />
                                </label>
                                <input type='text' name='first_name'
                                    placeholder={placeholderText("user.input.first-name.placeholder.label")}
                                    className='form-control' autoFocus={true}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors.first_name ? errors.first_name : null}</span>
                            </div>
                            {/* FIRSTNAME END */}

                            {/* LASTNAME START */}
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.last-name.label")}:
                                </label>
                                <span className='required' />
                                <input type='text' name='last_name' className='form-control'
                                    placeholder={placeholderText("user.input.last-name.placeholder.label")}
                                    onChange={(e) => setData('last_name', e.target.value)} />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors.last_name ? errors.last_name : null}</span>
                            </div>
                            {/* LASTNAME END */}

                            {/* EMAIL START */}
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.email.label")}:
                                </label>
                                <span className='required' />
                                <input type='text' name='email' className='form-control'
                                    placeholder={placeholderText("user.input.email.placeholder.label")}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors.email ? errors.email : null}</span>
                            </div>
                            {/* EMAIL END */}

                            {/* PHONE NUMBER START */}
                            <div className='col-md-6 mb-3'>
                                <label
                                    className='form-label'>
                                    {getFormattedMessage("user.input.phone-number.label")}:
                                </label>
                                <span className='required' />
                                <input type='text' name='phone'
                                    placeholder={placeholderText("user.input.phone-number.placeholder.label")}
                                    className='form-control' pattern='[0-9]*' min={0}
                                    onKeyPress={(event) => numValidate(event)}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors.phone ? errors.phone : null}</span>
                            </div>
                            {/* PHONE NUMBER END */}

                            {/* PASSWORD START */}
                            <div className='col-md-12 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.password.label")}:
                                </label>
                                <span className='required' />
                                <input type='password' name='password'
                                    placeholder={placeholderText("user.input.password.placeholder.label")}
                                    className='form-control' onChange={(e) => setData('password', e.target.value)} />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors.password ? errors.password : null}</span>
                            </div>
{/* 
                            <div className='col-md-6 mb-3'>
                                <label
                                    className='form-label'>
                                    {getFormattedMessage("user.input.confirm-password.label")}:
                                </label>
                                <span className='required' />
                                <input type='password' name='confirm_password' className='form-control'
                                    placeholder={placeholderText("user.input.confirm-password.placeholder.label")}
                                    onChange={(e) => setData('confirm_password', e.target.value)} />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors.confirm_password ? errors.confirm_password : null}</span>
                            </div> */}
                            {/* PASSWORD END */}

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

export default CreateUser;
