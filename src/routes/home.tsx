import Avatar from "../assets/Myself.png";
import "./home.scss";

export const Home = () => {
  return (
    <div className="pt-4 w-9/12 mx-auto">
      <div className="hero-page flex flex-col justify-center items-center gap-8">
        <img src={`${Avatar}`} alt="Me" className="h-[300px] w-[300px]" />
        <span className="w-60 font-regular">
          Hello! My name is Davor Kirbiš and I am a <a href="#"className="font-semibold px-1 py-1">UX Engineer</a>{" "}
        </span>
      </div>
    </div>
  );
};
