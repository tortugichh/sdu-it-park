import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FormInput({ title, placeholders, nextPage, allowFileUpload }) {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();

  const BACKEND_URL = "https://crm-system-hkxd.onrender.com";

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUploadedFiles(Array.from(e.target.files));
  };

  const validateForm = () => {
    const errors = {};

    placeholders.forEach((placeholder) => {
      const fieldName = placeholder.toLowerCase().replace(/\s+/g, "_");
      const value = formValues[fieldName] || "";

      if (!value.trim()) {
        errors[fieldName] = `${placeholder} is required`;
      }

      if (placeholder.toLowerCase().includes("email")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          errors[fieldName] = "Invalid email address";
        }
      }

      if (placeholder.toLowerCase().includes("phone")) {
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(value.trim())) {
          errors[fieldName] = "Invalid phone number format";
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Validation errors:", formErrors);
      return;
    }

    // Create FormData object for multipart/form-data
    const formData = new FormData();
    
    placeholders.forEach((placeholder) => {
      const fieldName = placeholder.toLowerCase().replace(/\s+/g, "_");
      formData.append(fieldName, formValues[fieldName] || "");
    });

    // Append uploaded files if any
    uploadedFiles.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const response = await axios.post(`${BACKEND_URL}/api/projects/create/`, formData);

      console.log("Project created successfully:", response.data);
      navigate(nextPage); // Redirect on success
    } catch (error) {
      console.error("Error submitting project:", error.response?.data || error);
      setFormErrors(error.response?.data || {});
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-4 sm:p-6">
      <div className="flex flex-col w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 h-auto border-2 p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        <header className="font-poppins text-xl sm:text-2xl md:text-3xl font-semibold text-black bg-white mb-4">
          {title}
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white">
          {placeholders.map((placeholder, index) => {
            const fieldName = placeholder.toLowerCase().replace(/\s+/g, "_");

            return (
              <div key={index} className="flex flex-col">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={formValues[fieldName] || ""}
                  onChange={(e) => handleInputChange(e, fieldName)}
                  className={`border rounded-md p-3 sm:p-4 text-gray-700 focus:outline-none focus:ring-2 ${
                    formErrors[fieldName]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {formErrors[fieldName] && (
                  <span className="text-red-500 text-sm mt-1 bg-white">
                    {formErrors[fieldName]}
                  </span>
                )}
              </div>
            );
          })}

          {allowFileUpload && (
            <div className="flex flex-col bg-white">
              <label className="block text-sm font-medium text-gray-700 mb-2 bg-white">
                Upload your files
              </label>
              <input
                type="file"
                multiple
                className="border rounded-md p-3 sm:p-4 text-gray-700"
                onChange={handleFileChange}
              />
              {formErrors.files && (
                <span className="text-red-500 text-sm mt-1 bg-white">
                  {formErrors.files}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 items-center bg-white">
            <button
              type="button"
              className="border border-blue-500 text-blue-500 w-full sm:w-1/2 px-4 py-2 rounded-md hover:bg-blue-100"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full sm:w-1/2 px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormInput;
