"use strict";

export class Model {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.correct = 0;
  }

  async loadLocal(category) {
    const res = await fetch("data/questions.json");
    const data = await res.json();
    this.questions = this.shuffle(data[category]);
  }

  getNextQuestion() {
    return this.questions[this.currentIndex++];
  }

  checkAnswer(question, answer) {
    if (answer === question.l[0]) {
      this.correct++;
      return true;
    }
    return false;
  }

  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
}