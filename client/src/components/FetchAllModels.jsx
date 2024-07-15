import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSharedState } from "../SharedContext";

const FetchAllModels = () => {
  const [models, setModels] = useState([]);
  const { uploadFinished, setUploadFinished } = useSharedState();

  const fetchModels = async () => {
    try {
      const response = await axiosInstance.get("users/list-models/");
      setModels(response.data);
    } catch (error) {
      console.error("Failed to fetch models", error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (uploadFinished) {
      fetchModels();
      setUploadFinished(false); // Reset the uploadFinished state after fetching models
    }
  }, [uploadFinished, setUploadFinished]);

  const handleDelete = async (modelId) => {
    try {
      await axiosInstance.delete(`users/delete-model/${modelId}/`);
      setModels(models.filter((model) => model.id !== modelId));
    } catch (error) {
      console.error("Failed to delete model", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-2 text-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Your 3D Models</h2>
      <div className="3D-card-container flex flex-wrap justify-center py-4 gap-10">
        {models.map((model) => (
          <div key={model.id} className="card flex flex-col items-center max-w-[10rem] border rounded-lg p-4">
            <a href={model.file_url} target="_blank" rel="noopener noreferrer">
              <img src="./3dmodel.png" alt="3D Model" className="w-[4rem] h-auto" />
            </a>
            <div className="mt-2">{model.name}</div>
            <button className="btn btn-red mt-2 text-xs" onClick={() => handleDelete(model.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchAllModels;
