function solve() {
  let sections = document.querySelectorAll('section');
  let firstQ = sections.item(0);
  let secondQ = sections.item(1);
  let thirdQ = sections.item(2);

  let resultH1 = document.querySelector('#results').querySelector('.results-inner').children[0];
  let results = document.querySelector('#results');

  let num = 0;
  let rightAnswers = 0;
  let text = '';

  let q1CorrectAnswer = firstQ.getElementsByClassName('quiz-answer low-value').item(0);
  let q1IncorrectAnswer = firstQ.getElementsByClassName('quiz-answer high-value').item(0);
  let q2IncorrectAnswer = secondQ.getElementsByClassName('quiz-answer low-value').item(0);
  let q2CorrectAnswer = secondQ.getElementsByClassName('quiz-answer high-value').item(0);
  let q3CorrectAnswer = thirdQ.getElementsByClassName('quiz-answer low-value').item(0);
  let q3IncorrectAnswer = thirdQ.getElementsByClassName('quiz-answer high-value').item(0);


  q1CorrectAnswer.addEventListener('click', onCorrectAnswerClick);
  q1IncorrectAnswer.addEventListener('click', onIncorrectAnswerClick);
  q2CorrectAnswer.addEventListener('click', onCorrectAnswerClick);
  q2IncorrectAnswer.addEventListener('click', onIncorrectAnswerClick);
  q3CorrectAnswer.addEventListener('click', onCorrectAnswerClick);
  q3IncorrectAnswer.addEventListener('click', onIncorrectAnswerClick);

  function onIncorrectAnswerClick(e) {
    let parent = e.currentTarget.parentElement.parentElement;

    parent.style.display = 'none';
    parent.className = 'hidden'

    if (num < 2) {
      num++;

      let nextSection = sections.item(num);

      nextSection.style.display = 'block'
    } else {
      text = `You have ${rightAnswers} right answers.`;
      resultH1.textContent = text;
      results.style.display = 'block'
    }
  }
  function onCorrectAnswerClick(e) {
    rightAnswers++;

    let parent = e.currentTarget.parentElement.parentElement;

    parent.style.display = 'none'
    parent.className = 'hidden'

    if (num < 2) {
      num++;

      let nextSection = sections.item(num);

      nextSection.style.display = 'block'
    } else {
      text = `You are recognized as top JavaScript fan!`;
      resultH1.textContent = text;
      results.style.display = 'block'
    }
  }
}
