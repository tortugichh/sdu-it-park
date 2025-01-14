import React, { useState } from 'react';
import Modal from './Modal';

function Card() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const project = {
        name: 'SDU SurvivalKit',
        uploadTime: '8:00',
        budget: '100',
        date: '12-02-2025',
        user: 'Daniyar'
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAccept = () => {
        console.log(`Project ${project.name} accepted`);
        setIsModalOpen(false);
    };

    const handleReject = () => {
        console.log(`Project ${project.name} rejected`);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white rounded-lg p-4 w-full cursor-pointer" onClick={openModal}>
            <h3 className="text-2xl bg-white font-bold text-gray-800">{project.name}</h3>
            <p className="text-xl text-gray-600 bg-white">Время загрузки: {project.uploadTime}</p>
            <p className="text-xl text-gray-600 bg-white">Бюджет: {project.budget}</p>
            <p className="text-xl text-gray-600 bg-white">Дата: {project.date}</p>
            <p className="text-xl text-gray-600 bg-white">Пользователь: {project.user}</p>

            {/* Modal that shows detailed information */}
            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                    project={project}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}
        </div>
    );
}

export default Card;
