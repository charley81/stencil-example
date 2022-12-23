import { newSpecPage } from '@stencil/core/testing';
import { SpinnerComponent } from '../spinner-component';

describe('spinner-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpinnerComponent],
      html: `<spinner-component></spinner-component>`,
    });
    expect(page.root).toEqualHtml(`
      <spinner-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spinner-component>
    `);
  });
});
