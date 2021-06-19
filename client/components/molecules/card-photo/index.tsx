import { Box, makeStyles } from '@material-ui/core';
import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
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
    background: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    opacity: 0,
    transition: 'all .3s',
  },
});

const CardPhoto: React.FC<Props> = ({ src, alt, title, width = 5, height = 4 }) => {
  const classes = useStyle();

  return (
    <Box className={classes.container}>
      <Box className={clsx(classes.info, 'title')}>{title}</Box>
      <Image width={width} height={height} src={src} alt={alt} layout="responsive" />
    </Box>
  );
};

export default CardPhoto;
