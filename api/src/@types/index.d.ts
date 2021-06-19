type FlickrPhotosResponse = {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: Array<{
      id: string;
      owner: string;
      secret: string;
      server: string;
      farm: number;
      title: string;
      isPublic: number;
      isFriend: number;
      isFamily: number;
    }>;
  };
};
