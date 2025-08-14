/** @format */

import { Item } from "./Item";

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

  correct(): boolean {
    const ngList = this.items.filter((item) => {
      return !item.correct && item.selected;
    });
    if (ngList.length > 0) {
      return false;
    }
    const correctList = this.items.filter((item) => {
      return item.correct;
    });
    const okList = this.items.filter((item) => {
      return item.correct && item.selected;
    });
    return okList.length === correctList.length;
  }
}
