import { Component } from '@angular/core';
import { FeatureProductsComponent } from '@wireless/products/feature-products';

@Component({
  standalone: true,
  imports: [FeatureProductsComponent],
  selector: 'wireless-root',
  template: ` <wireless-feature-products></wireless-feature-products> `,
  styles: [],
})
export class AppComponent {}
