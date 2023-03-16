import { Button, Input, Typography } from "@material-tailwind/react";
import React from "react";
import corazon from "../assets/corazon.jpg";
import { MdPersonOutline, MdLockOutline } from "react-icons/md";

const Login = () => {
  return (
    <>
      <div className="bg-blue-gray-100 h-screen w-[85vw] ml-auto">
        <Typography variant="h1" className="text-3xl font-bold  pl-5 pt-5">
          BIBLIOTECA 🏳‍🌈
        </Typography>
        <div className="flex justify-center items-center ">
          <div className="h-80 flex justify-between items-center rounded-xl bg-white my-4 w-[40vw] p-4">
            <div className="w-1/2">
              <form className="w-11/12 mx-auto " action="">
                <Input label="Usuario" icon={<MdPersonOutline />}></Input>
                <div className="h-4"></div>
                <Input
                  type="password"
                  label="Contraseña"
                  icon={<MdLockOutline />}
                ></Input>
                <div className="w-full mx-auto flex flex-col items-center justify-center">
                  <a className="text-blue-400 text-sm italic mt-2" href="#">
                    Olvide mi contraseña
                  </a>
                  <Button className="w-8/12 my-2" size="sm">
                    Ingresar
                  </Button>
                  <Typography variant="paragraph" className="text-sm mt-2">
                    No tiene cuenta?{" "}
                    <a className="text-blue-400 italic" href="#">
                      Registrarse ahora!
                    </a>
                  </Typography>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center w-1/2">
              <img
                className="w-44 "
                src={corazon}
                alt="Corazon con colores lgbt"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
