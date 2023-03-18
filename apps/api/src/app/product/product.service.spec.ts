import { Test } from '@nestjs/testing';

import { ProductService } from './product.service';
import * as puppeteer from 'puppeteer';

describe('ProductService', () => {
  let service: ProductService;

  beforeAll(async () => {
    const product = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = product.get<ProductService>(ProductService);
  });

  describe('getData', () => {
    it('should successful get data', async () => {
      const mockNewPage = {
        goto: jest.fn(),
        $$eval: jest.fn(),
      };
      const browserMock = {
        newPage: () => mockNewPage,
        close: jest.fn(),
      } as unknown as puppeteer.Browser;
      jest
        .spyOn(puppeteer, 'launch')
        .mockImplementation(() => Promise.resolve(browserMock));
      jest.spyOn(browserMock, 'newPage');
      jest.spyOn(mockNewPage, 'goto');
      jest.spyOn(browserMock, 'close');
      jest.spyOn(mockNewPage, '$$eval').mockResolvedValue({});

      await service.getData();
      await expect(puppeteer.launch).toHaveBeenCalled();
      await expect(browserMock.newPage).toHaveBeenCalled();
      await expect(browserMock.close).toHaveBeenCalled();
      await expect(mockNewPage.goto).toHaveBeenCalled();
      await expect(mockNewPage.$$eval).toHaveBeenCalled();
      await expect(service.getData()).resolves.toStrictEqual({});
    });

    it('should error due to unsuccesful puppeteer launch', async () => {
      jest
        .spyOn(puppeteer, 'launch')
        .mockImplementation(() => Promise.reject('error'));
      await expect(service.getData()).rejects.toStrictEqual(new Error('error'));
    });
  });
});
