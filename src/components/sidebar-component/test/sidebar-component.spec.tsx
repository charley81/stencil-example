import { newSpecPage } from '@stencil/core/testing';
import { SidebarComponent } from '../sidebar-component';

describe('sidebar-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SidebarComponent],
      html: `<sidebar-component></sidebar-component>`,
    });
    expect(page.root).toEqualHtml(`
      <sidebar-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sidebar-component>
    `);
  });
});
