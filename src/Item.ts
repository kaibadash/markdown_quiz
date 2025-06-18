/** @format */

export class Item {
  public id: string = crypto.randomUUID();
  public text: string;
  public correct: boolean;
  public selected: boolean = false;

  constructor(text: string, correct: boolean) {
    this.text = text;
    this.correct = correct;
  }
}
