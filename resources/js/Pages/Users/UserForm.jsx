
import { Form } from 'react-bootstrap-v5';
// import ImagePicker from '@/Components/image-picker/ImagePicker';
import { getAvatarName, getFormattedMessage, placeholderText, numValidate } from '@/Helpers/Helpers'
import { useState } from 'react';
import * as EmailValidator from 'email-validator';
// import ModelFooter from '@/shared/ModelFooter';

const UserForm = (props) => {
    const { addUserData, id, user, isEdit = false, isCreate } = props;
    const [disabled, setDisabled] = useState(true);

    const [userValue, setUserValue] = useState({
        first_name: user ? user.first_name : '',
        last_name: user ? user.last_name : '',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        password: '',
        confirm_password: '',
    });

    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
    });


    const onChangeInput = (e) => {
        e.preventDefault();
        setUserValue(inputs => ({ ...inputs, [e.target.name]: e.target.value }))
        setErrors('');
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!userValue['first_name']) {
            errorss['first_name'] = getFormattedMessage("user.input.first-name.validate.label");
        } else if (!userValue['last_name']) {
            errorss['last_name'] = getFormattedMessage("user.input.last-name.validate.label");
        } else if (!EmailValidator.validate(userValue['email'])) {
            if (!userValue['email']) {
                errorss['email'] = getFormattedMessage("user.input.email.validate.label");
            } else {
                errorss['email'] = getFormattedMessage("user.input.email.valid.validate.label");
            }
        } else if (!userValue['phone']) {
            errorss['phone'] = getFormattedMessage("user.input.phone-number.validate.label");
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const prepareFormData = (data) => {
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        if (!isEdit) {
            formData.append('password', data.password);
            formData.append('confirm_password', data.confirm_password);
        }

        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();

        if (valid) {
            setUserValue(userValue);
            console.log(userValue);
            
            
        };
    }

    return (
        <div className='card'>
            <div className='card-body'>
                <Form>
                    <div className='row'>
                        <div className='mb-4'>
                            {/* <ImagePicker user={user} isCreate={isCreate} avtarName={avatarName}
                                imageTitle={placeholderText("globally.input.change-image.tooltip")}
                                imagePreviewUrl={imagePreviewUrl} handleImageChange={handleImageChanges} /> */}
                        </div>

                        {/* FIRSTNAME START */}
                        <div className='col-md-6 mb-3'>
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                {getFormattedMessage("user.input.first-name.label")} :<span className="required" />
                            </label>
                            <input type='text' name='first_name' value={userValue.first_name}
                                placeholder={placeholderText("user.input.first-name.placeholder.label")}
                                className='form-control' autoFocus={true}
                                onChange={(e) => onChangeInput(e)} />
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['first_name'] ? errors['first_name'] : null}</span>
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
                                onChange={(e) => onChangeInput(e)}
                                value={userValue.last_name} />
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['last_name'] ? errors['last_name'] : null}</span>
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
                                onChange={(e) => onChangeInput(e)}
                                value={userValue.email} />
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['email'] ? errors['email'] : null}</span>
                        </div>
                        {/* EMAIL END */}

                        {/* PHONE NUMBER START */}
                        <div className='col-md-6 mb-3'>
                            <label
                                className='form-label'>
                                {getFormattedMessage("user.input.phone-number.label")}:
                            </label>
                            <span className='required' />
                            <input type='text' name='phone' value={userValue.phone}
                                placeholder={placeholderText("user.input.phone-number.placeholder.label")}
                                className='form-control' pattern='[0-9]*' min={0}
                                onKeyPress={(event) => numValidate(event)}
                                onChange={(e) => onChangeInput(e)} />
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['phone'] ? errors['phone'] : null}</span>
                        </div>
                        {/* PHONE NUMBER END */}

                        {/* PASSWORD START */}
                        {isEdit ? '' :
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>
                                    {getFormattedMessage("user.input.password.label")}:
                                </label>
                                <span className='required' />
                                <input type='password' name='password'
                                    placeholder={placeholderText("user.input.password.placeholder.label")}
                                    className='form-control' value={userValue.password}
                                    onChange={(e) => onChangeInput(e)} />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors['password'] ? errors['password'] : null}</span>
                            </div>}

                        {isEdit ? '' :
                            <div className='col-md-6 mb-3'>
                                <label
                                    className='form-label'>
                                    {getFormattedMessage("user.input.confirm-password.label")}:
                                </label>
                                <span className='required' />
                                <input type='password' name='confirm_password' className='form-control'
                                    placeholder={placeholderText("user.input.confirm-password.placeholder.label")}
                                    onChange={(e) => onChangeInput(e)}
                                    value={userValue.confirm_password} />
                                <span
                                    className='text-danger d-block fw-400 fs-small mt-2'>{errors['confirm_password'] ? errors['confirm_password'] : null}</span>
                            </div>}
                        {/* PASSWORD END */}

                        <button onClick={(event) => onSubmit(event)} className='btn btn-primary me-3' type='submit' disabled={disabled || isSaving}>
                            {isSaving ? placeholderText("globally-saving-btn-label") : placeholderText("globally.save-btn")}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
};


export default UserForm;
