import React, { useEffect } from 'react';

function Modal({ onClose, project, onAccept, onReject }) {
    // Close the modal when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                onClose(); // Call the onClose function to close the modal
            }
        };

        // Attach event listener to document
        document.addEventListener('click', handleClickOutside);

        // Cleanup listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 modal-overlay">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
                >
                    &#10005; {/* This is the "X" close button */}
                </button>
                <h2 className="text-3xl font-bold bg-white">{project.name}</h2>
                <p className="text-xl mt-4 bg-white">Время загрузки: {project.uploadTime}</p>
                <p className="text-xl mt-2 bg-white">Бюджет: {project.budget}</p>
                <p className="text-xl mt-2 bg-white">Дата: {project.date}</p>
                <p className="text-xl mt-2 bg-white">Пользователь: {project.user}</p>

                <div className="flex justify-between mt-4 bg-white">
                    <button
                        onClick={onAccept}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Принять
                    </button>
                    <button
                        onClick={onReject}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Отклонить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
