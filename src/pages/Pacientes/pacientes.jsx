import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer.jsx";
import { useForm } from "../../hooks/useForm.js";
import Cookies from "js-cookie";
import { triggerBase64Download } from "react-base64-downloader";
import toast from "react-hot-toast";

function App() {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [userName, setUserName] = useState("");

  const { dui, onInputChange, onResetForm } = useForm({
    dui: "",
  });

  const onSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const resp = await fetch(`https://backendweb-pzlb.onrender.com/files/${dui}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();

      if (data?.error) {
        toast.error(data?.error);
        setFiles([]);
        setUserName("");
      } else {
        toast.success(data?.message);
        setFiles(data?.files);
        setUserName(data?.user.name);
        onResetForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center">
        {loading ? (
          <p>...Loading</p>
        ) : files.length < 1 ? (
          <div className="bg-white border rounded p-8 shadow-md max-w-md">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-black-500">
                Ingresa clave del paciente
              </p>
            </div>
            <form onSubmit={onSearchSubmit}>
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
                type="text"
                name="dui"
                required
                value={dui}
                onInput={onInputChange}
                placeholder="Id del paciente"
              />
              <div className="flex items-center justify-center">
                <button
                  className="mt-4 bg-yellow-400 hover:bg-yellow-400 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h5>Nombre de Paciente: { userName }</h5>
              <br/>
              <button
                onClick={() => setFiles([])}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mb-4"
              >
                Buscar otro
              </button>
              <div className="grid grid-cols-3 gap-4">
                {files.map(({ _id, name, data }) => (
                  <div
                    className="max-w-xs bg-white rounded overflow-hidden shadow-lg m-4"
                    key={_id}
                  >
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{name}</div>
                    </div>
                    <div className="px-6 py-4">
                      <button
                        onClick={() => triggerBase64Download(data, name)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                      >
                        Descargar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
