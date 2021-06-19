type PhotosResponse = {
  maxPage: number;
  page: number;
  length: number;
  total: number;
  photos: Photo[];
};

type Photo = {
  id: string;
  title: string;
  url: string;
  ownername: string;
  views: string;
};
