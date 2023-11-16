import { IconButton, Typography, Chip } from "@material-tailwind/react";
import { useState, useContext, useEffect } from "react";
import { MdFileDownload, MdDeleteForever } from "react-icons/md";
import BarraDeBusqueda from "../components/BarraDeBusqueda";
import { Context } from "../context/context";
import LoaderArcoiris from "../components/LoaderArcoiris";
import date from "date-and-time";
import { useNavigate } from "react-router-dom";

const Lista = () => {
  const [respuesta, setRespuesta] = useState("");

  const navigate = useNavigate();

  const {
    borrarArchivo,
    archivos,
    cargando,
    setArchivos,
    setPrimeraBusqueda,
    primeraBusqueda,
    handleDownload,
    traerUnArchivo,
  } = useContext(Context);

  useEffect(() => {
    setArchivos([]);
    setPrimeraBusqueda(true);
  }, []);

  const handleDelete = async (id) => {
    const res = await borrarArchivo(id);

    setRespuesta(res);
    setTimeout(() => {
      setRespuesta("");
    }, 2500);
  };

  const handleDetalles = async (id) => {
    await traerUnArchivo(id);
    navigate(`/archivo`);
  };

  return (
    <div className=" min-h-screen ml-auto bg-blue-gray-100 pb-10  flex flex-col justify-start items-center">
      {/*  {respuesta ? (
        respuesta.status === "success" ? (
          <Chip
            className=" fixed bottom-5 right-2 h-10 lowercase text-center flex justify-center items-center z-[99999]"
            color="green"
            value={respuesta.message}
          ></Chip>
        ) : (
          <Chip
            className="absolute bottom-0 z-50 right-2 h-10 lowercase text-center flex justify-center items-center animate-bounce"
            color="red"
            value={respuesta.message}
          ></Chip>
        )
      ) : null} */}
      <div className="bg-white mt-10 p-4 rounded-xl w-10/12 flex flex-col items-center">
        <Typography className="my-2" variant="h4">
          Lista de archivos
        </Typography>
        <BarraDeBusqueda />
        <div className="w-full flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {archivos.length === 0 ? (
                  cargando ? (
                    <LoaderArcoiris />
                  ) : (
                    <h1 className="text-center font-semibold my-10">
                      {primeraBusqueda ? "" : "No se han encontrado archivos."}
                    </h1>
                  )
                ) : (
                  <table className="min-w-full mt-5">
                    <thead className="bg-white border-b ">
                      <tr className="bg-biblio-500 text-center">
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4"
                        >
                          Fecha y hora
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4"
                        >
                          Nombre del archivo
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4"
                        >
                          Titulo
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4"
                        >
                          Ubicacion
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4"
                        >
                          Eliminar / Descargar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {archivos.map((archivo, i) => (
                        <tr
                          key={i}
                          id={archivo._id}
                          className="bg-gray-100 border-b cursor-pointer hover:bg-gray-300"
                          onClick={(e) => handleDetalles(archivo._id)}
                        >
                          {" "}
                          <td className="text-sm text-gray-900 font-light px-6 py-4 ">
                            {`${date.format(
                              new Date(archivo.conferencia.fecha),
                              "DD-MM-YYYY HH:mm:ss"
                            )}`}
                          </td>
                          <td>{archivo.archivo}</td>
                          <td className="px-6 py-4  overflow-hidden text-sm font-medium text-gray-900">
                            {archivo.titulo.titulo}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {archivo.ubicacion}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <IconButton
                              onClick={() => {
                                if (
                                  confirm(
                                    "¿Estas seguro de eliminar el archivo?"
                                  )
                                ) {
                                  handleDelete(archivo._id);
                                }
                              }}
                              color="red"
                            >
                              <MdDeleteForever className="text-white text-xl" />
                            </IconButton>
                            <IconButton
                              color="amber"
                              className="ml-2"
                              onClick={() => {
                                handleDownload(archivo.archivo);
                              }}
                            >
                              <MdFileDownload className="text-white text-xl" />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lista;
