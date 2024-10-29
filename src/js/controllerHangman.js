import modelHangman from '../js/modelHangman.js';
import viewHangman from '../js/viewHangman.js';

const model = new modelHangman();
const view = new viewHangman(model.images, model.keyBoard, model.count);

view.questionRender(model.loadFromStorage());

const btnKey = document.querySelectorAll('.keyboard__btn');

btnKey.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let valueBtn = e.target.innerText;
    view.showCharWord(model.guessWord(valueBtn));
    view.disabledVirtualKey(valueBtn);
    view.increaseСounter(model.counter(valueBtn));
    view.defeat(model.checkStatusDefeat());
    view.victory(model.checkStatusVictory())
  })
})

document.addEventListener('keyup', (e) => {
  let valueBtn = e.key;
  view.showCharWord(model.guessWord(valueBtn));
  view.disabledVirtualKey(valueBtn);
  view.increaseСounter(model.counter(valueBtn));
  view.defeat(model.checkStatusDefeat());
  view.victory(model.checkStatusVictory())
})

window.addEventListener('click', (e) => {

  const refreshButton = e.target.closest('.refresh');

  if (refreshButton) {
    view.questionRender(model.newGame());
    view.increaseСounter(model.count);
    view.newGame();
  }

});
