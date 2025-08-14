# Markdown Quiz

Create quizzes simply by placing markdown files.
Perfect for simple quizzes, exam preparation, and study sessions.

## Creating a Quiz

Create a markdown file with the following format.
Place it as `public/sample.md`.

```markdown
What is #ff0000 of color code?

- [x] Red
- [ ] Green
- [ ] Blue
- [ ] Cyan

---

What is GAFA?

- [ ] GAFA co,ltd
- [x] Google Apple Facebook Amazon
- [ ] Google Amazon Facebook AWS
- [ ] Google Amazon Facebook AI

---
```

## How to Run

```bash
yarn install
yarn start

# Place your markdown file in public/ folder
# Access quiz at http://localhost:5656/quiz/sample.md
```
