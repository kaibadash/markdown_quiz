# Markdown Quiz

<img width="887" height="812" src="https://github.com/user-attachments/assets/d295c851-21b9-455a-b3af-d05d6b892b13" />

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

ff0000 is a hexadecimal color code representing the maximum value of red (255). The first two digits (ff) represent red, the next two digits (00) represent green, and the last two digits (00) represent blue.

---

What is GAFA?

- [ ] GAFA co,ltd
- [x] Google Apple Facebook Amazon
- [ ] Google Amazon Facebook AWS
- [ ] Google Amazon Facebook AI

GAFA is an acronym for the four major tech companies: Google, Apple, Facebook (now Meta), and Amazon. These companies are known as leading forces in the global technology industry.

---

How do dogs cry?(Without explanation)

- [x] Bow
- [ ] Wan
- [ ] Nya
- [ ] Coo
---
```

## How to Run

```bash
yarn install
yarn start

# Place your markdown file in public/ folder
# Access quiz at http://localhost:5656/quiz/sample.md
```
