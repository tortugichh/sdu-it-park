import FormThirdPage from "../../components/form-components/FormThirdPage";
import Stages from "../../components/form-components/Stages";

function FirstPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="font-poppins font-extrabold text-xl sm:text-2xl md:text-3xl bg-white flex w-full h-auto min-h-[60px] p-4 sm:p-6 md:px-12 items-center justify-center">
        SDU IT PARK
      </header>

      {/* Main Content Container */}
      <div className="flex flex-col md:flex-row w-full flex-grow px-4 sm:px-8 gap-6">
       

        <Stages steps={["About you", "Your project", "Files"]} activeStep={3} /> 
        <FormThirdPage title="Files" placeholders={["Description"]} allowFileUpload={true}/>

      </div>

      {/* Footer */}
      <footer className="font-poppins font-extrabold text-xl sm:text-2xl bg-black text-white flex w-full h-auto min-h-[60px] p-4 sm:p-6 items-center justify-center">
        SDU IT PARK
      </footer>
    </div>
  );
}

export default FirstPage;
