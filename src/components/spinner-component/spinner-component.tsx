import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'spinner-component',
  styleUrl: 'spinner-component.css',
  shadow: true,
})
export class SpinnerComponent {
  render() {
    return (
      <Host>
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </Host>
    );
  }
}
