import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import axios from "axios";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onUploadFile = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No se encontró un token de autorización. Por favor, inicia sesión nuevamente.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("https://backendweb-pzlb.onrender.com/api/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Archivo subido exitosamente."); // Establecer el mensaje de éxito
      setFile(null);

      setTimeout(() => setSuccessMessage(""), 3000); // Borrar el mensaje después de 3 segundos
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Ocurrió un error al subir el archivo."
      );
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <p>...Loading</p>
  ) : (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl mb-6">Document Upload</h1>
      {successMessage && (
        <p style={{ color: "green", marginBottom: "10px" }}>{successMessage}</p>
      )}
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed ${
          isDragActive ? "bg-gray-200" : "bg-gray-100"
        } text-center cursor-pointer rounded-lg mb-6`}
      >
        <input {...getInputProps()} />
        <p>
          {file
            ? file.name
            : "Arrastra y suelta tus documentos aquí, o haz clic para seleccionar archivos"}
        </p>
      </div>
      <button
        className="bg-[#84AFF5] hover:bg-[#6D9EEB] text-white font-bold py-2 px-4 rounded"
        onClick={onUploadFile}
        disabled={loading}
      >
        Guardar
      </button>
    </div>
  );
};

export default UploadPage;
