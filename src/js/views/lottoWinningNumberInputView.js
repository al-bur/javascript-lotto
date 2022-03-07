import { $, $$, emit, on } from '../utils/helper.js';
import { lottoWinningNumberInputTemplate } from '../utils/template.js';

export default class LottoWinningNumberInputView {
  #lottoPurchaseResultSection;

  #lottoWinningNumber;

  constructor() {
    this.#lottoPurchaseResultSection = $('#lotto-purchase-result-section');
  }

  get lottoWinningNumberForm() {
    return this.#lottoWinningNumber.form;
  }

  render() {
    this.#lottoPurchaseResultSection.insertAdjacentHTML(
      'afterend',
      lottoWinningNumberInputTemplate()
    );

    this.#selectDOM();
    this.#attachEvents();
  }

  #selectDOM() {
    this.#lottoWinningNumber = {
      inputSection: $('#lotto-winning-number-input-section'),
      form: $('#lotto-winning-number-form'),
      first: $('#lotto-winning-number-1'),
      second: $('#lotto-winning-number-2'),
      third: $('#lotto-winning-number-3'),
      fourth: $('#lotto-winning-number-4'),
      fifth: $('#lotto-winning-number-5'),
      sixth: $('#lotto-winning-number-6'),
      bonus: $('#lotto-winning-bonus-number'),
      containers: $$('.lotto-winning-number-container'),
    };
  }

  #attachEvents() {
    on(this.#lottoWinningNumber.form, 'submit', this.#handleMatchResult.bind(this));
    this.#lottoWinningNumber.containers.forEach((element) =>
      element.addEventListener('input', this.#moveNextInput.bind(this))
    );
    this.#lottoWinningNumber.containers.forEach((element) =>
      element.addEventListener('keydown', this.#movePreviousInput.bind(this))
    );
  }

  #handleMatchResult(event) {
    event.preventDefault();

    const lottoWinningNumbers = Array.from(this.#lottoWinningNumber.containers).map((element) =>
      Number(element.value)
    );
    const lottoWinningBonusNumber = Number(lottoWinningNumbers.pop());

    emit(this.#lottoWinningNumber.form, '@matchResult', {
      lottoWinningNumbers,
      lottoWinningBonusNumber,
    });
  }

  #movePreviousInput(event) {
    if (event.keyCode === 8) {
      if (event.target === this.#lottoWinningNumber.first) return;

      const { value, previousElementSibling } = event.target;

      if (value.length !== 0) return;
      previousElementSibling === null
        ? this.#lottoWinningNumber.sixth.focus()
        : previousElementSibling.focus();
    }
  }

  #moveNextInput(event) {
    const { value, maxLength, nextElementSibling } = event.target;

    if (value.length !== maxLength) return;
    nextElementSibling === null
      ? this.#lottoWinningNumber.bonus.focus()
      : nextElementSibling.focus();
  }

  reset() {
    this.#lottoWinningNumber.form.reset();
  }

  restart() {
    this.#lottoWinningNumber.inputSection.remove();
  }
}
