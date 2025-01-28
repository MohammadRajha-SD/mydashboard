import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const ReactDatePicker = (props) => {
    const { onChangeDate, newStartDate, readOnlyref } = props;
    const [startDate, setStartDate] = useState(new Date());

    const handleCallback = (date) => {
        setStartDate(date);
        onChangeDate(date);
    };

    useEffect(() => {
        setStartDate(startDate);
    }, [startDate]);

    const onDatepickerRef = (el, readOnlyref) => {
        if (el && el.input) {
            el.input.readOnly = readOnlyref !== undefined ? readOnlyref : true;
        }
    };

    const format = (format = 'd-m-y') => {
        if (format === "d-m-y") {
            return "dd-MM-yyyy";
        } else if (format === "m-d-y") {
            return "MM-dd-yyyy";
        } else if (format === "y-m-d") {
            return "yyyy-MM-dd";
        } else if (format === "m/d/y") {
            return "MM/dd/yyyy";
        } else if (format === "d/m/y") {
            return "dd/MM/yyyy";
        } else if (format === "y/m/d") {
            return "yyyy/MM/dd";
        } else if (format === "m.d.y") {
            return "MM.dd.yyyy";
        } else if (format === "d.m.y") {
            return "dd.MM.yyyy";
        } else if (format === "y.m.d") {
            return "yyyy.MM.dd";
        } else "yyyy-mm-dd";
    };

    return (
        <div className="position-relative datepicker p-0">
            <DatePicker
                wrapperClassName="w-100"
                locale={"en"}
                className="datepicker__custom-datepicker px-4"
                name="date"
                selected={
                    newStartDate === null
                        ? new Date()
                        : newStartDate
                        ? newStartDate
                        : startDate
                }
                dateFormat={format()}
                onChange={(date) => handleCallback(date)}
                maxDate={new Date()}
                ref={(el) => onDatepickerRef(el, readOnlyref)}
            />
            <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
        </div>
    );
};

export default ReactDatePicker;
