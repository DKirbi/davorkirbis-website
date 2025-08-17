import React, { useState, useEffect } from "react";

// Interfaces (adjust as needed)
interface FlickrPhoto {
  id: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  link: string;
}

const FlickrGallery: React.FC = () => {
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function getData() {
      const url =
        "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=4118e30be6408bfb2658851603f796d5&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1";
      try {
        const response = await fetch(url);

        const result = await response.json();
        const drilledDownResult = result.photos.photo;
        console.log(result.photos.photo);

        setLoading(true);
        setError(null);
        setPhotos(drilledDownResult);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Unknown error fetching photos";
        console.error(message);
        setError(message);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  /* Way images are generated:
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
	or
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
	or
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
*/

  const buildPhotoUrl = (p: FlickrPhoto) => {
    // Every statement needs their own return
    return `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`;
  };

  if (loading) return <div> Loading Photos ...</div>;

  if (error) return <div> Error loading photos: {error}</div>;

  return (
    <div>
      {photos.map((photo, index) => (
        <div>
          <img src={buildPhotoUrl(photo)} alt={photo.title} key={index} />
          {photo.title}
        </div>
      ))}
    </div>
  );
};
export default FlickrGallery;
