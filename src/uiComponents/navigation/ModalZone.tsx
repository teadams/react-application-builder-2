import React from "react";
import { Modal } from "../layout/Modal"
import { on } from "events";

const ModalZone = ({ modalComponent, modalProps, title, children }:
	{ modalComponent: any, modalProps: Record<string, unknown>, title?: string, children?: React.ReactNode }) => {
	const [showModal, setShowModal] = React.useState(false);

	const ModalComponent = modalComponent

	return (
		<>
			<div onClick={() => setShowModal(true)}>{children}</div>
			{showModal && <Modal title={title} closeModal={() => setShowModal(false)}>
				{ModalComponent && <ModalComponent {...modalProps} closeModal={() => setShowModal(false)} />}
			</Modal>}
		</>
	)
}

export { ModalZone };



