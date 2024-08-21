import Avatar from "../assets/Myself.png";

export const Home = () => {
  return (
    <div>
      <div className="hero-page">
        <img src={`${Avatar}`} alt="Me" />
        <span>
          Hello! My name is Davor Kirbiš and I am a <a href="#">UX Engineer</a>{" "}
        </span>
      </div>
    </div>
  );
};
