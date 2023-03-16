import corazon from "../assets/corazon-arcoiris.svg";
const LoaderArcoiris = () => {
  return (
    <div className="flex flex-col justify-between items-center my-10 h-32">
      <h1 className="text-xl font-semibold">Cargando...</h1>
      <img src={corazon} alt="" className=" animate-bounce w-16" />
    </div>
  );
};

export default LoaderArcoiris;
