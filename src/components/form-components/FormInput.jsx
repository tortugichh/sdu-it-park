import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormInput({ title, placeholders, nextPage, allowFileUpload }) {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);

    // Generate previews if the files are images
    const previews = files.map((file) =>
      file.type.startsWith("image/") ? URL.createObjectURL(file) : null
    );
    setFilePreviews(previews);
  };

  const handleClearFiles = () => {
    // Clear files and revoke object URLs to avoid memory leaks
    filePreviews.forEach((url) => URL.revokeObjectURL(url));
    setUploadedFiles([]);
    setFilePreviews([]);
  };

  const validateForm = () => {
    const errors = {};
    placeholders.forEach((placeholder, index) => {
      const value = formValues[index] || "";

      if (!value.trim()) {
        errors[index] = `${placeholder} is required`;
      }

      if (placeholder.toLowerCase().includes("email")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          errors[index] = "Invalid email address";
        }
      }

      if (placeholder.toLowerCase().includes("phone") || placeholder.toLowerCase().includes("tel")) {
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(value.trim())) {
          errors[index] = "Invalid phone number (must be 11 digits)";
        }
      }
    });

    if (allowFileUpload && uploadedFiles.length === 0) {
      errors.files = "At least one file must be uploaded";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formValues, uploadedFiles);
      navigate(nextPage);
    } else {
      console.log("Validation errors:", formErrors);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-4 sm:p-6">
      <div className="flex flex-col w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 h-auto border-2 p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <header className="font-poppins text-xl sm:text-2xl md:text-3xl font-semibold text-black bg-white mb-4">
          {title}
        </header>

        {/* Form inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white">
          {placeholders.map((placeholder, index) => (
            <div key={index} className="flex flex-col">
              <input
                type="text"
                placeholder={placeholder}
                value={formValues[index] || ""}
                onChange={(e) => handleInputChange(e, index)}
                className={`border rounded-md p-3 sm:p-4 text-gray-700 focus:outline-none focus:ring-2 ${
                  formErrors[index]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {formErrors[index] && (
                <span className="text-red-500 text-sm mt-1 bg-white">{formErrors[index]}</span>
              )}
            </div>
          ))}

          {/* File upload input */}
          {allowFileUpload && (
            <div className="flex flex-col bg-white">
              <label className="block text-sm font-medium text-gray-700 mb-2 bg-white">Upload your files</label>
              <div className="flex items-center bg-white">
                {/* Custom file input */}
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  Choose File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <span className="ml-3 text-sm text-gray-500 bg-white">
                  {uploadedFiles.length > 0
                    ? `${uploadedFiles.length} files selected`
                    : "No file chosen"}
                </span>
              </div>

              {/* List of file names */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <ul className="text-sm text-gray-700 bg-white">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex justify-between items-center">
                        {file.name}
                        <span className="ml-4 text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* File Previews (for images) */}
                  {filePreviews.some((url) => url) && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {filePreviews.map(
                        (url, index) =>
                          url && (
                            <div key={index} className="bg-white">
                              <img
                                src={url}
                                alt={`Preview ${index}`}
                                className="max-w-full max-h-32 object-cover rounded-md"
                              />
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Clear Files Button */}
              {uploadedFiles.length > 0 && (
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={handleClearFiles}
                >
                  Clear Files
                </button>
              )}
            </div>
          )}

          {/* Buttons */}
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
