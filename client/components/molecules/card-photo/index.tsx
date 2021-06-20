import { Box, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Visibility } from '@material-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { memo } from 'react';

interface Props {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  views?: string;
  ownername?: string;
  isLoading?: boolean;
  href: string;
}

const useStyle = makeStyles({
  container: {
    position: 'relative',
    cursor: 'pointer',
    borderRadius: 8,
    overflow: 'hidden',
    '&:hover .title': {
      opacity: 1,
    },
  },
  info: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    background:
      'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
    color: 'white',
    opacity: 0,
    transition: 'all .3s',
    display: 'flex',
    alignItems: 'flex-end',
    paddingBlock: 20,
    paddingInline: 16,
  },
  additionalInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBlock: 8,
  },
  ownerName: {
    fontWeight: 700,
  },
  viewsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  views: {
    fontSize: '0.875rem',
  },
});

const CardPhoto: React.FC<Props> = ({
  src,
  alt,
  title,
  width = 5,
  height = 4,
  views,
  ownername,
  isLoading,
  href,
}) => {
  const classes = useStyle();

  return (
    <>
      {isLoading ? (
        <Skeleton data-testid="skeleton" variant="rect" height={280} style={{ borderRadius: 8 }} />
      ) : (
        <>
          <Link href={href}>
            <a data-testid="card">
              <Box className={classes.container}>
                <Box className={clsx(classes.info, 'title')}>
                  <p className="line-clamp-2">{title}</p>
                </Box>
                <Image
                  width={width}
                  height={height}
                  src={src}
                  alt={alt}
                  layout="responsive"
                  objectFit="cover"
                />
              </Box>
            </a>
          </Link>
          <Box className={classes.additionalInfo}>
            <Typography className={classes.ownerName}>{ownername}</Typography>
            <Box className={classes.viewsContainer}>
              <Visibility className={classes.views} />
              <Typography className={classes.views}>{views}</Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default memo(CardPhoto);
