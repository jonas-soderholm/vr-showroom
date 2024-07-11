import React, { useState } from "react";

const UploadModels = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Handle file upload logic here
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <div className="container mx-auto px-4 py-2 text-slate-200">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload 3D Model
            </label>

            <input
              className="max-w-[20rem] block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handleFileChange}
            />

            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModels;
