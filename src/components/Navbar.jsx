import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import { MdSearch } from "react-icons/md";
import avatar from "../assets/avatar.jpg";
import { useState, useContext } from "react";
import { Context } from "../context/context.js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-f-azul.svg";

const Navbar = () => {
  const [busqueda, setBusqueda] = useState("");

  const { handleBusqueda } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="flex items-center bg-biblio-500 text-white">
      {/* <h1 className="w-[15vw] flex justify-center items-center text-center text-xl bg-biblio-500">
        <img src={logo} alt="logo" className="w-8/12" />
      </h1> */}
      <img src={logo} alt="logo" className="h-20 ml-2" />
      <div className="flex items-center py-2 px-6 justify-between  bg-biblio-500 border-l-2 border-biblio ml-auto">
        <div className="flex items-center "></div>

        <div className="flex items-center">
          <Typography className="font-bold text-xs pr-2" variant="paragraph">
            Maria Usuario
          </Typography>
          <Avatar variant="circular" src={avatar} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
