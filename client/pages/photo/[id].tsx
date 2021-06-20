import { Container, Box, makeStyles, Button, Typography, Grid } from '@material-ui/core';
import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { TrendingFlat } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { urlSSR } from 'helpers';
import dayjs from 'dayjs';
import { LoadingPage } from 'components';
import Head from 'next/head';

const useStyle = makeStyles({
  imageContainer: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    marginBlock: '2rem',
  },
  ownerContaienr: {
    paddingInline: '5rem',
    gap: '1rem',
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
    paddingTop: '2rem',
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

interface StaticProps {
  initialData: PhotoDetailResponse;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(urlSSR + '/flickr/photos?limit=1');

  const data: PhotosResponse = (await res.json()).data;

  const { id } = data.photos.length === 0 ? { id: '' } : data.photos[0];

  return {
    fallback: true,
    paths: [
      {
        params: { id },
      },
    ],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  try {
    const res = await fetch(urlSSR + `/flickr/photos/${params?.id}`);

    const initialData: PhotoDetailResponse = (await res.json()).data;

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        initialData,
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const PhotoDetailPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
}) => {
  const Router = useRouter();
  const classes = useStyle();

  if (Router.isFallback) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>{initialData.title}</title>
      </Head>
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
              src={initialData.photo.url}
              layout="responsive"
              width={16}
              height={9}
              alt={initialData.title}
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
                    src={initialData.owner.avatarurl}
                    layout="responsive"
                    width={1}
                    height={1}
                    alt="avatar"
                    objectFit="cover"
                  />
                </Box>
                <Box>
                  <Typography style={{ marginBottom: '0.25rem', fontWeight: 700 }}>
                    {initialData.owner.username}
                  </Typography>
                  <Typography>
                    {initialData.owner.realname || initialData.owner.username} • {initialData.views}{' '}
                    views
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                href={initialData.photo.url}
                download
                target="_blank"
                color="secondary"
                variant="contained"
              >
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
              {initialData.title}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem', color: '#959392' }}>
              Taken on {dayjs(initialData.dates.taken).format('DD MMMM YYYY')}
            </Typography>
            <Typography>
              <p dangerouslySetInnerHTML={{ __html: initialData.description }}></p>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PhotoDetailPage;
