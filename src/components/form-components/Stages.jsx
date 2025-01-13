function Stages({ steps, activeStep }) {
    return (
      <div className="border-2 w-full sm:w-3/4 md:w-1/2 flex flex-col items-center p-6">
        <header className="font-poppins text-3xl font-semibold border-2 p-2">
          SDU IT PARK Apply
        </header>
  
        <p className="font-sans text-lg sm:text-xl mt-4 text-center">
          Пройдите следующие этапы, чтобы оставить заявку:
        </p>
  
        {/* Circles container */}
        <div className="mt-6 flex flex-col gap-6">
          {steps.map((step, index) => (
            <div className="flex items-center space-x-4" key={index}>
              {/* Circle */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl ${
                  activeStep === index + 1
                    ? "bg-blue-500" // Active circle
                    : "bg-gray-400" // Inactive circles
                }`}
              >
                {index + 1}
              </div>
              {/* Step Description */}
              <div className="text-lg sm:text-xl font-sans">{step}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Stages;
  