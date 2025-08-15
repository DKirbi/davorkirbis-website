import { useEffect, useState } from "react";

type Characters = {
  id: number;
  name: string;
  image: string;
};

export const GetPhotos = () => {
  const [data, setData] = useState<Characters[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.sampleapis.com/avatar/characters",
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (err: unknown) {
      //@ts-expect-error err is always unknown
      setData(err.message);
    }
  };

  const trimUrl = (url: string) => url.replace(/(\.png).*$/, "$1");

  return (
    <div className="flex flex-wrap relative">
      {data.map((movie) => (
        <div
          key={movie.id}
          className="relative border-solid border border-cyan-500"
        >
          <img
            src={trimUrl(movie.image)}
            alt={movie.name}
            className="w-[500px] h-[auto] "
          />
          <div className="absolute top-0 opacity-0 hover:opacity-100 hover:cursor-pointer w-full h-full">
            {movie.name}
          </div>
        </div>
      ))}
    </div>
  );
};
