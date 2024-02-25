/** @format */

import { Item } from "../Item";

export class Question {
  public text: string = "";
  public items: Item[];

  constructor(text: string) {
    this.items = [];
    this.text = text;
  }

  add(item: Item) {
    this.items.push(item);
  }
}
