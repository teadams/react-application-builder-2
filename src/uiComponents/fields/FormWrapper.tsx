import React from "react";
import { usePropState } from "../../hooks";


const FormWrapper = ({ children, isForm, mode = "edit", onSubmit }: any) => {
	if (isForm && mode === "edit") {
		return <form className="w-full" onSubmit={onSubmit}>{children}</form>
	} else {
		return <>{children}</>
	}
}

export { FormWrapper }