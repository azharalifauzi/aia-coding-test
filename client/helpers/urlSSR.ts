export const urlSSR =
  process.env.NODE_ENV === 'production'
    ? 'https://aia.azharalifauzi.dev/api/v1'
    : 'http://api:5000/api/v1';
