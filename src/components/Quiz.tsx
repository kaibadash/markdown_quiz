import "./Quiz.css";

import React, { useState, useEffect } from "react";
import _ from "lodash";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Questions } from "../data/Questions";
import { Question } from "../data/Question";
import { Item } from "../Item";
import { Button, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";

async function parseMarkdown(markdown: string): Promise<Questions> {
  const processor = unified().use(remarkParse).use(remarkRehype);
  const contents = await processor.parse(markdown);

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
  const { fileName } = useParams();
  const [questions, setQuestions] = useState<Questions>(new Questions());

  useEffect(() => {
    console.log(fileName);
    (async () => {
      const response = await fetch(`./quiz/${fileName}`);
      const md = await response.text();
      setQuestions(await parseMarkdown(md));
    })();
  }, [fileName]);

  const handleCheckboxChange = (item: Item) => {
    item.selected = !item.selected;
    setQuestions(_.cloneDeep(questions));
  };

  const handleEnd = () => {
    questions.end();
    setQuestions(_.cloneDeep(questions));
  };

  return (
    <div className="container">
      {questions.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mt-5 mb-5">
          <h2>
            {questions.ended ? (
              question.correct() ? (
                ""
              ) : (
                <span className="ng">NG</span>
              )
            ) : (
              ""
            )}
            {questionIndex + 1}: {question.text}
          </h2>
          <ol className="list-group">
            {question.items.map((item, itemIndex) => {
              return (
                <li key={`${questionIndex}-${itemIndex}`} className="list-group-item">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={(e) => handleCheckboxChange(item)}
                      disabled={questions.ended}
                      className="form-check-input me-1"
                    />
                    {questions.ended ? (
                      item.correct ? (
                        <span className="answer">[Answer]</span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {item.text}
                  </label>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
      <div className="footerControl container-fluid">
        <Stack direction="horizontal" gap={2}>
          <Button onClick={(e) => handleEnd()} className="col-2">
            End
          </Button>
          <span className="border p-2 score">
            {questions.ended
              ? `${questions.numberOfCorrectAnswers} / ${questions.numberOfQuestions()} (${(questions.numberOfCorrectAnswers / questions.numberOfQuestions()) * 100} %)`
              : "-"}
          </span>
        </Stack>
      </div>
    </div>
  );
};

export default Quiz;
