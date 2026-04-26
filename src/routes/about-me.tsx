import { Blockquote, Button, ThemeIcon } from "@mantine/core";
import {
  IconBrandFlickr,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconMailFilled,
  IconDownload,
} from "@tabler/icons-react";
import Avatar from "../assets/Me3.jpeg";
import { Trans, useTranslation } from "react-i18next";

export const AboutMe = () => {
  const { t } = useTranslation();
  return (
    <div className="w-11/12 mx-auto pt-16">
      <div className="hero-page flex flex-col px-16 md:px-0 md:flex-row justify-center gap-8 ">
        <div className="flex flex-col gap-10 align-center">
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
              {t("aboutMe.downloadResume")}{" "}
              <span className="text-sm"> {t("aboutMe.fileSize")}</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl md:leading-normal leading-relaxed">
              <Trans i18nKey="aboutMe.heading.foreword" components={{ strong: <strong /> }} />{" "}
              <br className="hidden md:block" />{" "}
              <Trans i18nKey="aboutMe.heading.role" components={{ strong: <strong /> }} />
            </h1>
          </div>

          <p className="text-lg leading-relaxed">
            <Trans
              i18nKey="aboutMe.ExperienceParagraph.p1"
              components={{
                strong: <strong />,
                a: (
                  <a
                    className="sportradar-link"
                    href="https://sportradar.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              }}
            />
          </p>
          <p className="text-lg leading-relaxed">
            <Trans i18nKey="aboutMe.ExperienceParagraph.p2" components={{ strong: <strong /> }} />
          </p>
          <p className="text-lg leading-relaxed">
            <Trans i18nKey="aboutMe.ExperienceParagraph.p3" components={{ strong: <strong /> }} />
          </p>
          <Blockquote color="cyan" mt="xl">
            {t("aboutMe.hobbies")}
          </Blockquote>
        </div>
      </div>
    </div>
  );
};
