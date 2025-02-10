import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose} // Ferme la modale en cliquant sur le fond
                >
                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique à l'intérieur
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-white text-xl"
                        >
                            &times;
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
