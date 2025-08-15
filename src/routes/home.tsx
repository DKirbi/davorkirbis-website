import Avatar from "../assets/Myself.png";
import "./home.scss";

export const Home = () => {
  return (
    <div className="pt-4 w-9/12 mx-auto">
      <div className="hero-page flex flex-col justify-center gap-8">
        <div className="flex gap-10 ">
          <img
            src={`${Avatar}`}
            alt="Me"
            className="h-[300px] w-[300px] self-center"
          />
          <div className="flex flex-col intro-text">
            <h1 className="font-semibold Entry-text">Hi there!</h1>
            <h1 className="font-semibold Entry-text">
              I am <span className="underline">Davor</span>
            </h1>
            <h1 className="font-semibold Entry-text pink-shadow">
              UX Engineer
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
