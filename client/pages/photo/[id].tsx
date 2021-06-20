import { Container, Box, makeStyles, Button, Typography, Grid } from '@material-ui/core';
import { TrendingFlat } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';

const useStyle = makeStyles({
  imageContainer: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    marginBlock: '2rem',
  },
  ownerContaienr: {
    paddingInline: '5rem',
  },
  avatarContainer: {
    borderRadius: '50%',
    overflow: 'hidden',
    height: '3.5rem',
    width: '3.5rem',
  },
  descriptionContainer: {
    paddingInline: '5rem',
    paddingBlock: '2rem',
  },
  page: {
    position: 'relative',
  },
  backContainer: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    '&:hover .back-text': {
      textDecoration: 'underline',
    },
  },
  backIcon: {
    transform: 'rotate(180deg)',
    marginRight: '0.25rem',
  },
});

const PhotoDetailPage = () => {
  const Router = useRouter();
  const classes = useStyle();

  return (
    <Box className={classes.page}>
      <Box
        onClick={() => {
          Router.back();
        }}
        component="button"
        className={classes.backContainer}
      >
        <TrendingFlat className={classes.backIcon} />
        <Typography className="back-text">Back to explore</Typography>
      </Box>
      <Container maxWidth="lg">
        <Box className={classes.imageContainer}>
          <Image
            src="https://live.staticflickr.com/65535/50999461365_26f3661c0f_b.jpg"
            layout="responsive"
            width={16}
            height={9}
            alt="test"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
        <Grid
          className={classes.ownerContaienr}
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Grid style={{ gap: '1rem' }} container justify="space-between" alignItems="center">
              <Box className={classes.avatarContainer}>
                <Image
                  src="https://live.staticflickr.com/65535/buddyicons/42119439@N06.jpg"
                  layout="responsive"
                  width={1}
                  height={1}
                  alt="avatar"
                  objectFit="cover"
                />
              </Box>
              <Box>
                <Typography style={{ marginBottom: '0.25rem', fontWeight: 700 }}>
                  joebidden
                </Typography>
                <Typography>Joe Bidden • 40000 views</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained">
              Download
            </Button>
          </Grid>
        </Grid>
        <Box className={classes.descriptionContainer}>
          <Typography
            style={{ fontWeight: 700, marginBottom: '0.5rem' }}
            variant="h5"
            component="h1"
          >
            Photo Title
          </Typography>
          <Typography variant="subtitle2" style={{ marginBottom: '0.5rem', color: '#959392' }}>
            Taken on 18 October 2021
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut tenetur fugiat, pariatur,
            ex, nam odit sapiente cum ipsum tempora rerum et! Assumenda, labore officia quam est in
            harum porro temporibus!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PhotoDetailPage;
