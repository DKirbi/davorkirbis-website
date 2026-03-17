import { Blockquote, Button, ThemeIcon } from "@mantine/core";
import {
  IconBrandFlickr,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconMailFilled,
  IconDownload,
} from "@tabler/icons-react";
import Avatar from "../assets/Me3.jpeg";

export const AboutMe = () => {
  return (
    <div className="w-11/12 mx-auto pt-16">
      <div className="hero-page flex flex-col md:flex-row justify-center gap-8 ">
        <div className="flex flex-col gap-10 align-middle justify-center">
          <img
            src={`${Avatar}`}
            alt="Me"
            className="md:h-[300px] md:w-[auto] h-[200px] w-[auto] self-center rounded-xl object-cover saturate-[0.1] hover:saturate-100 transition-all duration-300"
          />
          <div className="buttons-wrapper flex flex-col gap-4">
            <div className="icons-container flex flex-row gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/davorkirbis/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <ThemeIcon size="lg" variant="filled" color="cyan">
                  <IconBrandLinkedin style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ThemeIcon>
              </a>
              <a
                href="https://www.flickr.com/photos/davorkirbis/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Flickr"
              >
                <ThemeIcon size="lg" variant="filled" color="cyan">
                  <IconBrandFlickr style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ThemeIcon>
              </a>
              <a
                href="https://github.com/DKirbi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <ThemeIcon size="lg" variant="filled" color="cyan">
                  <IconBrandGithubFilled style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ThemeIcon>
              </a>
              <a href="mailto:davor.kirbis@gmail.com" aria-label="Email">
                <ThemeIcon size="lg" variant="filled" color="cyan">
                  <IconMailFilled style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ThemeIcon>
              </a>
            </div>
            <Button
              className="self-center"
              fullWidth={false}
              variant="outline"
              color="cyan"
              rightSection={<IconDownload size={14} />}
              component="a"
              href="/CV_DavorK.pdf"
              download="CV_DavorK.pdf"
            >
              Download Resume <span className="text-sm"> (1.9 MB .PDF)</span>
            </Button>
          </div>

          <Blockquote color="cyan" mt="xl" className="hidden md:block ">
            Outside of work, I enjoy photography — I shoot with a Sony Alpha 6000 and a growing
            collection of APS-C lenses. I also like bouldering, gaming, and these days I spend a lot
            of my free time exploring the world together with my one-year-old daughter.
          </Blockquote>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl md:leading-normal leading-relaxed">
              I'm <strong>Davor</strong> — <br /> a <strong>UX Engineer</strong>
            </h1>
            <h3 className="italic text-base md:text-lg">
              Bridging design and engineering through scalable interfaces and design systems.
            </h3>
          </div>

          <p className="text-lg leading-relaxed">
            Over <strong>10 years across UX design and frontend engineering</strong>, I've built
            interfaces, led design system initiatives, and helped teams move from inconsistency to
            shared, scalable UI infrastructure.
          </p>
          <p className="text-lg leading-relaxed">
            Most recently I've operated as a <strong>Tech Lead and Design System Engineer</strong>{" "}
            at Sportradar, owning a React component library adopted across a large internal
            developer community. I mentor engineers, define component APIs, and drive developer
            experience improvements — all while staying close to the code.
          </p>
          <p className="text-lg leading-relaxed">
            Much of my work lives under NDA, but the thinking behind it doesn't.{" "}
            <strong>
              I'm always happy to walk through challenges and decisions in an interview.
            </strong>
          </p>
          <Blockquote color="cyan" mt="xl" className="md:hidden block">
            Outside of work, I enjoy photography — I shoot with a Sony Alpha 6000 and a growing
            collection of APS-C lenses. I also like bouldering, gaming, and these days I spend a lot
            of my free time exploring the world together with my one-year-old daughter.
          </Blockquote>
        </div>
      </div>
    </div>
  );
};
