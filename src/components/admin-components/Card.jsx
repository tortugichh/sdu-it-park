import React, { useState } from "react";
import Modal from "./Modal"; 

function Card({ card, updateCardStatus }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAccept = () => {
        updateCardStatus(card.id, "Принятые");
        setIsModalOpen(false);
    };

    const handleReject = () => {
        updateCardStatus(card.id, "Отклоненные");
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white rounded-xl p-4 w-full cursor-pointer shadow-md" onClick={openModal}>
            <h3 className="text-2xl bg-white font-bold text-gray-800">{card.name}</h3>
            <p className="text-xl font-semibold text-gray-600 bg-white">Время загрузки: <span className="bg-white font-normal">{card.uploadTime}</span></p>
            <p className="text-xl font-semibold text-gray-600 bg-white">Бюджет: <span className="bg-white font-normal">{card.budget}</span></p>
            <p className="text-xl font-semibold text-gray-600 bg-white">Дата: <span className="bg-white font-normal">{card.date}</span></p>
            <p className="text-xl font-semibold text-gray-600 bg-white">Пользователь: <span className="bg-white font-normal">{card.user}</span></p>

            {/* Modal that shows detailed information */}
            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                    project={card}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}
        </div>
    );
}

export default Card;
