import { Controller, Get } from '@nestjs/common';
import { Product } from '@wireless/shared/utils';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public getData(): Promise<Product[]> {
    return this.productService.getData();
  }
}
