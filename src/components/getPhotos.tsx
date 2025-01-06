import React, { useState, useEffect } from "react";
import md5 from "md5";

// Interfaces (adjust as needed)
interface FlickrPhoto {
  id: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
}

interface FlickrPhotosetPhotosResponse {
  photoset: {
    photo: FlickrPhoto[];
    total: string; // Important: This tells you the total number of photos
  };
}

const FlickrGallery: React.FC = () => {
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);
  const apiKey = "e3fb3c13cbd0bb06606b8d81c3d1b1d5";
  const apiSecret = "fc9987b952ff08b2";
  const userId = "131679845@N02";
  const photosetId = "72177720314043367";

  const generateFlickrUrl = (params: { [key: string]: string | number }) => {
    // ... (same as before)
  };

  useEffect(() => {
    const fetchAllPhotos = async () => {
      if (!photosetId) return;

      let allPhotos: FlickrPhoto[] = [];
      let currentPage = 1;

      while (true) {
        try {
          const params = {
            method: "flickr.photosets.getPhotos",
            api_key: apiKey,
            photoset_id: photosetId,
            user_id: userId,
            format: "json",
            nojsoncallback: 1,
            per_page: 500, // Max per page
            page: currentPage,
          };

          const flickrUrl = generateFlickrUrl(params);
          const response = await fetch(flickrUrl);
          console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: FlickrPhotosetPhotosResponse = await response.json();
          const currentPhotos = data.photoset.photo;

          allPhotos = allPhotos.concat(currentPhotos);

          const totalPhotos = parseInt(data.photoset.total, 10);
          const photosReceived = allPhotos.length;

          if (photosReceived >= totalPhotos || currentPhotos.length === 0) {
            break; // All photos retrieved
          }

          currentPage++;
        } catch (error) {
          console.error("Error fetching photos:", error);
          return; // Stop fetching on error
        }
      }
      setPhotos(allPhotos);
    };

    fetchAllPhotos();
  }, [photosetId]);

  const generateFlickrPhotoUrl = (photo: FlickrPhoto) => {
    // ... (same as before)
  };

  return (
    <div>
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={generateFlickrPhotoUrl(photo)}
          alt={photo.title || "Flickr Photo"}
        />
      ))}
    </div>
  );
};

export default FlickrGallery;
