import Avatar from "../assets/Myself.png";
import "./about-me.scss";

export const AboutMe = () => {
  return (
    <div className="pt-4 w-9/12 mx-auto">
      <div className="hero-page flex flex-col justify-center gap-8">
        <div className="flex gap-10 ">
          <img
            src={`${Avatar}`}
            alt="Me"
            className="h-[300px] w-[300px] self-center avatar"
          />
        </div>
      </div>
    </div>
  );
};
