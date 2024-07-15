import React, { useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSharedState } from "../SharedContext";

const UploadModels = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const { setUploadFinished } = useSharedState();
  const fileInputRef = useRef(null); // Add a ref to the file input

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", selectedFile.name);

      try {
        await axiosInstance.post("users/upload-model/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUploadStatus("Upload successful");
        setUploadFinished(true);

        // Clear the file input and reset state
        setSelectedFile(null);
        fileInputRef.current.value = ""; // Clear the file input

        // Log the state after a delay to ensure it's updated
        setTimeout(() => {
          console.log("uploadFinished after update:", true);
        }, 1000);
      } catch (error) {
        console.error("File upload error:", error);
        setUploadStatus("Upload failed");
      }
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
              ref={fileInputRef} // Attach the ref to the file input
            />

            <button className="btn btn-blue my-2">Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModels;
