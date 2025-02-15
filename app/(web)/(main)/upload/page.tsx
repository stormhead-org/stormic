"use client";

import { useState } from "react";

export default function UploadComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Выберите файл перед загрузкой");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/media?depth=0&fallback-locale=null", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const result = await response.json();

      if (result?.doc?.url) {
        setUploadedImageUrl(result.doc.url); // URL загруженного изображения
      } else {
        throw new Error("Не удалось получить URL загруженного файла");
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {uploadedImageUrl && (
        <div>
          <p>Загруженный файл:</p>
          <img
            src={uploadedImageUrl}
            alt="Загруженный файл"
            style={{
              maxWidth: "300px",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
}
