import { $, on, emit } from '../utils/helper.js';
import { LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';

export default class LottoResultView {
  #lottoResultDialog;

  #threeMatchedNumber;

  #fourMatchedNumber;

  #fiveMatchedNumber;

  #fiveWithBonusMatchedNumber;

  #sixMatchedNumber;

  #profitRate;

  #restartButton;

  constructor() {
    this.#lottoResultDialog = $('#lotto-result-dialog');
    this.#threeMatchedNumber = $('#three-matched-number');
    this.#fourMatchedNumber = $('#four-matched-number');
    this.#fiveMatchedNumber = $('#five-matched-number');
    this.#fiveWithBonusMatchedNumber = $('#five-with-bonus-matched-number');
    this.#sixMatchedNumber = $('#six-matched-number');
    this.#profitRate = $('#profit-rate');
    this.#restartButton = $('#restart-button');

    this.#attachEvents();
  }

  get restartButton() {
    return this.#restartButton;
  }

  #attachEvents() {
    on(this.#restartButton, 'click', this.#handleRestart.bind(this));
  }

  render(lottoMatchingResult, profit) {
    this.#lottoResultDialog.showModal();

    this.#threeMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.THREE];
    this.#fourMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FOUR];
    this.#fiveMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FIVE];
    this.#fiveWithBonusMatchedNumber.textContent =
      lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS];
    this.#sixMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.SIX];
    this.#profitRate.textContent = profit;
  }

  #handleRestart() {
    emit(this.#restartButton, '@restart');
  }
}
