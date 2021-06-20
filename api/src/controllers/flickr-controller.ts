import fetch from 'node-fetch';
import { Request, Response } from 'express';

export const getPhotos = async (req: Request, res: Response) => {
  const { limit = 10, search, page = 1 } = req.query;

  let flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_API_KEY}&privacy_filter=1&media=photos&per_page=${limit}&page=${page}&format=json&nojsoncallback=1&extras=owner_name,views&sort=interestingness-desc`;

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

export const getPhotoDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const resDetail = await fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${process.env.FLICKR_API_KEY}&photo_id=${id}&format=json&nojsoncallback=1`
  );

  const dataDetail = await resDetail.json();

  if (dataDetail.code === 1) {
    res.status(404).send({ message: 'Not Found', data: null });
    return;
  }

  res.send({
    message: 'OK',
    data: {
      id: dataDetail.photo.id,
      photo: {
        id: dataDetail.photo.id,
        secret: dataDetail.photo.secret,
        server: dataDetail.photo.server,
        url: `https://live.staticflickr.com/${dataDetail.photo.server}/${dataDetail.photo.id}_${dataDetail.photo.secret}_b.jpg`,
      },
      title: dataDetail.photo.title._content,
      description: dataDetail.photo.description._content,
      views: dataDetail.photo.views,
      dates: dataDetail.photo.dates,
      owner: {
        ...dataDetail.photo.owner,
        avatarurl: `https://live.staticflickr.com/${dataDetail.photo.owner.iconserver}/buddyicons/${dataDetail.photo.owner.nsid}.jpg`,
      },
    },
  });
};
