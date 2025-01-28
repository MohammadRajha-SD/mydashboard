import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap-v5';
import Select from 'react-select';
import { getFormattedMessage } from '@/Helpers/Helpers';

const ReactSelect = (props) => {
    const { title, placeholder, defaultValue, value, data, onChange, isRequired=false,errors} = props;
    const option = data?.map((da) => {
        return {
            value: da.value,
            label: da.label
        }
    });

    return (
        <Form.Group className='form-group w-100' controlId='formBasic'>
            {title ? <Form.Label>{title}:</Form.Label> : ''}
            {isRequired ? '' : <span className='required' />}
            <Select
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                options={option}
                noOptionsMessage={() => getFormattedMessage('no-option.label')}
            />
            {errors ? <span className='text-danger d-block fw-400 fs-small mt-2'>{errors ? errors : null}</span> : null}
        </Form.Group>
    )
};
export default ReactSelect;
