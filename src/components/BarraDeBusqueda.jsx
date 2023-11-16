import { Button, Input, Checkbox } from "@material-tailwind/react";
import { useState, useContext } from "react";
import { Context } from "../context/context.js";
import { MdSearch } from "react-icons/md";

const BarraDeBusqueda = () => {
  const [busqueda, setBusqueda] = useState("");

  const { handleBusqueda } = useContext(Context);

  return (
    <div className="flex flex-col items-center">
      <Input
        value={busqueda}
        label="Nombre del archivo"
        type="text"
        onChange={(e) => {
          setBusqueda(e.target.value);
          handleBusqueda(e.target.value);
        }}
      />

      <Button
        className="mt-2 w-10/12 flex items-center justify-center bg-biblio-500"
        onClick={() => {
          handleBusqueda(busqueda);
        }}
      >
        Buscar
        <MdSearch className="ml-1 text-lg" />
      </Button>
    </div>
  );
};

export default BarraDeBusqueda;
