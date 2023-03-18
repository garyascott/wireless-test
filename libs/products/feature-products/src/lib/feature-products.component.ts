import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiProductComponent } from './ui/ui-product/ui-product.component';
import { ProductService } from './data/data-product.service';

@Component({
  selector: 'wireless-feature-products',
  standalone: true,
  imports: [CommonModule, UiProductComponent],
  providers: [ProductService],
  template: `
    <div class="products__head">
      <h1 class="products__title">Products</h1>
    </div>
    <div class="products__section">
      <ng-container *ngIf="products$ | async as products; else productLoading">
        <wireless-ui-product
          *ngFor="let product of products"
          [product]="product"
          class="products__item"
        ></wireless-ui-product>
      </ng-container>

      <ng-template #productLoading>
        <p class="products__section--empty">Products loading ...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        flex-wrap: wrap;
      }

      .products {
        &__head {
          text-align: center;
          padding: 40px 20px;
          flex: 0 1 auto;
        }

        &__section {
          display: flex;
          flex-wrap: wrap;
          align-content: stretch;
          flex: 1 1 auto;
          align-items: stretch;
          gap: 4px;
        }

        &__section--empty {
          align-self: flex-start;
          width: 100%;
          text-align: center;
          font-size: 24px;
        }

        &__item {
          width: 33%;
        }
      }
    `,
  ],
})
export class FeatureProductsComponent {
  public products$ = this.productService.getProducts();
  constructor(private productService: ProductService) {}
}
