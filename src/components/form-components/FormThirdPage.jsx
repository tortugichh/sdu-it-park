import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormThirdPage({ title, placeholders, allowFileUpload, maxFileSizeMB }) {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const navigate = useNavigate();

  const MAX_TOTAL_FILE_SIZE_MB = maxFileSizeMB || 50; // Default limit: 50 MB
  const MAX_TOTAL_FILE_SIZE_BYTES = MAX_TOTAL_FILE_SIZE_MB * 1024 * 1024;

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Calculate the total size of already uploaded files
    const currentTotalSize = uploadedFiles.reduce(
      (total, file) => total + file.size,
      0
    );

    // Filter files to only include those that fit within the remaining size limit
    const validFiles = [];
    let accumulatedSize = currentTotalSize;

    for (const file of files) {
      if (accumulatedSize + file.size <= MAX_TOTAL_FILE_SIZE_BYTES) {
        validFiles.push(file);
        accumulatedSize += file.size;
      } else {
        alert(`File "${file.name}" exceeds the total upload size limit.`);
        break;
      }
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);

      // Generate previews if the files are images
      const newPreviews = validFiles.map((file) =>
        file.type.startsWith("image/") ? URL.createObjectURL(file) : null
      );
      setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
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
    });

    if (allowFileUpload && uploadedFiles.length === 0) {
      errors.files = "At least one file must be uploaded";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formValues, uploadedFiles);

      try {
        // Replace with your API endpoint
        const response = await fetch("/api/submit-form", {
          method: "POST",
          body: JSON.stringify({
            ...formValues,
            files: uploadedFiles,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Data successfully sent to the backend.");
        } else {
          console.error("Failed to submit the form.");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    } else {
      console.log("Validation errors:", formErrors);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-4 sm:p-6">
      <div className="flex flex-col w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 h-auto border-2 p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        <header className="font-poppins text-xl sm:text-2xl md:text-3xl font-semibold text-black bg-white mb-4">
          {title}
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white">
          {placeholders.map((placeholder, index) => (
            <div key={index} className="flex flex-col">
              <textarea
                placeholder={placeholder}
                value={formValues[index] || ""}
                onChange={(e) => handleInputChange(e, index)}
                rows="4"
                className={`border rounded-md p-3 sm:p-4 text-gray-700 focus:outline-none focus:ring-2 ${
                  formErrors[index]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              ></textarea>
              {formErrors[index] && (
                <span className="text-red-500 text-sm mt-1 bg-white">{formErrors[index]}</span>
              )}
            </div>
          ))}

          {allowFileUpload && (
            <div className="flex flex-col bg-white">
              <label className="block text-sm font-medium text-gray-700 mb-2 bg-white">Upload your files</label>
              <div className="flex items-center bg-white">
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

              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <ul className="text-sm text-gray-700 bg-white">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex justify-between items-center bg-white">
                        {file.name}
                        <span className="ml-4 text-xs text-gray-500 bg-white">
                          ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={handleClearFiles}
                >
                  Clear Files
                </button>
              )}

              <div className="mt-2 text-sm text-gray-600 bg-white">
                {`Total uploaded size: ${(uploadedFiles.reduce((total, file) => total + file.size, 0) / (1024 * 1024)).toFixed(2)} MB of ${MAX_TOTAL_FILE_SIZE_MB} MB`}
              </div>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormThirdPage;
