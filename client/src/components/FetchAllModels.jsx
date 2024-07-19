import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSharedState } from "../SharedContext";

const FetchAllModels = () => {
  const [models, setModels] = useState([]);
  const { uploadFinished, setUploadFinished } = useSharedState();

  const fetchModels = async () => {
    try {
      const response = await axiosInstance.get("users/list-models/");
      if (Array.isArray(response.data)) {
        setModels(response.data);
      } else {
        setModels([]);
      }
    } catch (error) {
      console.error("An error has occurred");
      setModels([]);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (uploadFinished) {
      fetchModels();
      setUploadFinished(false);
    }
  }, [uploadFinished, setUploadFinished]);

  const handleDelete = async (modelId) => {
    try {
      await axiosInstance.delete(`users/delete-model/${modelId}/`);
      setModels(models.filter((model) => model.id !== modelId));
    } catch (error) {
      console.error("Failed to delete model");
    }
  };

  return (
    <div className="3D-card-container flex flex-wrap justify-center py-4 gap-10">
      {Array.isArray(models) && models.length > 0 ? (
        models.map((model) => (
          <div
            key={model.id}
            className="max-w-[10rem] w-[10rem] border rounded-lg p-4 flex flex-col mb-4"
          >
            <a href={model.file_url} target="_blank" rel="noopener noreferrer">
              <img
                src="./cube-logo.png"
                alt="3D Model"
                className="w-[4rem] h-auto mx-auto"
              />
            </a>
            <div className="mt-2 text-sm flex-grow mx-auto mb-3">
              {model.name.length > 15 ? (
                <span className="break-words">
                  {model.name.slice(0, 15)}
                  <br />
                  {model.name.slice(15, 30)}
                  {model.name.length > 30 ? "..." : ""}
                </span>
              ) : (
                model.name
              )}
            </div>
            <button
              className="btn btn-red mt-2 text-xs"
              onClick={() => handleDelete(model.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No models available.</p>
      )}
    </div>
  );
};

export default FetchAllModels;
