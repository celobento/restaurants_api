import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose'
import exp from 'constants';

describe('RestaurantController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI_LOCAL)
    await mongoose.connection.db.dropDatabase()
  })

  afterAll(() => mongoose.disconnect())

  const user = {
    name: 'Bento1',
    email: 'bento1@gmail.com',
    password: '12345678'
  }

  const newRestaurant = {
    category: 'Fast Food',
    address: '200 Olympic Dr, Stafford, VS, 22554',
    phoneNo: 9788246116,
    email: 'ghulam@gamil.com',
    description: 'This is just a description',
    name: 'Retaurant 4',
  }

  it('(POST) - register a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201)
      .then((res) => {
        expect(res.body.token).toBeDefined()
      });
  });

  let jwtToken
  let restaurantCreated

  it('(GET) - login user', () => {
    return request(app.getHttpServer())
      .get('/auth/login')
      .send({email: user.email, password: user.password})
      .expect(200)
      .then((res) => {
        expect(res.body.token).toBeDefined()
        jwtToken = res.body.token
      });
  });

  it('(POST) - create a new restaurant', () => {
    return request(app.getHttpServer())
      .post('/restaurants')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(newRestaurant)
      .expect(201)
      .then((res) => {
        expect(res.body._id).toBeDefined()
        restaurantCreated = res.body
      });
  });

  it('GET - get all resturants', () => {
    return request(app.getHttpServer())
    .get('/restaurants')
    .set('Authorization', 'Bearer ' + jwtToken)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(1)
    })
  })

  it('GET - get all resturants by id', () => {
    return request(app.getHttpServer())
    .get(`/restaurants/${restaurantCreated._id}`)
    .set('Authorization', 'Bearer ' + jwtToken)
    .expect(200)
    .then((res) => {
      expect(res.body).toBeDefined()
      expect(res.body._id).toEqual(restaurantCreated._id)
    })
  })
});
