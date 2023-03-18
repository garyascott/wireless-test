import { Injectable } from '@nestjs/common';
import { Product } from '@wireless/shared/utils';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ProductService {
  public async getData(): Promise<Product[]> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto('https://wltest.dns-systems.net', {
        waitUntil: 'domcontentloaded',
      });

      const products = await this.scrapPage(page);

      await browser.close();

      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async scrapPage(page: puppeteer.Page): Promise<Product[]> {
    return await page.$$eval('.package', (elements: HTMLElement[]) =>
      elements
        .map((element) => {
          const getPrice = parseFloat(
            element
              .querySelector<HTMLElement>('.package-price .price-big')
              .innerText.split('£')
              .join('')
          );
          const title = element.querySelector<HTMLElement>('h3').innerText;

          const getAnnualPrice = (getPrice: number, title) => {
            return title.includes('Months') ? getPrice * 12 : getPrice;
          };

          return {
            title,
            description: element.querySelector<HTMLElement>(
              '.package-description'
            ).innerHTML,
            price: getPrice,
            discount:
              element.querySelector<HTMLElement>('.package-price p')
                ?.innerText || null,
            annualPrice: getAnnualPrice(getPrice, title),
          };
        })
        .sort((a, b) => b.annualPrice - a.annualPrice)
        .map(({ title, description, price, discount }) => ({
          title,
          description,
          price,
          discount,
        }))
    );
  }
}
