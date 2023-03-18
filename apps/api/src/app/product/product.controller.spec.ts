import { Test, TestingModule } from '@nestjs/testing';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let product: TestingModule;

  let mockProductService;

  beforeAll(async () => {
    mockProductService = {
      getData: jest.fn(),
    };
    product = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();
  });

  describe('getData', () => {
    it(`should call ProductService's 'getData'`, () => {
      const productController =
        product.get<ProductController>(ProductController);

      jest.spyOn(mockProductService, 'getData');

      productController.getData();

      expect(mockProductService.getData).toHaveBeenCalled();
    });
  });
});
