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
        <div className="bg-white rounded-lg p-4 w-full cursor-pointer" onClick={openModal}>
            <h3 className="text-2xl bg-white font-bold text-gray-800">{card.name}</h3>
            <p className="text-xl text-gray-600 bg-white">Время загрузки: {card.uploadTime}</p>
            <p className="text-xl text-gray-600 bg-white">Бюджет: {card.budget}</p>
            <p className="text-xl text-gray-600 bg-white">Дата: {card.date}</p>
            <p className="text-xl text-gray-600 bg-white">Пользователь: {card.user}</p>

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
