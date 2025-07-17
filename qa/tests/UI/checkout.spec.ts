import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../utilities/constants';
import * as data from '../../utilities/data';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ShoppingCartPage } from '../../pages/ShoppingCartPage';
import { PaymentPage } from '../../pages/PaymentPage';
import { OrderReviewPage } from '../../pages/OrderReviewPage';
import { OrderPlacedPage } from '../../pages/OrderPlacedPage';

// Automate Checkout UI
test.describe('Checkout UI', () => {
  test('Complete checkout as a logged-in user - POSITIVE', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const paymentPage = new PaymentPage(page);
    const orderReviewPage = new OrderReviewPage(page);
    const orderPlacedPage = new OrderPlacedPage(page);

    await page.goto(BASE_URL);
    await expect(homePage.carousel).toBeVisible();
    homePage.loginLink.click();
    await loginPage.login(data.TEST_USER_EMAIL, data.TEST_USER_PASSWORD);
    // Navigate to Products page
    await productsPage.productsLink.click();
    // Hover over the first product and click 'Add to cart'
    await productsPage.productByIndex(1).hover();
    await productsPage.addToCartByIndex(1).click();
    // Wait for modal and click 'Continue Shopping'
    await productsPage.cartModal.waitFor();
    await productsPage.closeModalButton.click();

    // Hover over the specific product and click 'Add to cart'
    await productsPage.productByName(data.PRODUCT_NAME).scrollIntoViewIfNeeded();
    await productsPage.productByName(data.PRODUCT_NAME).hover();
    await productsPage.addToCartByName(data.PRODUCT_NAME).click(); // Add specific product
    // Wait for modal and click 'Continue Shopping'
    await productsPage.cartModal.waitFor();
    await productsPage.closeModalButton.click();

    // Go to Shopping Cart
    await productsPage.viewCartLink.scrollIntoViewIfNeeded();
    await productsPage.viewCartLink.click();
    await page.waitForURL('**/view_cart', { timeout: 5000 }); // Increased wait

    // Proceed to Checkout
    await shoppingCartPage.checkoutButton.click();
    await page.waitForURL('**/checkout', { timeout: 5000 }); // Increased wait

    await orderReviewPage.checkoutMessage.scrollIntoViewIfNeeded();
    if (await orderReviewPage.checkoutMessage.isVisible()) {
      await orderReviewPage.checkoutMessage.fill(data.CHECKOUT_MESSAGE);
    }
    await orderReviewPage.paymentLink.click();

    // Fill payment details
    await paymentPage.nameOnCardInput.fill(data.CARD_NAME);
    await paymentPage.cardNumberInput.fill(data.CARD_NUMBER);
    await paymentPage.cvcInput.fill(data.CARD_CVC);
    await paymentPage.expiryMonthInput.fill(data.CARD_EXPIRY_MONTH);
    await paymentPage.expiryYearInput.fill(data.CARD_EXPIRY_YEAR);
    await paymentPage.submitButton.click();

    // Verify order placement
    await orderPlacedPage.orderPlacedText.waitFor();
    await expect(orderPlacedPage.orderPlacedText).toHaveText(data.ORDER_PLACED_TEXT);
    await orderPlacedPage.orderConfirmationText(data.ORDER_CONFIRMATION_TEXT).waitFor({ timeout: 5000 });
    await expect(orderPlacedPage.orderConfirmationText(data.ORDER_CONFIRMATION_TEXT)).toBeVisible();

    //If Order API was available, this would be a good place to retrieve the order that was just placed through API and verify it

    // Verify and click Continue button, then verify landing on Home page
    await expect(orderPlacedPage.continueButton).toBeVisible();
    await orderPlacedPage.continueButton.click();
    await expect(homePage.carousel).toBeVisible();

  });   
});
