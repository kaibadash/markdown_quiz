/** @format */

import { Question } from "./Question";

export class Questions {
  public questions: Question[] = [];

  add(question: Question) {
    this.questions.push(question);
  }
}
