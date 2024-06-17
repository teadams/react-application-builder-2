import React from "react";
import moment from "moment";
import Datepicker, { DateType } from "react-tailwindcss-datepicker";
import { Select } from ".";


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
	value?: Date | undefined;
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
	const dateValue = value ? moment(value).format("YYYY-MM-DD") : undefined;
	const timeValue = value ? moment(value).format("h:mm A") : undefined;
	const hourValue = value ? moment(value).format("h") : undefined;
	const minValue = value ? moment(value).format("mm") : undefined;
	const ampmValue = value ? moment(value).format("A") : undefined;

	console.log("time values is " + timeValue)


	const hourOptions = [{ value: "hr" as number | string, id: "" as number | string }]
	for (let i = 1; i <= 12; i++) {
		hourOptions.push({ value: i, id: i });
	}

	const minOptions = [{ value: "min" as number | string, id: "" as number | string }]
	minOptions.push({ value: "00", id: "00" });
	minOptions.push({ value: "15", id: "15" });
	minOptions.push({ value: "30", id: "30" });
	minOptions.push({ value: "45", id: "45" });

	const ampmOptions = []
	ampmOptions.push({ value: "AM", id: "AM" });
	ampmOptions.push({ value: "PM", id: "PM" });



	const options = [{ value: "-- select time --", id: "" }]
	for (let i = 0; i < 24; i++) {
		const hour = i > 12 ? i - 12 : i;
		const AMorPM = i < 12 ? "AM" : "PM";
		options.push({ value: hour + ":00 " + AMorPM, id: hour + ":00 " + AMorPM });
		options.push({ value: hour + ":15 " + AMorPM, id: hour + ":15 " + AMorPM });
		options.push({ value: hour + ":30 " + AMorPM, id: hour + ":30 " + AMorPM });
		options.push({ value: hour + ":45 " + AMorPM, id: hour + ":45 " + AMorPM });
	}



	const handleDateChange = (newDate: any) => {
		newDate = newDate?.startDate
		const foo = hourValue ?? "9"
		const newDateTime = new Date(newDate + " " + (hourValue ?? "9") + ":" + (minValue ?? "00") + " " + (ampmValue ?? "AM"));
		onChange && onChange({ target: { value: newDateTime } });
		onBlur && onBlur({ target: { value: newDateTime } }, true);

	}

	const handleHourChange = (e: any) => {
		const newHour = e.target.value
		const newDateTime = new Date((dateValue ?? moment(new Date()).format("YYYY-MM-DD")) + " " + newHour + ":" + (minValue ?? "00") + " " + (ampmValue ?? "AM"));
		onChange && onChange({ target: { value: newDateTime } });
		onBlur && onBlur({ target: { value: newDateTime } }, true);
	}

	const handleMinChange = (e: any) => {
		const newMin = e.target.value
		const newDateTime = new Date((dateValue ?? moment(new Date()).format("YYYY-MM-DD")) + " " + (hourValue ?? "9") + ":" + newMin + " " + (ampmValue ?? "AM"));
		onChange && onChange({ target: { value: newDateTime } });
		onBlur && onBlur({ target: { value: newDateTime } }, true);
	}


	const handleAmPmChange = (e: any) => {
		const newAmPm = e.target.value
		const newDateTime = new Date((dateValue ?? moment(new Date()).format("YYYY-MM-DD")) + " " + (hourValue ?? "9") + ":" + (minValue ?? "00") + " " + newAmPm);
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
		return <>{moment(value).format("dddd, MMMM Do YYYY, h:mm a")
		}</>
	} else {
		return (
			<div className="flex flex-row justify-start items-start">
				<div className="w-[200px] mr-2">
					<Datepicker value={{ startDate: dateValue as DateType, endDate: dateValue as DateType }} asSingle={true} useRange={false} onChange={handleDateChange}

						inputClassName={`w-[200px] ${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`}
					/>
				</div>
				{/* 
				<input type="date" autoFocus={autoFocus}
					onChange={handleDateChange}
					value={dateValue}
					className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass}`} /> */}
				<div className="flex flex-row justify-start items-center">
					<div className="mr-2">
						<Select
							onChange={handleHourChange}
							value={hourValue}
							width="w-[100px]"
							mode={mode} options={hourOptions} className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass} `} />
					</div>

					<div className="flex flex-row items-center mr-5">
						: <Select
							onChange={handleMinChange}
							value={minValue}
							width="w-[100px]"
							mode={mode} options={minOptions} className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass} ml-2`} />
					</div>

					<div className="mr-5">
						<Select
							onChange={handleAmPmChange}
							value={ampmValue}
							width="w-[75 px]"
							mode={mode} options={ampmOptions} className={`${className} ${fontSizeClass} ${textColorClass} ${fontWeightClass} `} />
					</div>
				</div>
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
