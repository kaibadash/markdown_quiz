import './Quiz.css';

import React, { useState, useEffect } from 'react';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Questions } from '../data/Questions';
import { Question } from '../data/Question';
import { Item } from '../Item';

async function parseMarkdown(markdown: string): Promise<Questions> {
  const processor = unified().use(remarkParse).use(remarkRehype);
  const contents = await processor.parse(markdown);
  console.log(contents);

  let questions = new Questions();
  let currentQuestion: Question | null = null;
  for (const child of contents.children) {
    if (child.type === "thematicBreak") {
      if (currentQuestion) questions.add(currentQuestion);
      currentQuestion = null;
    } else if (child.type === "paragraph") {
      // 新しい質問を開始
      const questionText = child.children[0] as any;
      currentQuestion = new Question(questionText["value"]);
    } else if (child.type === "list" && currentQuestion) {
      for (const item of child.children) {
        const itemText = (item.children[0] as any).children[0].value;
        const correct = itemText.startsWith("[x]");
        const text = itemText.replace(/^\[ ?x?\]\s?/, "").replace(/^\[\]\s*/, "");
        currentQuestion.add(new Item(text, correct));
      }
    }
  }
  // 最後の質問を追加
  if (currentQuestion) questions.add(currentQuestion);

  return questions;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Questions>(new Questions());
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    (async() => {
      const response = await fetch('/quiz/rails.md');
      const md = await response.text();
      setMarkdownContent(md);
      setQuestions(await parseMarkdown(md));
    })()
  }, []); // 空の依存配列を渡すことで、コンポーネントのマウント時にのみ実行されるようにする

  const handleCheckboxChange = (item: Item) => {
    item.selected = !item.selected;
    setQuestions(structuredClone(questions));
  };

  const handleEnd = () => {
    questions.end();
  }

  return (
    <div>
      {questions.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h2>{question.text}</h2>
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
      <div>
        <button onClick={(e) => handleEnd()}>End</button>
        {questions.numberOfCorrectAnswers}
      </div>
    </div>
  );
};

export default Quiz;
