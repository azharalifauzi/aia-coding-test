import fetch from 'node-fetch';
import { Request, Response } from 'express';

export const getPhotos = async (req: Request, res: Response) => {
  const { limit = 10, search, page = 1 } = req.query;

  let flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_API_KEY}&privacy_filter=1&media=photos&per_page=${limit}&page=${page}&format=json&nojsoncallback=1&extras=owner_name,views`;

  if (search) flickrUrl = `${flickrUrl}&tags=${search}`;

  const response = await fetch(flickrUrl);

  const flickrData: FlickrPhotosResponse = await response.json();

  res.send({
    message: 'OK',
    data: {
      maxPage: flickrData.photos.pages,
      total: flickrData.photos.total,
      page: flickrData.photos.page,
      length: flickrData.photos.perpage,
      photos: Array.from(
        flickrData.photos.photo || [],
        ({ id, title, server, secret, ownername, views }) => ({
          id,
          title,
          url: `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`,
          ownername,
          views,
        })
      ),
    },
  });
};
