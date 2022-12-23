import { Component, Host, h, State, Event, EventEmitter } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string; name: string }[] = [];
  @State() isLoading: boolean = false;

  async onFindStocks(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    const stockName = this.stockNameInput.value;
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`);
      const data = await response.json();

      this.searchResults = data['bestMatches'].map(match => {
        return {
          name: match['2. name'],
          symbol: match['1. symbol'],
        };
      });
      this.isLoading = false;
    } catch (error) {
      console.error(error);
      this.isLoading = false;
    }
  }

  @Event({ bubbles: true, composed: true }) symbolSelected: EventEmitter<string>;
  onSelectSymbol(symbol: string) {
    this.symbolSelected.emit(symbol);
  }

  render() {
    let content = (
      <ul>
        {this.searchResults.map(result => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong> - {result.name}
          </li>
        ))}
      </ul>
    );
    if (this.isLoading) {
      content = <spinner-component></spinner-component>;
    }
    return (
      <Host>
        <form onSubmit={this.onFindStocks.bind(this)}>
          <input type="text" id="stock-symbol" ref={el => (this.stockNameInput = el)} />
          <button type="submit">Fetch</button>
        </form>
        {content}
      </Host>
    );
  }
}
