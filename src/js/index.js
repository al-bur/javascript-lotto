import LottoController from './lottoController.js';

import LottoCreator from './model/lottoCreator.js';
import LottoResultManager from './model/lottoResultManager.js';

import LottoPurchaseInputView from './views/lottoPurchaseInputView.js';
import LottoPurchaseResultView from './views/lottoPurchaseResultView.js';
import LottoWinningNumberInputView from './views/lottoWinningNumberInputView.js';
import LottoMatchResultView from './views/lottoMatchResultView.js';

import '../css/index.css';

// eslint-disable-next-line max-lines-per-function
const startLotto = () => {
  const models = {
    lottoCreator: new LottoCreator(),
    LottoResultManager,
  };

  const views = {
    lottoPurchaseInputView: new LottoPurchaseInputView(),
    lottoPurchaseResultView: new LottoPurchaseResultView(),
    lottoWinningNumberInputView: new LottoWinningNumberInputView(),
    lottoMatchResultView: new LottoMatchResultView(),
  };

  new LottoController(models, views);
};

document.addEventListener('DOMContentLoaded', startLotto);
