import { newE2EPage } from '@stencil/core/testing';

describe('sidebar-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sidebar-component></sidebar-component>');

    const element = await page.find('sidebar-component');
    expect(element).toHaveClass('hydrated');
  });
});
