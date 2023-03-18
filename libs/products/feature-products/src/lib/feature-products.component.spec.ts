import { ProductService } from './data/data-product.service';
import { FeatureProductsComponent } from './feature-products.component';

describe('FeatureProductsComponent', () => {
  let component: FeatureProductsComponent;
  const mockProductService = {
    getProducts: jest.fn(),
  };

  beforeEach(() => {
    component = new FeatureProductsComponent(
      mockProductService as unknown as ProductService
    );
  });

  it('should be truthy', () => {
    expect(component).toBeTruthy();
  });
});
