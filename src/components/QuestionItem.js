import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteQuestion(id));
  }

  function handleChange(e) {
  const newCorrectIndex = parseInt(e.target.value);

  // ✅ Immediately tell parent about the change
  onUpdateQuestion({ ...question, correctIndex: newCorrectIndex });

  // Still sync with backend in background
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correctIndex: newCorrectIndex }),
  })
    .then((res) => res.json())
    .then((updatedQ) => {
      // ensure state stays in sync with backend response
      onUpdateQuestion(updatedQ);
    });
}


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
