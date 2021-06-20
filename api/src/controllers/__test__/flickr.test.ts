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

describe('GET /api/v1/flickr/photos/:id', () => {
  it('should gives 404 status if the data not found', async () => {
    await request(app).get('/api/v1/flickr/photos/random-id-149kl').send().expect(404);
  });

  it('should gives 200 status if the data was found', async () => {
    const res = await request(app).get('/api/v1/flickr/photos?limit=1').send().expect(200);

    await request(app)
      .get(`/api/v1/flickr/photos/${res.body.data.photos[0].id}`)
      .send()
      .expect(200);
  });
});
