/* eslint-disable react/prop-types */
import { HiX } from "react-icons/hi";


export default function Modal({children}) {
    const closeModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add("hide"); 
    }

    return (
        <div id="modal-container" className="hide">
            <div className="fade w-screen bg-black opacity-40 z-10 absolute top-0 left-0 h-screen overflow-hidden flex items-center justify-center flex-col"></div>
            <div className="modal absolute top-28 left-0 right-0 mx-auto w-full max-w-96 z-50 pt-16 px-12 pb-8 bg-gray-100 rounded-md ">
                <HiX onClick={closeModal} className="absolute top-3 right-3 cursor-pointer" />
                {children}
            </div>
        </div>
    )
}