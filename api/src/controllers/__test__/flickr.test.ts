import request from 'supertest';
import app from '../../app';

describe('GET /api/v1/flickr/photos', () => {
  it('can fetch a list of photos', async () => {
    const res = await request(app).get('/api/v1/flickr/photos').send().expect(200);

    expect(res.body.data.length).toEqual(10);
  });

  it('limit the photos', async () => {
    const res = await request(app).get('/api/v1/flickr/photos?limit=1').send().expect(200);

    expect(res.body.data.length).toEqual(1);
  });

  it('has a pagination', async () => {
    const res = await request(app).get('/api/v1/flickr/photos?limit=1&page=2').send().expect(200);

    expect(res.body.data.length).toEqual(1);
    expect(res.body.data.page).toEqual(2);
  });
});
