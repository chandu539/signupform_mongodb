import React, { useState } from "react";
import "./Media.css";

const Media = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a valid image file (PNG, JPG, or JPEG).");
      e.target.value = ""; 
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "signupform");
    formData.append("cloud_name", "dnnhe6lea");

    const res = await fetch("https://api.cloudinary.com/v1_1/dnnhe6lea/image/upload", {
      method: "POST",
      body: formData,
    });

    const uploadedImage = await res.json();
    setUploadedImageUrl(uploadedImage.url); 
  };

  return (
    <div className="media-container">
      <h2>Upload Media</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedImageUrl && (
        <div className="uploaded-image">
          <h3>Uploaded Image:</h3>
          <img src={uploadedImageUrl} alt="Uploaded" style={{ width: "300px", height: "auto" }} />
        </div>
      )}
    </div>
  );
};

export default Media;
