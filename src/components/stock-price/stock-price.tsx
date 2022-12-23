import { Component, Host, h, State, Element, Prop, Watch, Listen } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  // initialStockSymbol: string;

  @Element() el: HTMLElement;

  @State() fetchPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() isLoading: boolean = false;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  // watch for change of the provided prop => written exactly how the prop is written. The function below watch will run when the provided property changes
  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  onUserInput(e: Event) {
    this.stockUserInput = (e.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  async onFetchStockPrice(e: Event) {
    e.preventDefault();
    this.stockSymbol = this.stockInput.value;
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    // this.fetchStockPrice(stockSymbol);
  }

  // runs before the render => you can change a property that is a state property and that change will be taken into account in the next function call
  componentWillLoad() {
    console.log('component will load');
    console.log(this.stockSymbol);
  }

  // when component is added to the dom / rendered => if you change a stateful value in componentDidLoad then render will run again
  async componentDidLoad() {
    console.log('component did load');

    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.fetchStockPrice(this.stockSymbol);
      this.stockInputValid = true;
    }
  }

  // fires right before re-render when a prop or state property changes
  componentWillUpdate() {
    console.log('component will update');
  }

  // fires whenever it did call render
  componentDidUpdate() {
    console.log('component did update');
    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }

  // when remove a component => great place for any cleanup work
  disconnectedCallback() {
    console.log('component did unload');
  }

  @Listen('symbolSelected', { target: 'body' })
  onStockSymbolSelected(e: CustomEvent) {
    console.log('stock symbol selected: ' + e.detail);
    if (e.detail && e.detail !== this.stockSymbol) {
      this.stockSymbol = e.detail;
    }
  }

  async fetchStockPrice(stockSymbol: string) {
    this.isLoading = true;
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`);
      const data = await response.json();

      if (!data['Global Quote']['05. price']) {
        throw new Error('Invalid symbol');
      }

      this.error = null;
      this.fetchPrice = +data['Global Quote']['05. price'];
      this.isLoading = false;
    } catch (error) {
      this.error = error.message;
      this.fetchPrice = null;
      this.isLoading = false;
    }
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.error) {
      dataContent = <p>Error: {this.error}</p>;
    }
    if (this.fetchPrice) {
      dataContent = <p>Price: ${this.fetchPrice}</p>;
    }
    if (this.isLoading) {
      dataContent = <spinner-component></spinner-component>;
    }

    return (
      <Host>
        <form onSubmit={this.onFetchStockPrice.bind(this)}>
          <input type="text" id="stock-symbol" ref={el => (this.stockInput = el)} value={this.stockUserInput} onInput={this.onUserInput.bind(this)} />
          <button type="submit" disabled={!this.stockInputValid || this.isLoading}>
            Fetch
          </button>
        </form>
        <div>{dataContent}</div>
      </Host>
    );
  }
}
