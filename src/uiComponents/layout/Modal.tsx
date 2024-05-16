import React from "react";
import Image from "next/image";
import ModalCross from "../../icons/ModalCross.svg";

const Background = ({ className = "opacity-25 fixed inset-0 z-40 bg-[#18264C] bg-opacity-25" }:
	{ className?: string }) => {
	return (<div className={className}></div>)
}

const Header = ({ title,
	className = "flex items-center justify-between  rounded-t md:text-base sm:text-base text-base lg:text-lg font-family-besley text-[#18264C] font-semibold",
	closeModal }:
	{
		title?: string, className?: string,
		closeModal?: () => void
	}) => {
	return (<div className={className}>
		<div>{title}</div>
		<Image onClick={() => closeModal && closeModal()}
			src={ModalCross}
			alt="ModalCross"
			className="cursor-pointer "
		/>
	</div >)
}

const Modal = ({ children,
	key = "modal",
	title = "text",
	backgroundClassName,
	closeModal
}: {
	children?: React.ReactNode,
	key?: string,
	title?: string,
	backgroundClassName?: string
	closeModal?: () => void
}) => {


	// <div className="p-7 border-0 rounded-md shadow-lg relative flex flex-col w-full 
	// bg-white outline-none focus:outline-none">


	return (
		<>	{/*Background cover*/}
			<div key={key} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed 
					inset-0 z-[10000] outline-none focus:outline-none">
				{/*size of Modal lg:max-w-[52rem] is key attribute/*/}
				<div className=" relative lg:w-3/4 md:w-11/12 sm:w-11/12 w-11/12 mx-auto my-auto 
					lg:max-w-[52rem]  h-[90vh]">
					{/*content*/}
					<div className="p-7 h-full w-full border-0 rounded-lg shadow-lg 
						relative flex flex-col  bg-white outline-none focus:outline-none">
						<Header title={title} closeModal={closeModal} />
						<div className="flex flex-col gap-y-4 mt-8 pl-2">
							{children}
						</div>
					</div>
				</div>
			</div>

			<Background className={backgroundClassName} />
		</>

	)
}

export { Modal };

{/* <div
	className="text-black fixed inset-0 z-[200] overflow-y-auto"
	style={{
		backgroundImage: 'url("../../../images/login-background-new.png")',
		backgroundSize: "cover",
	}}
>
	<Authenticate
		closeModal={() => setShowLoginModal(false)}
		loginCallback={handleLogin}
		setDataRefresh={setDataRefresh}
		dataRefresh={dataRefresh}
	/>
</div> */}




