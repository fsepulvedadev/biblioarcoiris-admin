import {
  Button,
  Input,
  Select,
  Typography,
  Option,
  Checkbox,
  Textarea,
  Chip,
} from "@material-tailwind/react";
import { useState, useRef } from "react";
import { MdUploadFile } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiDeleteBack2Fill } from "react-icons/ri";
import DivisorCategoria from "../components/DivisorCategoria";

const CargarArchivo = () => {
  const [formData, setFormData] = useState({
    file: null,
    autorPersonalAsientoPrincipal: {},
    autorPersonalAsientoSecundario: {},
    autorInstitucionalAsientoPrincipal: {},
    autorInstitucionalAsientoSecundario: {},
    conferencia: {},
    titulo: {},
    localizacionAccesoControl: {},
    publicacion: {},
    descripcionFisica: {},
    coleccion: {},
    terminoDeMateriaControlado: {},
    terminoDeMateriaGeografico: {},
    terminoDeMateriaPropuesto: {},
    terminoDeMateriaNombreDePersona: {},
    tema: {},
    notaGeneral: {},
    direccionElectronica: {},
    nivel: {},
    resumen: {},
  });
  const [adicionales, setAdicionales] = useState({
    autorPersonalAsientoSecundario: [],
    autorInstitucionalAsientoSecundario: [],
    publicacion: [],
    descripcionFisica: [],
    coleccion: [],
    terminoDeMateriaControlado: [],
    terminoDeMateriaGeografico: [],
    terminoDeMateriaPropuesto: [],
    terminoDeMateriaNombreDePersona: [],
    notaGeneral: [],
    nivel: [],
    resumen: [],
    direccionElectronica: [],
  });

  const [listosParaEnviar, setListosParaEnviar] = useState({
    autorPersonalAsientoSecundario: [],
    autorInstitucionalAsientoSecundario: [],
    publicacion: [],
    descripcionFisica: [],
    coleccion: [],
    terminoDeMateriaControlado: [],
    terminoDeMateriaGeografico: [],
    terminoDeMateriaPropuesto: [],
    terminoDeMateriaNombreDePersona: [],
    notaGeneral: [],
    nivel: [],
    resumen: [],
    direccionElectronica: [],
  });

  /*  - Armar un array en 'adicionales' en el que se guarden los campos agregados a los que ya existen, 
  - Luego implementar una funcion para recorrer y checkear a que input pertenecen para agregarlos al formData antes de enviar.
   */

  const [respuesta, setRespuesta] = useState("");
  const [enviando, setEnviando] = useState("");

  const fileRef = useRef(null);

  const armarObjetos = (arrayConValores, categoria) => {
    console.log("categoria", categoria);
    let vueltas;

    let combinado;
    let combinados = [];

    for (const key in arrayConValores[categoria]) {
      vueltas = arrayConValores[categoria][key].length;
    }

    for (let i = 0; i < vueltas; i++) {
      for (const key in arrayConValores[categoria]) {
        combinado = {
          ...combinado,
          [key]: arrayConValores[categoria][key][i],
        };
      }
      combinados.push(combinado);
    }
    combinados.push(formData[categoria]);
    const listos = listosParaEnviar;
    listos[categoria] = combinados;
    setListosParaEnviar(listos);
  };
  const transformarCampos = (arrayConLosCampos) => {
    let camposTransformados = {};
    let temporal = {};

    for (const clave in arrayConLosCampos) {
      arrayConLosCampos[clave].forEach((adicional) => {
        if (camposTransformados.hasOwnProperty(clave)) {
          camposTransformados[clave].push(adicional);
          return;
        }
        camposTransformados[clave] = [adicional];
      });
    }

    for (const clave in camposTransformados) {
      if (camposTransformados.hasOwnProperty(clave)) {
        let elemento = camposTransformados[clave];

        for (const array of elemento) {
          for (const obj of array) {
            const { alt, ...resto } = obj;

            if (
              temporal.hasOwnProperty(clave) &&
              temporal[clave].hasOwnProperty(alt)
            ) {
              temporal[clave][alt].push(resto.value);
            } else {
              temporal[clave] = { ...temporal[clave], [alt]: [resto.value] };
            }
          }
        }
      }
    }

    return temporal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    for (const keys in adicionales) {
      if (adicionales[keys].length > 0) {
        armarObjetos(transformarCampos(adicionales), keys);
      }
    }

    if (formData.file === null) {
      setEnviando(false);

      document.activeElement.blur();

      return alert("No se ha seleccionado ningun archivo");
    }

    const formDataObj = new FormData();

    formDataObj.append("file", formData.file);
    formDataObj.append("size", formData.file.size);
    formDataObj.append(
      "autorPersonalAsientoPrincipal",
      JSON.stringify(formData.autorPersonalAsientoPrincipal)
    );
    if (listosParaEnviar.autorPersonalAsientoSecundario.length > 0) {
      formDataObj.append(
        "autorPersonalAsientoSecundario",
        JSON.stringify(listosParaEnviar.autorPersonalAsientoSecundario)
      );
    } else {
      formDataObj.append(
        "autorPersonalAsientoSecundario",
        JSON.stringify(formData.autorPersonalAsientoSecundario)
      );
    }

    formDataObj.append(
      "autorInstitucionalAsientoPrincipal",
      JSON.stringify(formData.autorInstitucionalAsientoPrincipal)
    );
    if (listosParaEnviar.autorInstitucionalAsientoSecundario.length > 0) {
      formDataObj.append(
        "autorInstitucionalAsientoSecundario",
        JSON.stringify(listosParaEnviar.autorInstitucionalAsientoSecundario)
      );
    } else {
      formDataObj.append(
        "autorInstitucionalAsientoSecundario",
        JSON.stringify(formData.autorInstitucionalAsientoSecundario)
      );
    }

    formDataObj.append("conferencia", JSON.stringify(formData.conferencia));
    formDataObj.append("titulo", JSON.stringify(formData.titulo));
    formDataObj.append(
      "localizacionAccesoControl",
      JSON.stringify(formData.localizacionAccesoControl)
    );
    if (listosParaEnviar.publicacion.length > 0) {
      formDataObj.append(
        "publicacion",
        JSON.stringify(listosParaEnviar.publicacion)
      );
    } else {
      formDataObj.append("publicacion", JSON.stringify(formData.publicacion));
    }

    if (listosParaEnviar.descripcionFisica.length > 0) {
      formDataObj.append(
        "descripcionFisica",
        JSON.stringify(listosParaEnviar.descripcionFisica)
      );
    } else {
      formDataObj.append(
        "descripcionFisica",
        JSON.stringify(formData.descripcionFisica)
      );
    }

    if (listosParaEnviar.coleccion.length > 0) {
      formDataObj.append(
        "coleccion",
        JSON.stringify(listosParaEnviar.coleccion)
      );
    } else {
      formDataObj.append("coleccion", JSON.stringify(formData.coleccion));
    }

    if (listosParaEnviar.terminoDeMateriaControlado.length > 0) {
      formDataObj.append(
        "terminoDeMateriaControlado",
        JSON.stringify(listosParaEnviar.terminoDeMateriaControlado)
      );
    } else {
      formDataObj.append(
        "terminoDeMateriaControlado",
        JSON.stringify(formData.terminoDeMateriaControlado)
      );
    }

    if (listosParaEnviar.terminoDeMateriaGeografico.length > 0) {
      formDataObj.append(
        "terminoDeMateriaGeografico",
        JSON.stringify(listosParaEnviar.terminoDeMateriaGeografico)
      );
    } else {
      formDataObj.append(
        "terminoDeMateriaGeografico",
        JSON.stringify(formData.terminoDeMateriaGeografico)
      );
    }

    if (listosParaEnviar.terminoDeMateriaPropuesto.length > 0) {
      formDataObj.append(
        "terminoDeMateriaPropuesto",
        JSON.stringify(listosParaEnviar.terminoDeMateriaPropuesto)
      );
    }

    if (listosParaEnviar.terminoDeMateriaNombreDePersona.length > 0) {
      formDataObj.append(
        "terminoDeMateriaNombreDePersona",
        JSON.stringify(listosParaEnviar.terminoDeMateriaNombreDePersona)
      );
    } else {
      formDataObj.append(
        "terminoDeMateriaNombreDePersona",
        JSON.stringify(formData.terminoDeMateriaNombreDePersona)
      );
    }

    formDataObj.append("tema", JSON.stringify(formData.tema));

    if (listosParaEnviar.notaGeneral.length > 0) {
      formDataObj.append(
        "notaGeneral",
        JSON.stringify(listosParaEnviar.notaGeneral)
      );
    } else {
      formDataObj.append("notaGeneral", JSON.stringify(formData.notaGeneral));
    }

    if (listosParaEnviar.direccionElectronica.length > 0) {
      formDataObj.append(
        "direccionElectronica",
        JSON.stringify(listosParaEnviar.direccionElectronica)
      );
    } else {
      formDataObj.append(
        "direccionElectronica",
        JSON.stringify(formData.direccionElectronica)
      );
    }
    if (listosParaEnviar.nivel.length > 0) {
      formDataObj.append("nivel", JSON.stringify(listosParaEnviar.nivel));
    } else {
      formDataObj.append("nivel", JSON.stringify(formData.nivel));
    }
    if (listosParaEnviar.resumen.length > 0) {
      formDataObj.append("resumen", JSON.stringify(listosParaEnviar.resumen));
    } else {
      formDataObj.append("resumen", JSON.stringify(formData.resumen));
    }

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formDataObj,
    })
      .then((res) => res.json())
      .then((data) => {
        setEnviando(false);
        setRespuesta(data);

        console.log(data);

        console.log(data);
        setTimeout(() => {
          setRespuesta("");
        }, 2500);
        setFormData({
          autorPersonalAsientoPrincipal: {},
          autorPersonalAsientoSecundario: {},
          autorInstitucionalAsientoPrincipal: {},
          autorInstitucionalAsientoSecundario: {},
          conferencia: {},
          titulo: {},
          localizacionAccesoControl: {},
          publicacion: {},
          descripcionFisica: {},
          coleccion: {},
          terminoDeMateriaControlado: {},
          terminoDeMateriaGeografico: {},
          terminoDeMateriaPropuesto: {},
          terminoDeMateriaNombreDePersona: {},
          tema: {},
          notaGeneral: {},
          direccionElectronica: {},
          nivel: {},
          resumen: {},
        });
        fileRef.current.value = "";
      });
  };

  const handleAgregarCampos = (categoria, cantidadDeCampos) => {
    const newCampos = adicionales[`${categoria}`];
    newCampos.push(cantidadDeCampos);
    setAdicionales({
      ...adicionales,
      [`${categoria}`]: newCampos,
    });
  };

  const handleChangeAdicionales = (e, categoria, index, i) => {
    const newDatos = adicionales[`${categoria}`];

    newDatos[index][i].value = e;

    setAdicionales({
      ...adicionales,
      [`${categoria}`]: newDatos,
    });
  };

  const handleEliminarCampo = (e, categoria, index) => {
    e.preventDefault();
    const newDatos = adicionales[`${categoria}`];

    newDatos.splice(index, 1);

    setAdicionales({
      ...adicionales,
      [`${categoria}`]: newDatos,
    });
  };

  return (
    <div className="w-[83.5vw] min-h-screen ml-auto bg-blue-gray-100 flex justify-center items-start">
      {respuesta ? (
        respuesta.status === "success" ? (
          <Chip
            className="fixed z-50 bottom-5 right-2 h-10 lowercase text-center flex justify-center items-center"
            color="green"
            value={respuesta.message}
          ></Chip>
        ) : (
          <Chip
            className="fixed z-50 bottom-5 right-2 h-10 lowercase text-center flex justify-center items-center animate-bounce"
            color="red"
            value={respuesta.message}
          ></Chip>
        )
      ) : null}

      <div className="bg-white mt-10 p-4 rounded-xl w-10/12 flex flex-col items-center">
        <Typography className="text-center" variant="h5">
          Carga de Archivos 📁
        </Typography>
        <form
          action=""
          className="grid grid-cols-2 my-4 gap-4 place-items-center w-full h-full"
        >
          <label className="block col-span-2 ">
            <span className="sr-only ">Seleccione un archivo</span>
            <input
              id="file"
              type="file"
              className="block w-full cursor-pointer file:cursor-pointer  file:border-none file:middle file:none file:font-sans file:font-bold file:center file:uppercase file:transition-all file:disabled:opacity-50 file:disabled:shadow-none file:disabled:pointer-events-none file:text-xs file:py-3 file:px-6 file:rounded-lg file:bg-blue-500 file:text-white file:shadow-md file:shadow-blue-500/20 file:hover:shadow-lg file:hover:shadow-blue-500/40 file:focus:opacity-[0.85] file:focus:shadow-none file:active:opacity-[0.85] file:active:shadow-none"
              onChange={(e) => {
                setFormData({ ...formData, file: e.target.files[0] });
              }}
              ref={fileRef}
            />
          </label>
          <div className="w-full col-span-2">
            <DivisorCategoria titulo="100 - Autor personal - asiento principal" />
            <Input
              onChange={(e) => {
                setFormData({
                  ...formData,
                  autorPersonalAsientoPrincipal: {
                    autor: e.target.value,
                  },
                });
              }}
              value={formData.autorPersonalAsientoPrincipal.autor}
              type="text"
              label="Autor"
              className=""
            />
          </div>

          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="700 - Autor personal - asiento secundario" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    autorPersonalAsientoSecundario: {
                      autor: e.target.value,
                      funcion: formData.autorPersonalAsientoSecundario.funcion,
                    },
                  });
                }}
                value={formData.autorPersonalAsientoSecundario.autor}
                type="text"
                label="Autor"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    autorPersonalAsientoSecundario: {
                      autor: formData.autorPersonalAsientoSecundario.autor,
                      funcion: e.target.value,
                    },
                  });
                }}
                value={formData.autorPersonalAsientoSecundario.funcion}
                type="text"
                label="Funcion"
                className=""
              />
            </div>
            {adicionales.autorPersonalAsientoSecundario.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.autorPersonalAsientoSecundario.map(
                  (adicional, index) => {
                    return (
                      <div key={index} className="flex gap-4 my-1">
                        <button
                          onClick={(e) =>
                            handleEliminarCampo(
                              e,
                              "autorPersonalAsientoSecundario",
                              index
                            )
                          }
                          className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <RiDeleteBack2Fill className="text-xl" />
                        </button>
                        {adicional.map((item, i) => {
                          return (
                            <div className="w-full" key={i}>
                              <Input
                                key={i}
                                onChange={(e) => {
                                  handleChangeAdicionales(
                                    e.target.value,
                                    "autorPersonalAsientoSecundario",
                                    index,
                                    i
                                  );
                                }}
                                value={
                                  adicionales.autorPersonalAsientoSecundario[
                                    index
                                  ][i].value
                                }
                                type={item.tipo}
                                label={item.label}
                                className=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("autorPersonalAsientoSecundario", [
                  { tipo: "text", label: "Autor", value: "", alt: "autor" },
                  { tipo: "text", label: "Funcion", value: "", alt: "funcion" },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="110 - Autor institucional - asiento principal" />

            <div className="flex gap-4">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    autorInstitucionalAsientoPrincipal: {
                      entidad: e.target.value,
                      entidadSubordinada:
                        formData.autorInstitucionalAsientoPrincipal
                          .entidadSubordinada,
                      sigla: formData.autorInstitucionalAsientoPrincipal.sigla,
                    },
                  });
                }}
                value={formData.autorInstitucionalAsientoPrincipal.entidad}
                type="text"
                label="Entidad o lugar"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    autorInstitucionalAsientoPrincipal: {
                      entidad:
                        formData.autorInstitucionalAsientoPrincipal.entidad,
                      entidadSubordinada: e.target.value,
                      sigla: formData.autorInstitucionalAsientoPrincipal.sigla,
                    },
                  });
                }}
                value={
                  formData.autorInstitucionalAsientoPrincipal.entidadSubordinada
                }
                type="text"
                label="Entidad subordinada"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    autorInstitucionalAsientoPrincipal: {
                      entidad:
                        formData.autorInstitucionalAsientoPrincipal
                          .entidadSubordinada,
                      entidadSubordinada:
                        formData.autorInstitucionalAsientoPrincipal
                          .entidadSubordinada,
                      sigla: e.target.value,
                    },
                  });
                }}
                value={formData.autorInstitucionalAsientoPrincipal.sigla}
                type="text"
                label="Sigla"
                className=""
              />
            </div>
          </div>

          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="710 - Autor institucional - asiento secundario" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    autorInstitucionalAsientoSecundario: {
                      entidad: e.target.value,
                      entidadSubordinada:
                        formData.autorInstitucionalAsientoSecundario
                          .entidadSubordinada,
                      sigla: formData.autorInstitucionalAsientoSecundario.sigla,
                    },
                  });
                }}
                value={formData.autorInstitucionalAsientoSecundario.entidad}
                type="text"
                label="Entidad o lugar"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    autorInstitucionalAsientoSecundario: {
                      entidad:
                        formData.autorInstitucionalAsientoSecundario.entidad,
                      entidadSubordinada: e.target.value,
                      sigla: formData.autorInstitucionalAsientoSecundario.sigla,
                    },
                  });
                }}
                value={
                  formData.autorInstitucionalAsientoSecundario
                    .entidadSubordinada
                }
                type="text"
                label="Entidad subordinada"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    autorInstitucionalAsientoSecundario: {
                      entidad:
                        formData.autorInstitucionalAsientoSecundario
                          .entidadSubordinada,
                      entidadSubordinada:
                        formData.autorInstitucionalAsientoSecundario
                          .entidadSubordinada,
                      sigla: e.target.value,
                    },
                  });
                }}
                value={formData.autorInstitucionalAsientoSecundario.sigla}
                type="text"
                label="Sigla"
                className=""
              />
            </div>
            {adicionales.autorInstitucionalAsientoSecundario.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.autorInstitucionalAsientoSecundario.map(
                  (adicional, index) => {
                    return (
                      <div key={index} className="flex gap-4 my-1">
                        <button
                          onClick={(e) =>
                            handleEliminarCampo(
                              e,
                              "autorInstitucionalAsientoSecundario",
                              index
                            )
                          }
                          className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <RiDeleteBack2Fill className="text-xl" />
                        </button>
                        {adicional.map((item, i) => {
                          return (
                            <div className="w-full" key={i}>
                              <Input
                                key={i}
                                onChange={(e) => {
                                  handleChangeAdicionales(
                                    e.target.value,
                                    "autorInstitucionalAsientoSecundario",
                                    index,
                                    i
                                  );
                                }}
                                value={
                                  adicionales
                                    .autorInstitucionalAsientoSecundario[index][
                                    i
                                  ].value
                                }
                                type={item.tipo}
                                label={item.label}
                                className=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("autorInstitucionalAsientoSecundario", [
                  {
                    tipo: "text",
                    label: "Entidad o lugar",
                    value: "",
                    alt: "entidad",
                  },
                  {
                    tipo: "text",
                    label: "Entidad Subordinada",
                    value: "",
                    alt: "entidadSubordinada",
                  },
                  { tipo: "text", label: "Sigla", value: "", alt: "sigla" },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="111 - Conferencia" />
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    conferencia: {
                      conferencia: e.target.value,
                      numero: formData.conferencia.numero,
                      fecha: formData.conferencia.fecha,
                      lugar: formData.conferencia.lugar,
                    },
                  });
                }}
                value={formData.conferencia.conferencia}
                type="text"
                label="Conferencia"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    conferencia: {
                      conferencia: formData.conferencia.conferencia,
                      numero: e.target.value,
                      fecha: formData.conferencia.fecha,
                      lugar: formData.conferencia.lugar,
                    },
                  });
                }}
                value={formData.conferencia.numero}
                type="number"
                label="Numero"
                pattern="[0-9]*"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    conferencia: {
                      conferencia: formData.conferencia.conferencia,
                      numero: formData.conferencia.numero,
                      fecha: e.target.value,
                      lugar: formData.conferencia.lugar,
                    },
                  });
                }}
                value={formData.conferencia.fecha}
                type="date"
                label="Fecha"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    conferencia: {
                      conferencia: formData.conferencia.conferencia,
                      numero: formData.conferencia.numero,
                      fecha: formData.conferencia.fecha,
                      lugar: e.target.value,
                    },
                  });
                }}
                value={formData.conferencia.lugar}
                type="text"
                label="Lugar"
                className=""
              />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="245 - Titulo" />
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    titulo: {
                      titulo: e.target.value,
                      numero: formData.titulo.numero,
                      dgm: formData.titulo.dgm,
                      subtitulo: formData.titulo.subtitulo,
                    },
                  });
                }}
                value={formData.titulo.titulo}
                type="text"
                label="Titulo"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    titulo: {
                      titulo: formData.titulo.titulo,
                      numero: e.target.value,
                      dgm: formData.titulo.dgm,
                      subtitulo: formData.titulo.subtitulo,
                    },
                  });
                }}
                value={formData.titulo.numero}
                type="number"
                label="Numero"
                pattern="[0-9]*"
                className=""
              />
              <Select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    titulo: {
                      titulo: formData.titulo.titulo,
                      numero: formData.titulo.numero,
                      dgm: e,
                      subtitulo: formData.titulo.subtitulo,
                    },
                  });
                }}
                id="dgm"
                label="Designacion Generica del Material"
                value={formData.titulo.dgm}
              >
                <Option value="Local">Local</Option>
                <Option value="Remoto">Remoto</Option>
              </Select>
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    titulo: {
                      titulo: formData.titulo.titulo,
                      numero: formData.titulo.numero,
                      dgm: formData.titulo.dgm,
                      subtitulo: e.target.value,
                    },
                  });
                }}
                value={formData.titulo.subtitulo}
                type="text"
                label="Subtitulo"
                className=""
              />
            </div>
          </div>

          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="260 - Publicacion" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    publicacion: {
                      lugar: e.target.value,
                      editor: formData.publicacion.editor,
                      fecha: formData.publicacion.fecha,
                    },
                  });
                }}
                value={formData.publicacion.lugar}
                type="text"
                label="Lugar"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    publicacion: {
                      lugar: formData.publicacion.lugar,
                      editor: e.target.value,
                      fecha: formData.publicacion.fecha,
                    },
                  });
                }}
                value={formData.publicacion.editor}
                type="text"
                label="Editor"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    publicacion: {
                      lugar: formData.publicacion.lugar,
                      editor: formData.publicacion.editor,
                      fecha: e.target.value,
                    },
                  });
                }}
                value={formData.publicacion.fecha}
                type="date"
                label="Fecha"
                className=""
              />
            </div>
            {adicionales.publicacion.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.publicacion.map((adicional, index) => {
                  return (
                    <div key={index} className="flex gap-4 my-1">
                      <button
                        onClick={(e) =>
                          handleEliminarCampo(e, "publicacion", index)
                        }
                        className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <RiDeleteBack2Fill className="text-xl" />
                      </button>
                      {adicional.map((item, i) => {
                        return (
                          <div className="w-full" key={i}>
                            <Input
                              key={i}
                              onChange={(e) => {
                                handleChangeAdicionales(
                                  e.target.value,
                                  "publicacion",
                                  index,
                                  i
                                );
                              }}
                              value={adicionales.publicacion[index][i].value}
                              type={item.tipo}
                              label={item.label}
                              className=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("publicacion", [
                  { tipo: "text", label: "Lugar", value: "", alt: "lugar" },
                  { tipo: "text", label: "Editor", value: "", alt: "editor" },
                  { tipo: "date", label: "Fecha", value: "", alt: "fecha" },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="300 - Descripcion Fisica" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    descripcionFisica: {
                      extensionDEM: e.target.value,
                    },
                  });
                }}
                value={formData.descripcionFisica.extensionDEM}
                type="text"
                label="Extension y DEM"
                className=""
              />
            </div>
            {adicionales.descripcionFisica.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.descripcionFisica.map((adicional, index) => {
                  return (
                    <div key={index} className="flex gap-4 my-1">
                      <button
                        onClick={(e) =>
                          handleEliminarCampo(e, "descripcionFisica", index)
                        }
                        className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <RiDeleteBack2Fill className="text-xl" />
                      </button>
                      {adicional.map((item, i) => {
                        return (
                          <div className="w-full" key={i}>
                            <Input
                              key={i}
                              onChange={(e) => {
                                handleChangeAdicionales(
                                  e.target.value,
                                  "descripcionFisica",
                                  index,
                                  i
                                );
                              }}
                              value={
                                adicionales.descripcionFisica[index][i].value
                              }
                              type={item.tipo}
                              label={item.label}
                              className=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("descripcionFisica", [
                  {
                    tipo: "text",
                    label: "Extension y DEM",
                    value: "",
                    alt: "extensionDEM",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="440 - Coleccion" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    coleccion: {
                      titulo: e.target.value,
                      subserie: formData.coleccion.subserie,
                      volumen: formData.coleccion.volumen,
                    },
                  });
                }}
                value={formData.coleccion.titulo}
                type="text"
                label="Titulo"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    coleccion: {
                      titulo: formData.coleccion.titulo,
                      subserie: e.target.value,
                      volumen: formData.coleccion.volumen,
                    },
                  });
                }}
                value={formData.coleccion.subserie}
                type="text"
                label="Subserie"
                className=""
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    coleccion: {
                      titulo: formData.coleccion.titulo,
                      subserie: formData.coleccion.subserie,
                      volumen: e.target.value,
                    },
                  });
                }}
                value={formData.coleccion.volumen}
                label="Volumen"
                className=""
                type="number"
                pattern="[0-9]*"
              />
            </div>
            {adicionales.coleccion.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.coleccion.map((adicional, index) => {
                  return (
                    <div key={index} className="flex gap-4 my-1">
                      <button
                        onClick={(e) =>
                          handleEliminarCampo(e, "coleccion", index)
                        }
                        className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <RiDeleteBack2Fill className="text-xl" />
                      </button>
                      {adicional.map((item, i) => {
                        return (
                          <div className="w-full" key={i}>
                            <Input
                              key={i}
                              onChange={(e) => {
                                handleChangeAdicionales(
                                  e.target.value,
                                  "coleccion",
                                  index,
                                  i
                                );
                              }}
                              value={adicionales.coleccion[index][i].value}
                              type={item.tipo}
                              label={item.label}
                              className=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("coleccion", [
                  { tipo: "text", label: "Titulo", value: "", alt: "titulo" },
                  {
                    tipo: "text",
                    label: "Subserie",
                    value: "",
                    alt: "subserie",
                  },
                  {
                    tipo: "number",
                    label: "Volumen",
                    value: "",
                    alt: "volumen",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="650 - Termino de materia - controlado" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    terminoDeMateriaControlado: {
                      terminoDeMateriaControlado: e.target.value.toUpperCase(),
                    },
                  });
                }}
                value={formData.terminoDeMateriaControlado.terminoControlado}
                type="text"
                label="Termino Controlado"
                className="uppercase"
              />
            </div>
            {adicionales.terminoDeMateriaControlado.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.terminoDeMateriaControlado.map(
                  (adicional, index) => {
                    return (
                      <div key={index} className="flex gap-4 my-1">
                        <button
                          onClick={(e) =>
                            handleEliminarCampo(
                              e,
                              "terminoDeMateriaControlado",
                              index
                            )
                          }
                          className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <RiDeleteBack2Fill className="text-xl" />
                        </button>
                        {adicional.map((item, i) => {
                          return (
                            <div className="w-full" key={i}>
                              <Input
                                key={i}
                                onChange={(e) => {
                                  handleChangeAdicionales(
                                    e.target.value,
                                    "terminoDeMateriaControlado",
                                    index,
                                    i
                                  );
                                }}
                                value={
                                  adicionales.terminoDeMateriaControlado[index][
                                    i
                                  ].value
                                }
                                type={item.tipo}
                                label={item.label}
                                className=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("terminoDeMateriaControlado", [
                  {
                    tipo: "text",
                    label: "Termino Controlado",
                    value: "",
                    alt: "terminoControlado",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="651 - Termino de materia - geográfico" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    terminoDeMateriaGeografico: {
                      terminoDeMateriaGeografico: e.target.value.toUpperCase(),
                    },
                  });
                }}
                value={
                  formData.terminoDeMateriaGeografico.terminoDeMateriaGeografico
                }
                type="text"
                label="Termino de materia geografico"
                className="uppercase"
              />
            </div>
            {adicionales.terminoDeMateriaGeografico.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.terminoDeMateriaGeografico.map(
                  (adicional, index) => {
                    return (
                      <div key={index} className="flex gap-4 my-1">
                        <button
                          onClick={(e) =>
                            handleEliminarCampo(
                              e,
                              "terminoDeMateriaGeografico",
                              index
                            )
                          }
                          className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <RiDeleteBack2Fill className="text-xl" />
                        </button>
                        {adicional.map((item, i) => {
                          return (
                            <div className="w-full" key={i}>
                              <Input
                                key={i}
                                onChange={(e) => {
                                  handleChangeAdicionales(
                                    e.target.value,
                                    "terminoDeMateriaGeografico",
                                    index,
                                    i
                                  );
                                }}
                                value={
                                  adicionales.terminoDeMateriaGeografico[index][
                                    i
                                  ].value
                                }
                                type={item.tipo}
                                label={item.label}
                                className=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("terminoDeMateriaGeografico", [
                  {
                    tipo: "text",
                    label: "Termino de materia geografico",
                    value: "",
                    alt: "terminoDeMateriaGeografico",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="653 - Termino de materia - propuesto" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    terminoDeMateriaPropuesto: {
                      terminoPropuesto: e.target.value.toUpperCase(),
                    },
                  });
                }}
                value={formData.terminoDeMateriaPropuesto.terminoPropuesto}
                type="text"
                label="Termino de materia propuesto"
                className="uppercase"
              />
            </div>
            {adicionales.terminoDeMateriaPropuesto.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.terminoDeMateriaPropuesto.map(
                  (adicional, index) => {
                    return (
                      <div key={index} className="flex gap-4 my-1">
                        <button
                          onClick={(e) =>
                            handleEliminarCampo(
                              e,
                              "terminoDeMateriaPropuesto",
                              index
                            )
                          }
                          className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <RiDeleteBack2Fill className="text-xl" />
                        </button>
                        {adicional.map((item, i) => {
                          return (
                            <div className="w-full" key={i}>
                              <Input
                                key={i}
                                onChange={(e) => {
                                  handleChangeAdicionales(
                                    e.target.value,
                                    "terminoDeMateriaPropuesto",
                                    index,
                                    i
                                  );
                                }}
                                value={
                                  adicionales.terminoDeMateriaPropuesto[index][
                                    i
                                  ].value
                                }
                                type={item.tipo}
                                label={item.label}
                                className=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("terminoDeMateriaPropuesto", [
                  {
                    tipo: "text",
                    label: "Termino de materia propuesto",
                    value: "",
                    alt: "terminoPropuesto",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="600 - Termino de materia - nombre de persona" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    terminoDeMateriaNombreDePersona: {
                      nombre: e.target.value,
                    },
                  });
                }}
                value={formData.terminoDeMateriaNombreDePersona.nombre}
                type="text"
                label="Termino de materia nombre de persona"
              />
            </div>
            {adicionales.terminoDeMateriaNombreDePersona.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.terminoDeMateriaNombreDePersona.map(
                  (adicional, index) => {
                    return (
                      <div key={index} className="flex gap-4 my-1">
                        <button
                          onClick={(e) =>
                            handleEliminarCampo(
                              e,
                              "terminoDeMateriaNombreDePersona",
                              index
                            )
                          }
                          className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <RiDeleteBack2Fill className="text-xl" />
                        </button>
                        {adicional.map((item, i) => {
                          return (
                            <div className="w-full" key={i}>
                              <Input
                                key={i}
                                onChange={(e) => {
                                  handleChangeAdicionales(
                                    e.target.value,
                                    "terminoDeMateriaNombreDePersona",
                                    index,
                                    i
                                  );
                                }}
                                value={
                                  adicionales.terminoDeMateriaNombreDePersona[
                                    index
                                  ][i].value
                                }
                                type={item.tipo}
                                label={item.label}
                                className=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("terminoDeMateriaNombreDePersona", [
                  {
                    tipo: "text",
                    label: "Termino de materia nombre de persona",
                    value: "",
                    alt: "nombre",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="659 - Tema" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    tema: {
                      tema: e.target.value,
                    },
                  });
                }}
                value={formData.tema.tema}
                type="text"
                label="Tema"
              />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="500 - Nota General" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    notaGeneral: {
                      nota: e.target.value,
                    },
                  });
                }}
                value={formData.notaGeneral.nota}
                type="text"
                label="Nota General"
              />
            </div>
            {adicionales.notaGeneral.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.notaGeneral.map((adicional, index) => {
                  return (
                    <div key={index} className="flex gap-4 my-1">
                      <button
                        onClick={(e) =>
                          handleEliminarCampo(e, "notaGeneral", index)
                        }
                        className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <RiDeleteBack2Fill className="text-xl" />
                      </button>
                      {adicional.map((item, i) => {
                        return (
                          <div className="w-full" key={i}>
                            <Input
                              key={i}
                              onChange={(e) => {
                                handleChangeAdicionales(
                                  e.target.value,
                                  "notaGeneral",
                                  index,
                                  i
                                );
                              }}
                              value={adicionales.notaGeneral[index][i].value}
                              type={item.tipo}
                              label={item.label}
                              className=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("notaGeneral", [
                  {
                    tipo: "text",
                    label: "Nota General",
                    value: "",
                    alt: "nota",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="521 - Nivel" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    nivel: {
                      nivel: e.target.value,
                    },
                  });
                }}
                value={formData.nivel.nivel}
                type="text"
                label="Nivel"
              />
            </div>
            {adicionales.nivel.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.nivel.map((adicional, index) => {
                  return (
                    <div key={index} className="flex gap-4 my-1">
                      <button
                        onClick={(e) => handleEliminarCampo(e, "nivel", index)}
                        className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <RiDeleteBack2Fill className="text-xl" />
                      </button>
                      {adicional.map((item, i) => {
                        return (
                          <div className="w-full" key={i}>
                            <Input
                              key={i}
                              onChange={(e) => {
                                handleChangeAdicionales(
                                  e.target.value,
                                  "nivel",
                                  index,
                                  i
                                );
                              }}
                              value={adicionales.nivel[index][i].value}
                              type={item.tipo}
                              label={item.label}
                              className=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("nivel", [
                  {
                    tipo: "text",
                    label: "Nivel",
                    value: "",
                    alt: "nivel",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="520 - Resumen" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    resumen: {
                      resumen: e.target.value,
                    },
                  });
                }}
                value={formData.resumen.resumen}
                type="text"
                label="Resumen"
              />
            </div>
            {adicionales.resumen.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.resumen.map((adicional, index) => {
                  return (
                    <div key={index} className="flex gap-4 my-1">
                      <button
                        onClick={(e) =>
                          handleEliminarCampo(e, "resumen", index)
                        }
                        className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <RiDeleteBack2Fill className="text-xl" />
                      </button>
                      {adicional.map((item, i) => {
                        return (
                          <div className="w-full" key={i}>
                            <Input
                              key={i}
                              onChange={(e) => {
                                handleChangeAdicionales(
                                  e.target.value,
                                  "resumen",
                                  index,
                                  i
                                );
                              }}
                              value={adicionales.resumen[index][i].value}
                              type={item.tipo}
                              label={item.label}
                              className=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("resumen", [
                  {
                    tipo: "text",
                    label: "Resumen",
                    value: "",
                    alt: "resumen",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>

          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="856 - Dirección electronica" />
            <div className="flex gap-4 my-1">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    direccionElectronica: {
                      nombre: e.target.value,
                      direccion: formData.direccionElectronica.direccion,
                    },
                  });
                }}
                value={formData.direccionElectronica.nombre}
                type="text"
                label="Nombre"
              />
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    direccionElectronica: {
                      nombre: formData.direccionElectronica.nombre,
                      direccion: e.target.value,
                    },
                  });
                }}
                value={formData.direccionElectronica.direccion}
                type="text"
                label="Direccion URL"
              />
            </div>
            {adicionales.direccionElectronica.length > 0 ? (
              <div className="flex flex-col">
                {adicionales.direccionElectronica.map((adicional, index) => {
                  return (
                    <div key={index} className="flex gap-4 my-1">
                      <button
                        onClick={(e) =>
                          handleEliminarCampo(e, "direccionElectronica", index)
                        }
                        className="absolute right-[4%] lg:right-[5%] p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <RiDeleteBack2Fill className="text-xl" />
                      </button>
                      {adicional.map((item, i) => {
                        return (
                          <div className="w-full" key={i}>
                            <Input
                              key={i}
                              onChange={(e) => {
                                handleChangeAdicionales(
                                  e.target.value,
                                  "direccionElectronica",
                                  index,
                                  i
                                );
                              }}
                              value={
                                adicionales.direccionElectronica[index][i].value
                              }
                              type={item.tipo}
                              label={item.label}
                              className=""
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div
              onClick={() => {
                handleAgregarCampos("direccionElectronica", [
                  {
                    tipo: "text",
                    label: "Nombre",
                    value: "",
                    alt: "nombre",
                  },
                  {
                    tipo: "text",
                    label: "Direccion URL",
                    value: "",
                    alt: "direccion",
                  },
                ]);
              }}
              className="w-full bg-blue-gray-300 flex items-center justify-center rounded mt-4 hover:bg-blue-gray-200 cursor-pointer"
            >
              <IoAddCircleOutline className="text-2xl text-white my-1" />
            </div>
          </div>
          <div className="w-full col-span-2 ">
            <DivisorCategoria titulo="859 - Localizacion, acceso y control" />
            <div className="flex gap-4">
              <Input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    localizacionAccesoControl: {
                      procedencia:
                        formData.localizacionAccesoControl.procedencia,
                      proveedor: e.target.value,
                      estado: formData.localizacionAccesoControl.estado,
                    },
                  });
                }}
                value={formData.localizacionAccesoControl.proveedor}
                type="text"
                label="Proveedor"
              />
              <Select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    localizacionAccesoControl: {
                      procedencia: e,
                      proveedor: formData.localizacionAccesoControl.proveedor,
                      estado: formData.localizacionAccesoControl.estado,
                    },
                  });
                }}
                id="estado"
                label="Procedencia"
                value={formData.localizacionAccesoControl.procedencia}
              >
                <Option value="Compra">Compra</Option>
                <Option value="Donacion">Donacion</Option>
                <Option value="Canje">Canje</Option>
              </Select>

              <Select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    localizacionAccesoControl: {
                      procedencia:
                        formData.localizacionAccesoControl.procedencia,
                      proveedor: formData.localizacionAccesoControl.proveedor,
                      estado: e,
                    },
                  });
                }}
                id="estado"
                label="Estado"
                value={formData.localizacionAccesoControl.estado}
              >
                <Option value="Alta">Alta</Option>
                <Option value="Baja">Baja</Option>
              </Select>
            </div>
          </div>

          <div className="w-full flex justify-center items-center col-span-2">
            <Button
              /*   disabled={enviando ? true : false} */
              onClick={(e) => handleSubmit(e)}
              className="w-1/2 flex items-center justify-center text-[0.80rem] bg-biblio hover:bg-biblio-200"
            >
              Cargar
              <MdUploadFile className="text-[1.3rem] ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CargarArchivo;
