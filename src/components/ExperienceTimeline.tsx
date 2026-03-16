import { experience } from "@/data/experience";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";

export function ExperienceTimeline() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="w-full">
      <Carousel
        opts={{ align: "center" }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {experience.map((item, index) => (
            <CarouselItem key={item.id} className="basis-2/3">
              <Card
                className={`h-full flex flex-col transition-opacity duration-300 ${
                  index === current
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80 cursor-pointer"
                }`}
                onClick={() => {
                  if (index !== current) api?.scrollTo(index);
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">
                    {item.company}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.period.start} &ndash; {item.period.end}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-sm leading-relaxed">{item.highlight}</p>
                  <div className="flex flex-col gap-2">
                    {item.description
                      .trim()
                      .split(/\n\n+/)
                      .map((paragraph, i) => (
                        <p key={i} className="text-sm leading-relaxed">
                          {paragraph.trim()}
                        </p>
                      ))}
                  </div>
                  {item.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
