import React from "react";
import moment from "moment";
import { Select } from ".";
import { usePropState } from "../../hooks";


const DateTime = ({
	data = {},
	mode = "view",
	index = 0,
	onBlur,
	onChange,
	value, // need to default to "" or react will complain about controlled/uncontrolled input
	isForm = false,
	className,
	fontSizeClass,
	textColorClass,
	fontWeightClass,
}: {
	data?: Record<string, unknown>;
	mode: string;
	index?: number;
	value?: Date;
	isForm?: boolean;
	onBlur?: (e: unknown, mutatedValue: unknown) => void;
	onChange?: (e: unknown) => void;
	className?: string
	fontWeightClass?: string;
	textColorClass?: string;
	fontSizeClass?: string;
}) => {

	const autoFocus = index === 0;
	console.log("DATE VALUE ", value)
	const dateValue = value ? moment(value).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
	const timeValue = value ? moment(value).format("h:mm A") : "9:00 AM";
	console.log("time values is " + timeValue)



	const options = []
	for (let i = 0; i < 24; i++) {
		const hour = i > 12 ? i - 12 : i;
		const AMorPM = i < 12 ? "AM" : "PM";
		options.push({ value: hour + ":00 " + AMorPM, id: hour + ":00 " + AMorPM });
		options.push({ value: hour + ":15 " + AMorPM, id: hour + ":15 " + AMorPM });
		options.push({ value: hour + ":30 " + AMorPM, id: hour + ":30 " + AMorPM });
		options.push({ value: hour + ":45 " + AMorPM, id: hour + ":45 " + AMorPM });
	}

	const handleDateChange = (e: any) => {
		const newDate = e.target.value
		console.log("new date is " + newDate)
		console.log("time value is " + timeValue)
		const newDateTime = new Date(newDate + " " + timeValue);
		onChange && onChange({ target: { value: newDateTime } });
		onBlur && onBlur({ target: { value: newDateTime } }, true);

	}

	const handleTimeChange = (e: any) => {
		const newTime = e.target.value
		console.log("new time is " + newTime)
		const newDateTime = new Date(dateValue + " " + newTime);
		console.log("new date time " + newDateTime)
		onChange && onChange({ target: { value: newDateTime } });
		onBlur && onBlur({ target: { value: newDateTime } }, true);
	}

	if (mode === "view") {
		return <>{moment(value).format("M-DD")}  at {moment(value).format("h:mm a")
		}</>
	} else {
		return (
			<div className="flex flex-row">
				<input type="date" autoFocus={autoFocus}
					onChange={handleDateChange}
					value={dateValue}
					className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />
				<Select
					onChange={handleTimeChange}
					value={timeValue}
					mode={mode} options={options} className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} />

			</div>
		)
	}
}

{/* <input type="datetime-local" autoFocus={autoFocus} value={value}
onChange={(e) => {
	setTouched(true);
	setValue(e.target.value as string)
}}
onBlur={handleOnBlur}
className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} /> */}

export { DateTime };
