function MainPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="font-poppins font-extrabold text-xl sm:text-2xl md:text-3xl bg-white flex w-full h-auto min-h-[60px] p-4 sm:p-6 md:px-12 items-center justify-center">
                SDU IT PARK
            </header>

            {/*Main container*/}
            <div className="flex flex-column h-screen w-full p-8"> 
                {/* Top content */}
                <div className="flex justify-around w-full h-20 bg-green-300">
                    <div className="basis-1/4 font-poppins font-semibold text-xl sm:text-2xl bg-green-700 flex items-center">Оставленные заявки</div>

                    <div className="basis-1/2 bg-white flex items-center justify-center">
                        <input type="text" placeholder="Введите название заявки" className="w-4/5 h-10 rounded-md"></input>
                    </div>

                    <div className="basis-1/4 bg-blue-900 flex items-center">
                        {/* <button className="bg-white">Фильтр</button> */}
                    </div>
                </div>

                {/* Body content */}
                <div></div>
            </div>


            {/* Footer */}
            <footer className="font-poppins font-extrabold text-xl sm:text-2xl bg-black text-white flex w-full h-auto min-h-[60px] p-4 sm:p-6 items-center justify-center">
                SDU IT PARK
            </footer>
        </div>
    );
}

export default MainPage;