import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { UserRoles } from '../auth/schemas/use.schema';

const mockRestaurant = {
  _id: '66fb2efc7c1a9531745002f4',
  name: 'Retaurant 7',
  description: 'This is just a description',
  email: 'ghulam@gamil.com',
  phoneNumber: '+1(646)286-7644',
  address: '200 Olympic Dr, Stafford, VS, 22554',
  category: 'Fast Food',
  images: [],
  user: '66fb2e53aba36888dab5afbc',
  menu: ['66fb4015d8745ed0ea168c63'],
  createdAt: '2024-09-30T23:06:36.578Z',
  updatedAt: '2024-10-01T00:19:33.439Z',
  __v: 1,
};

const mockUser = {
  name:"Marcelo",
  email:"celo4@gmail.com",
  _id:"6705bd14f674b1f18b9a06de", 
  role: UserRoles.USER
}

const mockRestaurantService = {
  find: jest.fn(),
  create: jest.fn()
};

describe('RestaurantService', () => {
  let service: RestaurantsService;
  let model: Model<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: getModelToken(Restaurant.name),
          useValue: mockRestaurantService,
        },
      ],
    }).compile();
    service = module.get<RestaurantsService>(RestaurantsService);
    model = module.get<Model<Restaurant>>(getModelToken(Restaurant.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all restaurants', async () => {
      jest.spyOn(model, 'find').mockImplementationOnce(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockRestaurant]),
            }),
          }) as any,
      );
      const restaurants = await service.findAll({ keyword: 'restaurant' });
      expect(restaurants).toEqual([mockRestaurant]);
    });
  });

  describe('create', () => {
    const newRestaurant = {
      name: 'Retaurant 8',
      description: 'This is just a 8 description',
      email: 'ghulam8@gamil.com',
      phoneNumber: '+1(646)286-7644',
      address: '200 Olympic Dr, Stafford, VS, 22554',
      category: 'Fast Food',
    }
    it('should create a new restaurants', async () => {
      // jest.spyOn(APIFeatures, 'getRestaurantLocation').mockImplementation(() => Promise.resolve(mockRestaurant.location));
      // I can't do this test work, promise is not recognized
      //jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockRestaurant));
      const result = await service.create(newRestaurant as any, mockUser as any);
      expect(result).toEqual(mockRestaurant);
    });
  });
});
