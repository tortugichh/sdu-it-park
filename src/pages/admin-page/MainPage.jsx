import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/admin-components/Card";


function MainPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="font-poppins font-extrabold text-xl sm:text-2xl md:text-3xl bg-white flex w-full h-auto min-h-[60px] p-4 sm:p-6 md:px-12 items-center justify-center">
                SDU IT PARK
            </header>

            {/* Main container */}
            <div className="flex flex-col flex-grow w-full p-8 overflow-y-auto">
                {/* Top content */}
                <div className="flex justify-around w-full h-20">
                    <div className="basis-1/4  flex items-center">
                        <p className="font-poppins font-semibold text-xl sm:text-2xl md:text-3xl">Оставленные заявки</p>
                    </div>

                    <div className="basis-1/2 flex items-center justify-center">
                        <div className="relative w-4/5 rounded-lg">
                            <input
                                type="text"
                                placeholder="Введите название заявки"
                                className="w-full h-10 pl-4 pr-10 rounded-lg bg-white "
                            />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 bg-white"
                            />
                        </div>
                    </div>

                    <div className="basis-1/4 flex items-center justify-center gap-4">
                        <button className="bg-white rounded-md h-10 text-md sm: w-20">
                            Фильтр
                            <FontAwesomeIcon
                                icon={faFilter}
                                className="ml-2 text-gray-500 bg-white"
                            />
                        </button>

                    </div>
                </div>

                {/* Body content */}
                <div className="h-screen mt-4 rounded-lg p-6 flex flex-col sm:flex-row justify-between gap-4 sm:gap-8">
                    {/* "Новые" Section */}
                    <div className="h-full w-full sm:w-2/6 flex flex-col items-start justify-start p-5 gap-3">
                        <div className="flex w-full bg-transparent">
                            <label className="bg-blue-300 font-poppins text-xl rounded-sm">Новые</label>
                        </div>
                        <Card />
                        <Card />
                    </div>

                    {/* "Принятые" Section */}
                    <div className="h-full w-full sm:w-2/6 flex flex-col items-start justify-start p-5 gap-3">
                        <div className="flex w-full bg-transparent">
                            <label className="bg-green-400 font-poppins text-xl rounded-sm">Принятые</label>
                        </div>
                        <Card />
                        <Card />
                    </div>

                    {/* "Отклоненные" Section */}
                    <div className="h-full w-full sm:w-2/6 flex flex-col items-start justify-start p-5 gap-3">
                        <div className="flex w-full bg-transparent">
                            <label className="bg-red-400 font-poppins text-xl rounded-sm">Отклоненные</label>
                        </div>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
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
