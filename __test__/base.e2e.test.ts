import request from 'supertest';
import {app} from "../src/settings";

describe('/base', () => {
  beforeAll(async () => {
    // await request(app).delete('/testing/all-data').expect(204)
  })

  it('Должен вернуть \'Hello World!\'', async () => {
    await request(app)
      .get('/')
      .expect(200, 'Hello World!')
  })
})
