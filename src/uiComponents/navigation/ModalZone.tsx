import React from "react";
import { Modal } from "../layout/Modal"
import { on } from "events";

const ModalZone = ({ modalComponent, modalProps, title,
	className = "flex flex-col w-full justify-start items-center",
	children }:
	{ modalComponent: any, modalProps: Record<string, unknown>, title?: string, className?: string, children?: React.ReactNode }) => {
	const [showModal, setShowModal] = React.useState(false);

	const ModalComponent = modalComponent

	return (
		<>
			<div className={className}
				onClick={() => setShowModal(true)}>{children}</div >
			{showModal && <Modal title={title} closeModal={() => setShowModal(false)}>
				{ModalComponent && <ModalComponent {...modalProps} closeModal={() => setShowModal(false)} />}
			</Modal>
			}
		</>
	)
}

export { ModalZone };



