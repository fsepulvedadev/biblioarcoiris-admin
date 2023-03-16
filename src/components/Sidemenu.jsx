import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  MdOutlineHome,
  MdUploadFile,
  MdOutlineCollectionsBookmark,
  MdHelp,
  MdOutlineBarChart,
} from "react-icons/md";

const Sidemenu = () => {
  return (
    <div className="w-[15vw] flex flex-col fixed items-center justify-start  bg-biblio-500 text-white h-screen">
      <ul className="w-full">
        <Link
          to={"inicio"}
          className="flex items-center w-full p-2 border-b-[1px] border-t-[1px] border-biblio-500 border-t-white cursor-pointer hover:bg-biblio-200 duration-500"
        >
          <MdOutlineHome className="text-lg" />
          <Typography className="ml-2 text-sm" variant="paragraph">
            Inicio
          </Typography>
        </Link>
        <Link
          to={"cargar-archivo"}
          className="flex items-center w-full p-2 border-b-[1px] cursor-pointer border-biblio-500 hover:bg-biblio-200 duration-500"
        >
          <MdUploadFile className="text-lg" />
          <Typography className="ml-2 text-sm" variant="paragraph">
            Cargar Archivo
          </Typography>
        </Link>
        <Link
          to={"lista"}
          className="flex items-center w-full p-2 border-b-[1px] cursor-pointer border-biblio-500 hover:bg-biblio-200 duration-500"
        >
          <MdOutlineCollectionsBookmark className="text-lg" />
          <Typography className="ml-2 text-sm" variant="paragraph">
            Ver colecciones
          </Typography>
        </Link>
        <Link
          to={"estadisticas"}
          className="flex items-center w-full p-2 border-b-[1px] cursor-pointer border-biblio-500 hover:bg-biblio-200 duration-500"
        >
          <MdOutlineBarChart className="text-lg" />
          <Typography className="ml-2 text-sm" variant="paragraph">
            Estadisticas
          </Typography>
        </Link>
      </ul>
      <ul className="w-full justify-end">
        <li className="p-2  cursor-pointer w-full mt-10">
          <Typography
            className=" italic text-xs text-gray-600"
            variant="paragraph"
          >
            Soporte
          </Typography>
        </li>
        <li className="flex items-center w-full p-2 cursor-pointer border-b-[1px] border-biblio-500 hover:bg-biblio-200 duration-500">
          <MdHelp className="" />
          <Typography className="ml-2 text-xs font-bold" variant="paragraph">
            Acerca de
          </Typography>
        </li>
      </ul>
    </div>
  );
};

export default Sidemenu;
