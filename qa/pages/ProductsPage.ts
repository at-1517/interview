// Page Object Model for Products Page
import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  // Locators
  get productsLink() { return this.page.locator('a[href="/products"]'); }
  get productByIndex() { return (index: number) => this.page.locator(`(//div[@class="product-image-wrapper"])[${index}]`); } // item by index
  get productByName() { return (text: string) => this.page.locator(`(//p[contains(text(),"${text}")])[1]`); } // item by text/product name
  get addToCartByIndex() { return (index: number) => this.page.locator(`//div[@class="overlay-content"]/a[@data-product-id="${index}"]`); } //adding to cart by index
  get addToCartByName() { return (text: string) => this.page.locator(`(//p[contains(text(),"${text}")]//following::a)[2]`); } //adding to cart by text/product name
  get cartModal() { return this.page.locator('#cartModal'); }
  get closeModalButton() { return this.page.locator('button.close-modal'); }
  get viewCartLink() { return this.page.locator('//ul[contains(@class, "nav")]//a[@href="/view_cart"]'); }

}
