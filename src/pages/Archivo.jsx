import { IconButton, Tooltip } from "@material-tailwind/react";
import { useState, useContext } from "react";
import { Context } from "../context/context";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { MdEdit, MdFileDownload, MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import date from "date-and-time";

const Archivo = () => {
  const { archivoSeleccionado, borrarArchivo, handleDownload } =
    useContext(Context);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const res = await borrarArchivo(id);
    console.log(res);
  };
  return (
    <>
      <div className="w- min-h-screen ml-auto bg-blue-gray-100 pb-10  flex flex-col justify-start items-center">
        <div className="h-72 flex flex-col items-en justify-center fixed duration-500 -right-2 top-40 hover:right-4 gap-2">
          <Tooltip content="Regresar a la lista">
            <IconButton
              onClick={() => {
                navigate("/lista");
              }}
              className="text-2xl"
            >
              <IoReturnDownBackOutline />
            </IconButton>
          </Tooltip>
          <Tooltip content="Descargar archivo">
            <IconButton
              onClick={() => {
                handleDownload(archivoSeleccionado.archivo);
              }}
              color="green"
              className="text-xl"
            >
              <MdFileDownload />
            </IconButton>
          </Tooltip>

          <Tooltip content="Editar archivo">
            <IconButton color="amber" className="text-xl">
              <MdEdit className="text-white" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Eliminar archivo">
            <IconButton
              onClick={() => {
                if (confirm("¿Estas seguro de eliminar el archivo?")) {
                  handleDelete(archivoSeleccionado._id);
                }
              }}
              color="red"
              className="text-xl mt-4"
            >
              <MdDeleteForever className="text-white" />
            </IconButton>
          </Tooltip>
        </div>
        {archivoSeleccionado && (
          <div className="bg-white w-11/12 p-2 rounded-xl mt-4">
            <h1 className="text-xl text-center font-bold my-2">
              {archivoSeleccionado ? archivoSeleccionado.titulo.titulo : null}
            </h1>
            <div className="w-full p-1 grid grid-cols-1 gap-2  justify-around">
              <div className=" p-1 border-x-2 border-biblio-400">
                <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                  Titulo
                </h4>
                {archivoSeleccionado.titulo.length === 0 ? (
                  <h5>No hay datos en esta categoria</h5>
                ) : (
                  <ul className=" grid grid-cols-3 place-items-center text-center">
                    <li>
                      <span className="italic font-semibold">Numero:</span>
                      <br />
                      {archivoSeleccionado.titulo.numero}
                    </li>
                    <li>
                      <span className="italic font-semibold">
                        Designacion Generica del Material:
                      </span>
                      <br />
                      {archivoSeleccionado.titulo.dgm}
                    </li>
                    <li>
                      <span className="italic font-semibold">Subtitulo:</span>
                      <br />
                      {archivoSeleccionado.titulo.subtitulo}
                    </li>
                  </ul>
                )}
              </div>

              <div className=" border-x-2 border-biblio-400 p-1">
                <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                  Autor personal - asiento principal
                </h4>
                {archivoSeleccionado.autorPersonalAsientoPrincipal.length ===
                0 ? (
                  <h5>No hay datos en esta categoria</h5>
                ) : (
                  <ul className=" grid place-items-center text-center">
                    <li>
                      <span className=" italic font-semibold">Autor:</span>
                      <br />
                      {archivoSeleccionado.autorPersonalAsientoPrincipal.autor}
                    </li>
                  </ul>
                )}
              </div>
              <div className="border-x-2 border-biblio-400 p-1">
                <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                  Conferencia
                </h4>
                {archivoSeleccionado.conferencia.length === 0 ? (
                  <h5>No hay datos en esta categoria</h5>
                ) : (
                  <ul className="px-2  grid grid-cols-4 place-items-center text-center">
                    <li>
                      <span className=" italic font-semibold">
                        Conferencia:
                      </span>
                      <br />
                      {archivoSeleccionado.conferencia.conferencia}
                    </li>
                    <li>
                      <span className=" italic font-semibold">Numero:</span>
                      <br />
                      {archivoSeleccionado.conferencia.numero}
                    </li>
                    <li>
                      <span className=" italic font-semibold">Fecha:</span>
                      <br />
                      {`${date.format(
                        new Date(archivoSeleccionado.conferencia.fecha),
                        "DD-MM-YYYY"
                      )}`}
                    </li>
                    <li>
                      <span className=" italic font-semibold">Lugar:</span>
                      <br />
                      {archivoSeleccionado.conferencia.lugar}
                    </li>
                  </ul>
                )}
              </div>
              <div className="border-x-2 border-biblio-400 p-1">
                <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                  Tema
                </h4>
                {archivoSeleccionado.tema === 0 ? (
                  <h5>No hay datos en esta categoria</h5>
                ) : (
                  <ul className="px-2  grid  place-items-center text-center">
                    <li>
                      <span className=" italic font-semibold">Tema:</span>
                      <br />
                      {archivoSeleccionado.tema.tema}
                    </li>
                  </ul>
                )}
              </div>
              <div className="border-x-2 border-biblio-400 p-1">
                <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                  Localizacion Acceso Control
                </h4>
                {archivoSeleccionado.localizacionAccesoControl === 0 ? (
                  <h5>No hay datos en esta categoria</h5>
                ) : (
                  <ul className="px-2 grid grid-cols-3 place-items-center text-center">
                    <li>
                      <span className=" italic font-semibold">
                        Procedencia:
                      </span>
                      <br />
                      {
                        archivoSeleccionado.localizacionAccesoControl
                          .procedencia
                      }
                    </li>
                    <li>
                      <span className=" italic font-semibold">Proveedor:</span>
                      <br />
                      {archivoSeleccionado.localizacionAccesoControl.proveedor}
                    </li>
                    <li>
                      <span className=" italic font-semibold">Estado:</span>
                      <br />
                      {archivoSeleccionado.localizacionAccesoControl.estado}
                    </li>
                  </ul>
                )}
              </div>
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Autor personal - asiento secundario
                  </h4>
                  {archivoSeleccionado.autorPersonalAsientoSecundario.length ===
                  0 ? (
                    <h5>No hay datos en esta categoria</h5>
                  ) : (
                    <ul className="px-2 grid grid-cols-2 place-items-center text-center ">
                      {archivoSeleccionado.autorPersonalAsientoSecundario.map(
                        (entrada, i) => (
                          <li key={i}>
                            <span className=" italic font-semibold">
                              Autor {[i + 1]}:
                            </span>
                            <br />
                            {
                              archivoSeleccionado
                                .autorPersonalAsientoSecundario[i].autor
                            }
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Autor institucional - asiento secundario
                  </h4>
                  <ul className="px-2 grid grid-cols-3">
                    {archivoSeleccionado.autorInstitucionalAsientoSecundario.map(
                      (entrada, i) => (
                        <li key={i}>
                          <div className="p-2">
                            <span className=" italic font-semibold">
                              Entidad {[i + 1]}:
                            </span>
                            <br />
                            {
                              archivoSeleccionado
                                .autorInstitucionalAsientoSecundario[i].entidad
                            }
                            <br />
                            <span className=" italic font-semibold">
                              Entidad subordinada {[i + 1]}:
                            </span>
                            <br />
                            {
                              archivoSeleccionado
                                .autorInstitucionalAsientoSecundario[i]
                                .entidadSubordinada
                            }
                            <br />
                            <span className=" italic font-semibold">
                              Sigla {[i + 1]}:
                            </span>
                            <br />
                            {
                              archivoSeleccionado
                                .autorInstitucionalAsientoSecundario[i].sigla
                            }
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Publicacion
                  </h4>
                  {archivoSeleccionado.publicacion.length === 0 ? (
                    <h5>No hay datos en esta categoria</h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.publicacion.length}
    } `}
                    >
                      {archivoSeleccionado.publicacion.map((entrada, i) =>
                        archivoSeleccionado.publicacion.length === 1 ? (
                          <li className="" key={i}>
                            <div className="p-2 grid grid-cols-3 place-items-center">
                              <div className="flex flex-col text-center items-center mx-2">
                                <span className=" italic font-semibold">
                                  Lugar {[i + 1]}:
                                </span>
                                {archivoSeleccionado.publicacion[i].lugar}
                              </div>
                              <div className="flex flex-col text-center items-center mx-2">
                                <span className=" italic font-semibold">
                                  Editor {[i + 1]}:
                                </span>
                                {archivoSeleccionado.publicacion[i].editor}
                              </div>
                              <div className="flex flex-col text-center items-center mx-2">
                                <span className=" italic font-semibold">
                                  Fecha {[i + 1]}:
                                </span>
                                {`${date.format(
                                  new Date(
                                    archivoSeleccionado.publicacion[i].fecha
                                  ),
                                  "DD-MM-YYYY"
                                )}`}
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li className="" key={i}>
                            <div className="p-2">
                              <span className=" italic font-semibold">
                                Lugar {[i + 1]}:
                              </span>
                              <br />
                              {archivoSeleccionado.publicacion[i].lugar}
                              <br />

                              <span className=" italic font-semibold">
                                Editor {[i + 1]}:
                              </span>
                              <br />
                              {archivoSeleccionado.publicacion[i].editor}
                              <br />

                              <span className=" italic font-semibold">
                                Fecha {[i + 1]}:
                              </span>
                              <br />

                              {`${date.format(
                                new Date(
                                  archivoSeleccionado.publicacion[i].fecha
                                ),
                                "DD-MM-YYYY"
                              )}`}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Descripcion Fisica
                  </h4>
                  {archivoSeleccionado.descripcionFisica.length === 0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.descripcionFisica.length}
                        } `}
                    >
                      {archivoSeleccionado.descripcionFisica.map((entrada, i) =>
                        archivoSeleccionado.descripcionFisica.length === 1 ? (
                          <li className="" key={i}>
                            <div className="p-2 grid grid-cols-3 place-items-center">
                              <div className="flex flex-col text-center items-center mx-2">
                                <span className=" italic font-semibold">
                                  Extension {[i + 1]}:
                                </span>
                                {
                                  archivoSeleccionado.descripcionFisica[i]
                                    .extensionDEM
                                }
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li className="" key={i}>
                            <div className="p-2">
                              <span className=" italic font-semibold">
                                Extension {[i + 1]}:
                              </span>
                              <br />
                              {
                                archivoSeleccionado.descripcionFisica[i]
                                  .extensionDEM
                              }
                              <br />
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Coleccion
                  </h4>
                  <ul
                    className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.coleccion.length}
                  } `}
                  >
                    {archivoSeleccionado.coleccion.map((entrada, i) =>
                      archivoSeleccionado.coleccion.length === 1 ? (
                        <li className="" key={i}>
                          <div className="p-2 grid grid-cols-3 place-items-center">
                            <div className="flex flex-col text-center items-center mx-2">
                              <span className=" italic font-semibold">
                                Titulo {[i + 1]}:
                              </span>
                              {archivoSeleccionado.coleccion[i].titulo}
                            </div>
                            <div className="flex flex-col text-center items-center mx-2">
                              <span className=" italic font-semibold">
                                Subserie {[i + 1]}:
                              </span>
                              {archivoSeleccionado.coleccion[i].subserie}
                            </div>
                            <div className="flex flex-col text-center items-center mx-2">
                              <span className=" italic font-semibold">
                                volumen {[i + 1]}:
                              </span>
                              {archivoSeleccionado.coleccion[i].volumen}
                            </div>
                          </div>
                        </li>
                      ) : (
                        <li className="" key={i}>
                          <div className="p-2 text-center">
                            <span className=" italic font-semibold">
                              Titulo {[i + 1]}:
                            </span>
                            <br />
                            {archivoSeleccionado.coleccion[i].titulo}
                            <br />
                            <span className=" italic font-semibold">
                              Volumen {[i + 1]}:
                            </span>
                            <br />
                            {archivoSeleccionado.coleccion[i].volumen}
                            <br />
                            <span className=" italic font-semibold">
                              Subserie {[i + 1]}:
                            </span>
                            <br />
                            {archivoSeleccionado.coleccion[i].subserie}
                            <br />
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Termino de materia controlado
                  </h4>
                  {archivoSeleccionado.terminoDeMateriaControlado.length ===
                  0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.terminoDeMateriaControlado.length}
   } `}
                    >
                      {archivoSeleccionado.terminoDeMateriaControlado.map(
                        (entrada, i) =>
                          archivoSeleccionado.terminoDeMateriaControlado
                            .length === 1 ? (
                            <li className="" key={i}>
                              <div className="p-2 grid place-items-center">
                                <div className="flex flex-col text-center items-center mx-2">
                                  <span className=" italic font-semibold">
                                    Termino Controlado {[i + 1]}:
                                  </span>
                                  {
                                    archivoSeleccionado
                                      .terminoDeMateriaControlado[i]
                                      .terminoControlado
                                  }
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li className="" key={i}>
                              <div className="p-2 text-center">
                                <span className=" italic font-semibold">
                                  Titulo {[i + 1]}:
                                </span>
                                <br />
                                {
                                  archivoSeleccionado
                                    .terminoDeMateriaControlado[i]
                                    .terminoControlado
                                }
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Termino de materia geofrafico
                  </h4>
                  {archivoSeleccionado.terminoDeMateriaGeografico.length ===
                  0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.terminoDeMateriaGeografico.length}
                    } `}
                    >
                      {archivoSeleccionado.terminoDeMateriaGeografico.map(
                        (entrada, i) =>
                          archivoSeleccionado.terminoDeMateriaGeografico
                            .length === 1 ? (
                            <li className="" key={i}>
                              <div className="p-2 grid place-items-center">
                                <div className="flex flex-col text-center items-center mx-2">
                                  <span className=" italic font-semibold">
                                    Termino de materia geografico {[i + 1]}:
                                  </span>
                                  {
                                    archivoSeleccionado
                                      .terminoDeMateriaGeografico[i]
                                      .terminoDeMateriaGeografico
                                  }
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li className="" key={i}>
                              <div className="p-2 text-center">
                                <span className=" italic font-semibold">
                                  Termino de materia geografico {[i + 1]}:
                                </span>
                                <br />
                                {
                                  archivoSeleccionado
                                    .terminoDeMateriaGeografico[i]
                                    .terminoDeMateriaGeografico
                                }
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Termino de materia propuesto
                  </h4>
                  {archivoSeleccionado.terminoDeMateriaPropuesto.length ===
                  0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.terminoDeMateriaPropuesto.length}
                  } `}
                    >
                      {archivoSeleccionado.terminoDeMateriaPropuesto.map(
                        (entrada, i) =>
                          archivoSeleccionado.terminoDeMateriaPropuesto
                            .length === 1 ? (
                            <li className="" key={i}>
                              <div className="p-2 grid place-items-center">
                                <div className="flex flex-col text-center items-center mx-2">
                                  <span className=" italic font-semibold">
                                    Termino de materia propuesto {[i + 1]}:
                                  </span>
                                  {
                                    archivoSeleccionado
                                      .terminoDeMateriaPropuesto[i]
                                      .terminoPropuesto
                                  }
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li className="" key={i}>
                              <div className="p-2 text-center">
                                <span className=" italic font-semibold">
                                  Termino de materia propuesto {[i + 1]}:
                                </span>
                                <br />
                                {
                                  archivoSeleccionado.terminoDeMateriaPropuesto[
                                    i
                                  ].terminoPropuesto
                                }
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Termino de materia nombre de persona
                  </h4>
                  {archivoSeleccionado.terminoDeMateriaNombreDePersona.length <
                  0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.terminoDeMateriaNombreDePersona.length}
                    } `}
                    >
                      {archivoSeleccionado.terminoDeMateriaNombreDePersona.map(
                        (entrada, i) =>
                          archivoSeleccionado.terminoDeMateriaNombreDePersona
                            .length === 1 ? (
                            <li className="" key={i}>
                              <div className="p-2 grid place-items-center">
                                <div className="flex flex-col text-center items-center mx-2">
                                  <span className=" italic font-semibold">
                                    Termino de materia nombre de persona{" "}
                                    {[i + 1]}:
                                  </span>
                                  {
                                    archivoSeleccionado
                                      .terminoDeMateriaNombreDePersona[i].nombre
                                  }
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li className="" key={i}>
                              <div className="p-2 text-center">
                                <span className=" italic font-semibold">
                                  Termino de materia nombre de persona {[i + 1]}
                                  :
                                </span>
                                <br />
                                {
                                  archivoSeleccionado
                                    .terminoDeMateriaNombreDePersona[i].nombre
                                }
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Nota general
                  </h4>
                  {archivoSeleccionado.notaGeneral.length < 0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.notaGeneral.length}
                    } `}
                    >
                      {archivoSeleccionado.notaGeneral.map((entrada, i) =>
                        archivoSeleccionado.notaGeneral.length === 1 ? (
                          <li className="" key={i}>
                            <div className="p-2 grid place-items-center">
                              <div className="flex flex-col text-center items-center mx-2">
                                <span className=" italic font-semibold">
                                  Nota general {[i + 1]}:
                                </span>
                                {archivoSeleccionado.notaGeneral[i].nota}
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li className="" key={i}>
                            <div className="p-2 text-center">
                              <span className=" italic font-semibold">
                                Nota general {[i + 1]}:
                              </span>
                              <br />
                              {archivoSeleccionado.notaGeneral[i].nota}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Nivel
                  </h4>
                  {archivoSeleccionado.nivel.length < 0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.nivel.length}
                    } `}
                    >
                      {archivoSeleccionado.nivel.map((entrada, i) =>
                        archivoSeleccionado.nivel.length === 1 ? (
                          <li className="" key={i}>
                            <div className="p-2 grid place-items-center">
                              <div className="flex flex-col text-center items-center mx-2">
                                <span className=" italic font-semibold">
                                  Nivel {[i + 1]}:
                                </span>
                                {archivoSeleccionado.nivel[i].nivel}
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li className="" key={i}>
                            <div className="p-2 text-center">
                              <span className=" italic font-semibold">
                                Nivel {[i + 1]}:
                              </span>
                              <br />
                              {archivoSeleccionado.nivel[i].nivel}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Resumen
                  </h4>
                  {archivoSeleccionado.resumen.length < 0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.resumen.length}
                    } `}
                    >
                      {archivoSeleccionado.resumen.map((entrada, i) =>
                        archivoSeleccionado.resumen.length === 1 ? (
                          <li className="" key={i}>
                            <div className="p-2 grid place-items-center">
                              <div className="flex flex-col text-center items-center mx-2">
                                <span className=" italic font-semibold">
                                  Resumen {[i + 1]}:
                                </span>
                                {archivoSeleccionado.resumen[i].resumen}
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li className="" key={i}>
                            <div className="p-2 text-center">
                              <span className=" italic font-semibold">
                                Resumen {[i + 1]}:
                              </span>
                              <br />
                              {archivoSeleccionado.resumen[i].resumen}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              }
              {
                <div className="border-x-2 border-biblio-400 p-1">
                  <h4 className="text-center font-bold text-white bg-biblio-400 mb-2">
                    Direccion electronica
                  </h4>
                  {archivoSeleccionado.resumen.length < 0 ? (
                    <h5 className="text-center">
                      No hay datos en esta categoria
                    </h5>
                  ) : (
                    <ul
                      className={`px-2 grid place-items-center grid-cols-${archivoSeleccionado.direccionElectronica.length}
                    } `}
                    >
                      {archivoSeleccionado.direccionElectronica.map(
                        (entrada, i) =>
                          archivoSeleccionado.direccionElectronica.length ===
                          1 ? (
                            <li className="" key={i}>
                              <div className="p-2 grid place-items-center">
                                <div className="flex flex-col text-center items-center mx-2">
                                  <span className=" italic font-semibold">
                                    Nombre {[i + 1]}:
                                  </span>
                                  {
                                    archivoSeleccionado.direccionElectronica[i]
                                      .nombre
                                  }
                                </div>
                                <div className="flex flex-col text-center items-center mx-2">
                                  <span className=" italic font-semibold">
                                    Direccion {[i + 1]}:
                                  </span>
                                  {
                                    archivoSeleccionado.direccionElectronica[i]
                                      .direccion
                                  }
                                </div>
                              </div>
                            </li>
                          ) : (
                            <li className="" key={i}>
                              <div className="p-2 text-center">
                                <span className=" italic font-semibold">
                                  Nombre {[i + 1]}:
                                </span>
                                <br />
                                {
                                  archivoSeleccionado.direccionElectronica[i]
                                    .nombre
                                }
                              </div>
                              <div className="p-2 text-center">
                                <span className=" italic font-semibold">
                                  Direccion {[i + 1]}:
                                </span>
                                <br />
                                {
                                  archivoSeleccionado.direccionElectronica[i]
                                    .direccion
                                }
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              }
            </div>
            <div className="my-2 bg-biblio-500 w-12/12 mx-auto h-[3px] rounded" />
          </div>
        )}
        {archivoSeleccionado === null && (
          <h1 className="text-3xl text-center">CARGANDO...</h1>
        )}
      </div>
    </>
  );
};

export default Archivo;
