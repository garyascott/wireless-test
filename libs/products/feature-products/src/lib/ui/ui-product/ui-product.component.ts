import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@wireless/shared/utils';

@Component({
  selector: 'wireless-ui-product',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product__content">
      <p *ngIf="product.discount" class="product__discount">
        {{ product.discount }}
      </p>
      <h2 class="product__title">{{ product.title }}</h2>
      <hr class="product__hr" />
      <p class="product__description" [innerHTML]="product.description"></p>
      <hr class="product__hr" />
      <p class="product__price">{{ product.price | currency : 'GBP' }}</p>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: rgba(#bab6a7, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &:hover {
          background-color: rgba(#bab6a7, 0.2);
        }
      }

      .product {
        &__hr {
          width: 60px;
          height: 3px;
          border: none;
          border-radius: 3px;
          background-color: rgba(#bab6a7, 0.3);
          margin: 16px auto;
        }

        &__content {
          position: relative;
          text-align: center;
        }

        &__discount {
          position: absolute;
          transform: translate(-50%, -70px);
          color: var(--primary-color);
          font-size: 14px;
          border: 1px solid var(--primary-color);
          border-radius: 25px;
          left: 50%;
          white-space: nowrap;
          padding: 5px 14px;
        }

        &__title {
          color: var(--text-color);
          font-size: 28px;
          margin: 0;
        }
        &__description {
          color: var(--secondary-color);
          margin: 0;
        }
        &__price {
          color: var(--text-color);
          font-size: 36px;
          margin: 0;
        }
      }
    `,
  ],
})
export class UiProductComponent {
  @Input() product!: Product;
}
