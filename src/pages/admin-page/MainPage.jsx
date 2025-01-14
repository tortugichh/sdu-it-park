import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/admin-components/Card";

const cardData = [
    { id: 1, name: "SDU SurvivalKit", status: "Новые", budget: 100, uploadTime: "8:00", date: "12-02-2025", user: "Bekarys" },
    { id: 2, name: "StuddyBuddy", status: "Принятые", budget: 200, uploadTime: "9:00", date: "12-02-2025", user: "Daniyar" },
    { id: 3, name: "AY Market", status: "Отклоненные", budget: 150, uploadTime: "10:00", date: "12-02-2025", user: "Aaa222" },
    { id: 4, name: "SDU", status: "Отклоненные", budget: 120, uploadTime: "11:00", date: "12-02-2025", user: "user228" },
];

function MainPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(cardData);
    const [allData, setAllData] = useState(cardData);
    const [filter, setFilter] = useState("");

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = allData.filter((card) =>
            card.name.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);

        if (selectedFilter) {
            const filtered = allData.filter((card) => {
                if (selectedFilter === "Новые" || selectedFilter === "Принятые" || selectedFilter === "Отклоненные") {
                    return card.status === selectedFilter;
                }
                if (selectedFilter === "Бюджет > 150") {
                    return card.budget > 150;
                }
                if (selectedFilter === "Утренние загрузки") {
                    return card.uploadTime <= "12:00";
                }
                return true;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(allData);
        }
    };

    const updateCardStatus = (id, newStatus) => {
        const updatedData = allData.map((card) => {
            if (card.id === id) {
                return { ...card, status: newStatus };
            }
            return card;
        });
        setAllData(updatedData);
        setFilteredData(updatedData.filter((card) => card.name.toLowerCase().includes(searchQuery)));
    };

    const renderCards = (status) => {
        const cards = filteredData.filter((card) => card.status === status);

        if (cards.length === 0 && searchQuery) {
            return <p className="text-gray-500 font-poppins text-center w-full">Ничего не найдено</p>;
        }

        return cards.map((card) => (
            <Card
                key={card.id}
                card={card}
                updateCardStatus={updateCardStatus}
            />
        ));
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="font-poppins font-extrabold text-xl sm:text-2xl md:text-3xl bg-white flex w-full h-auto min-h-[60px] p-4 sm:p-6 md:px-12 items-center justify-center">
                SDU IT PARK
            </header>

            {/* Main container */}
            <div className="flex flex-col flex-grow w-full p-8 overflow-y-auto">
                {/* Top content */}
                <div className="flex flex-col gap-5 sm:flex-row justify-between w-full h-auto sm:h-20 p-4">
                    {/* Title */}
                    <div className="flex justify-center sm:basis-1/4 items-center">
                        <p className="font-poppins font-semibold text-xl sm:text-2xl md:text-3xl text-center">
                            Оставленные заявки
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex justify-center sm:basis-1/2 items-center">
                        <div className="relative w-4/5 sm:w-full rounded-lg">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Введите название заявки"
                                className="w-full h-10 pl-4 pr-10 rounded-lg bg-white"
                            />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 bg-white"
                            />
                        </div>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="flex justify-center sm:basis-1/4 items-center gap-4">
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="bg-white rounded-md h-10 text-md sm:w-36 px-2"
                        >
                            <option value="">Все</option>
                            <option value="Новые">Новые</option>
                            <option value="Принятые">Принятые</option>
                            <option value="Отклоненные">Отклоненные</option>
                            <option value="Бюджет > 150">Бюджет > 150</option>
                            <option value="Утренние загрузки">Утренние загрузки</option>
                        </select>
                    </div>
                </div>


                {/* Body content */}
                <div className="h-screen mt-4 rounded-lg p-6 flex flex-col sm:flex-row justify-between gap-4 sm:gap-8">
                    {/* "Новые" Section */}
                    <div className="h-full w-full sm:w-2/6 flex flex-col items-start justify-start p-5 gap-3">
                        <div className="flex w-full bg-transparent">
                            <label className="bg-blue-300 font-poppins text-xl rounded-sm">Новые</label>
                        </div>
                        {renderCards("Новые")}
                    </div>

                    {/* "Принятые" Section */}
                    <div className="h-full w-full sm:w-2/6 flex flex-col items-start justify-start p-5 gap-3">
                        <div className="flex w-full bg-transparent">
                            <label className="bg-green-400 font-poppins text-xl rounded-sm">Принятые</label>
                        </div>
                        {renderCards("Принятые")}
                    </div>

                    {/* "Отклоненные" Section */}
                    <div className="h-full w-full sm:w-2/6 flex flex-col items-start justify-start p-5 gap-3">
                        <div className="flex w-full bg-transparent">
                            <label className="bg-red-400 font-poppins text-xl rounded-sm">Отклоненные</label>
                        </div>
                        {renderCards("Отклоненные")}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="font-poppins font-extrabold text-xl sm:text-2xl bg-black text-white flex w-full h-auto min-h-[60px] p-4 sm:p-6 items-center justify-center">
                SDU IT PARK
            </footer>
        </div>
    );
}

export default MainPage;
