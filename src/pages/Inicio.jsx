import { Typography } from "@material-tailwind/react";
import { MdOutlineBarChart } from "react-icons/md";
import banner from "../assets/banner.svg";

import { useContext } from "react";
import { Context } from "../context/context";
const Inicio = () => {
  const { totalArchivosDB } = useContext(Context);

  return (
    <div className=" ml-auto bg-blue-gray-100 h-screen flex flex-col justify-start items-center">
      <div className="w-10/12">
        <div className="bg-white rounded-xl mt-10 p-4 w-10/12 mx-auto">
          <Typography className="text-xl text-center " variant="h1">
            Bienvenidx a el sistema de carga de la Biblioteca Arcoiris
          </Typography>
        </div>
        <div className="grid grid-cols-12 grid-rows-2 gap-2 mt-4">
          <div className="col-span-8 bg-white p-4 rounded-xl">
            <Typography className="w-10/12 mx-auto" variant="paragraph">
              Para comenzar a operar puede elegir la accion deseada en el menu
              lateral. Si necesita ayuda puede consultar la guia de uso paso a
              paso{" "}
              <a className="text-blue-400" href="#">
                aqui
              </a>
              .
            </Typography>
            <Typography className="w-10/12 mx-auto" variant="paragraph">
              Para dudas o sugerencias o contacto con los administradores. Puede
              escribir a el siguiente email{" "}
              <span className="font-bold italic">copade@copade.gov.ar</span>
            </Typography>
          </div>
          <div className="bg-white p-4 rounded-xl col-span-4">
            <Typography
              className="text-xl text-center flex items-center justify-center border-b-2 mb-4"
              variant="h4"
            >
              <MdOutlineBarChart className="text-xl mr-1" />
              Estadisticas
            </Typography>
            <div>
              <ul className="flex items-center justify-around gap-2">
                <li className=" rounded-xl p-2 flex flex-col bg-cyan-200">
                  <Typography
                    className="text-xs text-center font-bold underline"
                    variant="paragraph"
                  >
                    Total de Archivos:
                  </Typography>
                  <p className="text-xl no-underline text-center font-bold italic">
                    {totalArchivosDB}
                  </p>
                </li>
                <li className=" rounded-xl p-2 flex flex-col bg-cyan-200">
                  <Typography
                    className="text-xs text-center font-bold underline"
                    variant="paragraph"
                  >
                    Total de Colecciones:
                  </Typography>
                  <p className="text-xl no-underline text-center font-bold italic">
                    134
                  </p>
                </li>
                <li className=" rounded-xl p-2 flex flex-col bg-cyan-200">
                  <Typography
                    className="text-xs text-center font-bold underline"
                    variant="paragraph"
                  >
                    Cargas del mes:
                  </Typography>
                  <p className="text-xl no-underline text-center font-bold italic">
                    13
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white col-span-12 grid rounded-xl place-items-center px-2">
            <img className="w-10/12" src={banner} alt="" srcset="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
