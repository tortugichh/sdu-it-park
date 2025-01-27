import React, { useEffect } from 'react';

function Modal({ onClose, project, onAccept, onReject }) {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                onClose(); 
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 modal-overlay shadow-md">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
                >
                    &#10005;
                </button>
                <h2 className="text-3xl font-bold bg-white">{project.name}</h2>
                <p className="text-xl font-semibold mt-4 bg-white">Время загрузки: <span className="bg-white font-normal">{project.uploadTime}</span></p>
                <p className="text-xl font-semibold mt-2 bg-white">Бюджет: <span className="bg-white font-normal">{project.budget}</span></p>
                <p className="text-xl font-semibold mt-2 bg-white">Дата: <span className="bg-white font-normal">{project.date}</span></p>
                <p className="text-xl font-semibold mt-2 bg-white">Пользователь: <span className="bg-white font-normal">{project.user}</span></p>

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
