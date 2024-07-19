import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSharedState } from "../SharedContext";

const MAX_UPLOADS = 6;
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_FILE_TYPE = "glb";

const UploadModels = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const { setUploadFinished } = useSharedState();
  const fileInputRef = useRef(null);
  const [modelCount, setModelCount] = useState(0); // Track the number of uploaded models

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check file type
    if (
      file &&
      file.name.split(".").pop().toLowerCase() !== ALLOWED_FILE_TYPE
    ) {
      setUploadStatus("Only .glb files are allowed at this time.");
      fileInputRef.current.value = "";
      return;
    }

    // Check file size
    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setUploadStatus(`File size should not exceed ${MAX_FILE_SIZE_MB}MB.`);
      fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
    setUploadStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (modelCount >= MAX_UPLOADS) {
      setUploadStatus(
        `You can only upload a maximum of ${MAX_UPLOADS} models.`
      );
      return;
    }

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

        // Update model count
        setModelCount((prevCount) => prevCount + 1);

        // Clear the file input and reset state
        setSelectedFile(null);
        fileInputRef.current.value = ""; // Clear the file input
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
              className="block text-center mb-2 text-cl font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload 3D Models
            </label>
            <label
              className="block text-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Test-user (Active) .glb only, max 6 models, 10MB max each
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
