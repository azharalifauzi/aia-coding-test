import { Typography, Grid, Container } from '@material-ui/core';
import { CardPhoto } from 'components';
import { useQuery } from 'react-query';

export default function Home() {
  const { data } = useQuery<PhotosResponse>(
    'photos',
    async () => {
      const res = await fetch('/api/v1/flickr/photos');

      const data = await res.json();

      return data.data;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <main>
        <Typography align="center" variant="h3" component="h1">
          Flickr Photos Search Tools
        </Typography>
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            {data?.photos.map(({ id, url, title }) => (
              <Grid key={id} item xs={12} sm={6} md={3} lg={2}>
                <CardPhoto title={title} src={url} alt={title} width={500} height={400} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
