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

type PhotoDetailResponse = {
  id: string;
  photo: {
    id: string;
    secret: string;
    server: string;
    url: string;
  };
  title: string;
  description: string;
  views: string;
  dates: {
    posted: string;
    taken: string;
    lastupdate: string;
  };
  owner: {
    nsid: string;
    username: string;
    realname: string;
    avatarurl: string;
  };
};
