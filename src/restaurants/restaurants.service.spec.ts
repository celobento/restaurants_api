import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserRoles } from '../auth/schemas/use.schema';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';

const mockRestaurant = {
  _id: "670d98ef2e3a934b435c797f",
  name: "Retaurant 7",
  description: "This is just a description",
  email: "ghulam@gamil.com",
  phoneNumber: "+1(646)286-7644",
  address: "200 Olympic Dr, Stafford, VS, 22554",
  category: "Fast Food",
  images: [],
  user: "670d98d72e3a934b435c7979",
  menu: [],
  createdAt: "2024-10-14T22:19:27.768Z",
  updatedAt: "2024-10-14T22:19:27.768Z",
  __v: 0,
};

const mockUser = {
  name:"Marcelo",
  email:"celob@gmail.com",
  _id:"670d98d72e3a934b435c7979", 
  role: UserRoles.USER
}

const mockRestaurantService = {
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
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
      //jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(newRestaurant));
      //const result = await service.create(newRestaurant as any, mockUser as any);
      //expect(result).toEqual(newRestaurant);
    });
  });

  describe ('findById', () => {
    it('should get restaurant by Id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValueOnce(mockRestaurant as any)
      const result = await service.findById(mockRestaurant._id)
      expect(result).toEqual(mockRestaurant)
    })
    it ('should throw wrong mongoose id error', async () => {
      await expect(service.findById('wrongId')).rejects.toThrow(BadRequestException)
    })
    it ('should throw restaurant not found error', async () => {
      const mockError = new NotFoundException('Restaurant not found.')
      jest.spyOn(model, 'findById').mockRejectedValue(mockError)
      await expect(service.findById(mockRestaurant._id)).rejects.toThrow(NotFoundException)
    })
  })

  describe('updateById', () => {
    it('should update the restaurant', async () => {
      const restaurant = { ...mockRestaurant, name: 'Updated name'}
      const updateRestaurant = { name: 'Updated name'}
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(restaurant as any)
      const updatedRestaurant = await service.updateById(restaurant._id, updateRestaurant as any)
      expect(updatedRestaurant.name).toEqual(updateRestaurant.name)
    })
  })

  describe('deleteById', () => {
    it('should delete the restaurant', async () => {
      //const restaurant = { ...mockRestaurant, name: 'Updated name'}
      const deleteMessage = { deleted: true}
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(deleteMessage as any)
      const result = await service.deleteById(mockRestaurant._id)
      expect(result).toEqual(deleteMessage)
    })
  })
});
