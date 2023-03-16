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

      {/*   <div className="w-full col-span-2 border-2 border-blue-500 rounded-xl p-2 mt-2">
        <p className="uppercase text-blue-500 font-semibold text-center">
          Categorias
        </p>
        <div className="mt-2 grid grid-cols-3 grid-rows-2 place-content-center gap-4">
          <div id="marchas" className="flex items-center justify-center">
            <Checkbox
              onChange={() => {
                const nextChecks = {
                  ...categorias,
                  marchas: !categorias.marchas,
                };
                setCategorias(nextChecks);
              }}
              color="blue"
              checked={categorias.marchas}
            />
            <label>Marchas</label>
          </div>
          <div id="historia" className="flex items-center justify-center">
            <Checkbox
              onChange={() => {
                const nextChecks = {
                  ...categorias,
                  historia: !categorias.historia,
                };
                setCategorias(nextChecks);
              }}
              color="blue"
              checked={categorias.historia}
            />
            <label>Historia</label>
          </div>
          <div id="lucha" className="flex items-center justify-center">
            <Checkbox
              onChange={() => {
                const nextChecks = {
                  ...categorias,
                  lucha: !categorias.lucha,
                };
                setCategorias(nextChecks);
              }}
              color="blue"
              checked={categorias.lucha}
            />
            <label>Lucha</label>
          </div>
          <div id="orgullo" className="flex items-center justify-center">
            <Checkbox
              onChange={() => {
                const nextChecks = {
                  ...categorias,
                  orgullo: !categorias.orgullo,
                };
                setCategorias(nextChecks);
              }}
              color="blue"
              checked={categorias.orgullo}
            />
            <label>Orgullo</label>
          </div>
          <div id="talleres" className="flex items-center justify-center">
            <Checkbox
              onChange={() => {
                const nextChecks = {
                  ...categorias,
                  talleres: !categorias.talleres,
                };
                setCategorias(nextChecks);
              }}
              color="blue"
              checked={categorias.talleres}
            />
            <label>Talleres</label>
          </div>
          <div id="activismo" className="flex items-center justify-center">
            <Checkbox
              onChange={() => {
                const nextChecks = {
                  ...categorias,
                  activismo: !categorias.activismo,
                };
                setCategorias(nextChecks);
              }}
              color="blue"
              checked={categorias.activismo}
            />
            <label>Activismo</label>
          </div>
        </div>
      </div> */}
      <Button
        className="mt-2 w-10/12 flex items-center justify-center"
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
