// src/components/forms/ImageUpload.tsx

import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import "./ImageUpload.css";

const ImageUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload-container" onClick={handleClick}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      <div className="upload-content">
        <FaUpload className="upload-icon" />
        <span className="upload-text">{fileName || "Carregar imagem"}</span>
        <p className="upload-description">
          Clique para selecionar uma imagem (JPG, PNG ou GIF)
        </p>
        <button type="button" className="upload-button">
          Carregar
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
