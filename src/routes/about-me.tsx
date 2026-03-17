import Avatar from "../assets/Myself.png";
import "./about-me.scss";
import { Blockquote } from "@mantine/core";

export const AboutMe = () => {
  return (
    <div className="w-10/12 mx-auto pt-16">
      <div className="hero-page flex flex-col md:flex-row justify-center gap-8 ">
        <div className="flex flex-col gap-10 ">
          <img
            src={`${Avatar}`}
            alt="Me"
            className="md:h-[300px] md:w-[300px] h-[200px] w-[200px] self-center md:self-start avatar"
          />
         <Blockquote color="cyan" mt="xl" className="hidden md:block ">
         Outside of work, I enjoy photography — I shoot with a Sony Alpha 6000 and a growing collection of APS-C lenses. I also like bouldering, gaming, and these days I spend a lot of my free time exploring the world together with my one-year-old daughter.
    </Blockquote>

        </div>
        <div className="flex flex-col gap-4">
     <div className="flex flex-col gap-2">

          <h1 className="text-3xl md:text-5xl leading-relaxed">
            My name is <strong>Davor</strong> 
            
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold cyan-700" > UX Engineer </h2>
            <h3 className="italic text-base md:text-lg ">A product designer with a strong love for code.</h3> 

     </div>


          <p className="text-lg leading-relaxed">
            Over the past <strong>10 years working across UX design and frontend engineering</strong>, I've developed a strong intuition for turning design ideas into real, maintainable interfaces.
          </p>
          <p className="text-lg leading-relaxed">
            My current title is <strong>Senior Software Engineer</strong>, but the role I identify with most is <strong>UX Engineer</strong>, working between design and engineering to build scalable interfaces and design systems. I enjoy building systems that help developers move faster and bridge the gap between <strong>design and engineering</strong>.
          </p>
          <p className="text-lg leading-relaxed">
            Most of my work has been done inside <strong>large enterprise environments</strong>, where NDAs prevent me from sharing the actual products. What I can share, however, are the ideas, challenges, and lessons behind them — something I'm always happy to talk about in an interview.
          </p>
          <p className="text-lg leading-relaxed">
            <strong>My current weapons of choice are Figma, VS Code, React, SCSS, and the occasional witty conversation about design systems.</strong>
          </p>
          <Blockquote color="cyan" mt="xl" className="md:hidden block">
         Outside of work, I enjoy photography — I shoot with a Sony Alpha 6000 and a growing collection of APS-C lenses. I also like bouldering, gaming, and these days I spend a lot of my free time exploring the world together with my one-year-old daughter.
    </Blockquote>
        </div>
      </div>
    </div>
  );
};
