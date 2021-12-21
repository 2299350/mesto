import Card from "./Card.js";

export default class Section {
  constructor({ items, renderer }, selector) {
    this._cards = items;
    this._render = renderer;
    this._element = document.querySelector(selector);
  }

  // Public methods
  render() {
    for (const { name, link } of this._cards) {
      this._render(name, link, this._element);
    }
  }

  addItem(name, link) {
    this._cards.push({ name, link });
    this._render(name, link, this._element);
  }
}
