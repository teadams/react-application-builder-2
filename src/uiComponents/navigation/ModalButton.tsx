import React from "react";
import { Modal } from "../layout/Modal"

const ModalButton = ({ button, title, children }:
	{ button: () => React.JSX.Element, title?: string, children?: React.ReactNode }) => {
	const [showModal, setShowModal] = React.useState(false);

	const Button = button
	return (
		<>
			<div onClick={() => setShowModal(true)}><Button /></div>
			{showModal && <Modal title={title} closeModal={() => setShowModal(false)}>
				{children}
			</Modal>}
		</>
	)
}

export { ModalButton };



