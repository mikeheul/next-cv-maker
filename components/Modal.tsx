import { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                {/* Close button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-white text-xl"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;