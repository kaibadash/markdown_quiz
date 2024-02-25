import "./Quiz.css";

import React, { useState, useEffect } from "react";
import _ from "lodash";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Questions } from "../data/Questions";
import { Question } from "../data/Question";
import { Item } from "../Item";
async function parseMarkdown(markdown: string): Promise<Questions> {
  const processor = unified().use(remarkParse).use(remarkRehype);
  const contents = await processor.parse(markdown);
  console.log(contents);

  let questions = new Questions();
  let currentQuestion: Question | null = null;
  for (const child of contents.children) {
    switch (child.type) {
      case "thematicBreak":
        if (currentQuestion) questions.add(currentQuestion);
        currentQuestion = null;
        break;

      case "paragraph":
        const questionText = child.children[0] as any;
        currentQuestion = new Question(questionText["value"]);
        break;

      case "list":
        if (!currentQuestion) {
          break;
        }

        for (const item of child.children) {
          const itemText = (item.children[0] as any).children[0].value;
          const correct = itemText.startsWith("[x]");
          const text = itemText
            .replace(/^\[ ?x?\]\s?/, "")
            .replace(/^\[\]\s*/, "");
          currentQuestion.add(new Item(text, correct));
        }
        break;
    }
  }

  // 最後の質問を追加
  if (currentQuestion) questions.add(currentQuestion);

  return questions;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Questions>(new Questions());

  useEffect(() => {
    (async () => {
      const response = await fetch("/quiz/rails.md");
      const md = await response.text();
      setQuestions(await parseMarkdown(md));
    })();
  }, []); // 空の依存配列を渡すことで、コンポーネントのマウント時にのみ実行されるようにする

  const handleCheckboxChange = (item: Item) => {
    item.selected = !item.selected;
    setQuestions(_.cloneDeep(questions));
  };

  const handleEnd = () => {
    questions.end();
  };

  return (
    <div>
      {questions.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h2>
            {questionIndex + 1}: {question.text}
          </h2>
          <ol>
            {question.items.map((item, itemIndex) => {
              return (
                <li key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={(e) => handleCheckboxChange(item)}
                    />
                    {item.text}
                  </label>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
      <div className="footerControl">
        <button onClick={(e) => handleEnd()}>End</button>
        <span className="score">
          {questions.ended
            ? `${questions.numberOfCorrectAnswers} / ${questions.numberOfQuestions()}`
            : ""}
        </span>
      </div>
    </div>
  );
};

export default Quiz;
