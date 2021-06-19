import { Typography, Grid, Container, Box, makeStyles, InputBase, Paper } from '@material-ui/core';
import { Search, Cancel } from '@material-ui/icons';
import { CardPhoto } from 'components';
import { useQuery } from 'react-query';
import { simplifiedNumber } from 'helpers';
import { useState } from 'react';

const useStyle = makeStyles({
  hero: {
    paddingBlock: '10rem',
    background: 'url("/img-hero.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
  },
  heroHeader: {
    fontWeight: 700,
    textShadow: '2px 2px rgba(0, 0, 0, 0.15)',
  },
  heroSubHeader: {
    textShadow: '2px 2px rgba(0, 0, 0, 0.15)',
  },
  photosContainer: {
    paddingBlock: '4rem',
  },
  searchContainer: {
    maxWidth: 500,
    margin: '0 auto',
    paddingBlock: '1rem',
    transform: 'translateY(-50%)',
    paddingInline: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: '0.5rem',
  },
  searchInput: {
    flex: 1,
    marginInline: '1rem',
  },
  searchIcon: {
    fill: '#9e9ea7',
  },
});

export default function Home() {
  const classes = useStyle();
  const [searchVal, setSearchVal] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const { data } = useQuery<PhotosResponse>(
    ['photos', search],
    async () => {
      let filter = [];

      if (search) filter.push(`search=${search}`);

      if (filter.length > 0) filter[0] = `&${filter[0]}`;

      const res = await fetch(`/api/v1/flickr/photos?limit=30${filter.join('&')}`);

      const data = await res.json();

      return data.data;
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const handleSearch: React.FormEventHandler = (e) => {
    e.preventDefault();

    setSearch(searchVal);
  };

  return (
    <>
      <main>
        <Box className={classes.hero}>
          <Typography className={classes.heroHeader} align="center" variant="h3" component="h1">
            Flickr Photos Search
          </Typography>
          <Typography
            className={classes.heroSubHeader}
            align="center"
            variant="body1"
            component="h1"
          >
            Find your insipiration from the best photographers
          </Typography>
        </Box>
        <Paper onSubmit={handleSearch} component="form" className={classes.searchContainer}>
          <Search className={classes.searchIcon} />
          <InputBase
            onChange={(e) => setSearchVal(e.target.value)}
            value={searchVal}
            id="search"
            className={classes.searchInput}
            placeholder="Search photos..."
          />
          {searchVal ? (
            <Cancel onClick={() => setSearchVal('')} className={classes.searchIcon} />
          ) : null}
        </Paper>
        <Container className={classes.photosContainer} maxWidth="xl">
          <Grid component="ol" container spacing={2}>
            {data?.photos.map(({ id, url, title, ownername, views }) => (
              <Grid
                style={{ listStyle: 'none' }}
                component="li"
                key={id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <CardPhoto
                  title={title}
                  src={url}
                  alt={title}
                  width={500}
                  height={400}
                  ownername={ownername}
                  views={simplifiedNumber(Number(views))}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
