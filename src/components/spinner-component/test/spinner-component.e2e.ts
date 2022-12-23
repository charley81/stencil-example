import { newE2EPage } from '@stencil/core/testing';

describe('spinner-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spinner-component></spinner-component>');

    const element = await page.find('spinner-component');
    expect(element).toHaveClass('hydrated');
  });
});
