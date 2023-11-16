import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  MdOutlineHome,
  MdUploadFile,
  MdOutlineCollectionsBookmark,
  MdHelp,
  MdOutlineBarChart,
  MdCancel,
  MdMenu,
} from "react-icons/md";
import logo from "../assets/logo-f-azul.svg";
import { useContext } from "react";
import { Context } from "../context/context.js";

const Sidemenu = () => {
  const { menu, setMenu } = useContext(Context);

  return (
    <div
      className={`w-[10vw] flex flex-col fixed items-center justify-start shadow-xl shadow-white  bg-biblio-500 text-white h-screen top-0 ${
        menu ? "left-0" : "-left-72"
      } duration-500 z-50`}
    >
      <div
        onClick={() => setMenu(!menu)}
        className={`${
          menu ? "block ml-auto" : "fixed"
        } flex justify-end items-end left-1 top-24 duration-500`}
      >
        <div className="bg-biblio-500 p-2 rounded-full flex justify-end">
          {menu ? (
            <MdCancel className=" text-3xl hover:scale-105 duration-500" />
          ) : (
            <MdMenu className=" text-2xl" />
          )}
        </div>
      </div>

      <img src={logo} alt="logo" className="h-16" />
      <ul className="w-full">
        <Link
          onClick={() => setMenu(!menu)}
          to={"inicio"}
          className="flex items-center w-full p-2 border-b-[1px] border-t-[1px] border-biblio-500 border-t-white cursor-pointer hover:bg-biblio-200 duration-500"
        >
          <MdOutlineHome className="text-lg" />
          <Typography className="ml-2 text-sm" variant="paragraph">
            Inicio
          </Typography>
        </Link>
        <Link
          onClick={() => setMenu(!menu)}
          to={"cargar-archivo"}
          className="flex items-center w-full p-2 border-b-[1px] cursor-pointer border-biblio-500 hover:bg-biblio-200 duration-500"
        >
          <MdUploadFile className="text-lg" />
          <Typography className="ml-2 text-sm" variant="paragraph">
            Cargar Archivo
          </Typography>
        </Link>
        <Link
          onClick={() => setMenu(!menu)}
          to={"lista"}
          className="flex items-center w-full p-2 border-b-[1px] cursor-pointer border-biblio-500 hover:bg-biblio-200 duration-500"
        >
          <MdOutlineCollectionsBookmark className="text-lg" />
          <Typography className="ml-2 text-sm" variant="paragraph">
            Ver colecciones
          </Typography>
        </Link>
        {/*     <Link
          onClick={() => setMenu(!menu)}
          to={"estadisticas"}
          className="flex items-center w-full p-2 border-b-[1px] cursor-pointer border-biblio-500 hover:bg-biblio-200 duration-500"
        >
          <MdOutlineBarChart className="text-lg" />
          <Typography className="ml-2 text-sm" variant="paragraph">
            Estadisticas
          </Typography>
        </Link> */}
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
