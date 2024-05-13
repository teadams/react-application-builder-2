import React from "react";

// Returns a useState hook that updates the state based on the prop value
// If the prop value changes, the state will be updated to match the new prop value
export function usePropState(propValue:any) {
	const [value, setValue] = React.useState<any>(propValue);
	const [prevInitialValue, setPrevInitialValue] = React.useState<string>(propValue as string);
	if (prevInitialValue !== propValue) {
		setPrevInitialValue(propValue as string);
		if (propValue !== value) {
			setValue(propValue as string);
		}
	}
  return [value, setValue];
}

export default usePropState;
