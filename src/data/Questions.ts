/** @format */

import { Question } from "./Question";

export class Questions {
  public questions: Question[] = [];
  public ended: boolean = false;
  public numberOfCorrectAnswers: number = 0;

  add(question: Question) {
    this.questions.push(question);
  }

  end() {
    this.ended = true;
    this.numberOfCorrectAnswers = this.questions.reduce(
      (sum, question) => sum + (question.correct() ? 1 : 0),
      0
    );
  }

  numberOfQuestions(): number {
    return this.questions.length;
  }
}
