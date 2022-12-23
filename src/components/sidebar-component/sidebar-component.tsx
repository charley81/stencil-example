import { Component, h, Prop, State, Method, Host } from '@stencil/core';

@Component({
  tag: 'sidebar-component',
  styleUrl: 'sidebar-component.css',
  shadow: true,
})
export class SidebarComponent {
  @State() showContactInfo = false;
  @Prop({ reflect: true }) title: string = 'default title';
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseSidebar() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-info">
          <h2>Contact Information</h2>
          <p>you can reach us via phone or email</p>
          <ul>
            <li>Phone: 555-555-5555</li>
            <li>
              <a href="mailto:person@company.com">person@company.com</a>{' '}
            </li>
          </ul>
        </div>
      );
    }
    {
      return (
        this.open && (
          <Host>
            <div class="backdrop" onClick={this.onCloseSidebar.bind(this)}></div>
            <aside>
              {/* header */}
              <header>
                <h1>{this.title}</h1>
                <button onClick={this.onCloseSidebar.bind(this)}>X</button>
              </header>

              {/* tabs */}
              <section id="tabs">
                <button class={!this.showContactInfo && 'active'} onClick={this.onContentChange.bind(this, 'nav')}>
                  navigation
                </button>
                <button class={this.showContactInfo && 'active'} onClick={this.onContentChange.bind(this, 'contact')}>
                  contact
                </button>
              </section>

              {/* main */}
              <main>{mainContent}</main>
            </aside>
          </Host>
        )
      );
    }
  }
}
