import React, { useEffect } from 'react';
import HeaderTitle from '@/Components/header';
import { getFormattedMessage, placeholderText, numValidate } from '@/Helpers/Helpers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

const EditUser = ({ user }) => {
    const { data, setData, put, processing, errors } = useForm({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(route('users.update', user.id));
        } catch (error) {
            console.error("An error occurred while updating the user:", error);
        }
    };

    return (
        <AuthenticatedLayout>
            <HeaderTitle title={getFormattedMessage('user.edit.title')} to='/app/users' />
            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={onSubmit}>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.first-name.label")}:
                                </label>
                                <input
                                    type='text'
                                    name='first_name'
                                    className='form-control'
                                    placeholder={placeholderText("user.input.first-name.placeholder.label")}
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />
                                <span className='text-danger'>{errors.first_name}</span>
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.last-name.label")}:
                                </label>
                                <input
                                    type='text'
                                    name='last_name'
                                    className='form-control'
                                    placeholder={placeholderText("user.input.last-name.placeholder.label")}
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />
                                <span className='text-danger'>{errors.last_name}</span>
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.email.label")}:
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    className='form-control'
                                    placeholder={placeholderText("user.input.email.placeholder.label")}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <span className='text-danger'>{errors.email}</span>
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.phone-number.label")}:
                                </label>
                                <input
                                    type='text'
                                    name='phone'
                                    className='form-control'
                                    pattern='[0-9]*'
                                    placeholder={placeholderText("user.input.phone-number.placeholder.label")}
                                    value={data.phone}
                                    onKeyPress={numValidate}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                <span className='text-danger'>{errors.phone}</span>
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.password.label")}:
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    className='form-control'
                                    placeholder={placeholderText("user.input.password.placeholder.label")}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <span className='text-danger'>{errors.password}</span>
                            </div>

                            <button className='btn btn-primary' type='submit' disabled={processing}>
                                {processing
                                    ? placeholderText("globally-saving-btn-label")
                                    : placeholderText("globally.save-btn")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditUser;
