import { HttpClient } from '@angular/common/http';
import { ProductService } from './data-product.service';

describe('ProductService', () => {
  let service: ProductService;
  const mockHttpClient = {
    get: jest.fn(),
  };

  beforeEach(() => {
    service = new ProductService(mockHttpClient as unknown as HttpClient);
  });

  describe('getProducts', () => {
    it('should call product enpoint', () => {
      jest.spyOn(mockHttpClient, 'get');
      service.getProducts();
      expect(mockHttpClient.get).toHaveBeenCalledWith('/api/product');
    });
  });
});
