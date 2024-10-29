import { list } from "postcss";

export default class ViewHangman {

  constructor(images, keyboard, count) {
    this.images = images;
    this.attributteSrc(images);
    this.className();
    this.baseRender();
    this.keyboardRender(keyboard);
    this.counterRender(count);
  }

  elements = {
    main: {
      body: document.querySelector('body'),
      mainElement: document.createElement('main'),
      container: document.createElement('div'),
      mainContent: document.createElement('div'),
      mainControllContainer: document.createElement('div'),
    },
    imgHangman: {
      wrapperImg: document.createElement('section'),
      mainImg: document.createElement('img'),
      wrapperPepe: document.createElement('div'),
      pepeHead: document.createElement('img'),
      pepeBody: document.createElement('img'),
      pepeLeftHand: document.createElement('img'),
      pepeRightHand: document.createElement('img'),
      pepeLeftFoot: document.createElement('img'),
      pepeRightFoot: document.createElement('img'),
    },
    keyboard: {
      listBtn: document.createElement('ul'),
      listItem: document.createElement('li'),
      btnKey: document.createElement('button'),
    },
    template: {
      template: document.createElement('ul'),
      char: document.createElement('li'),
    },
    question: {
      question: document.createElement('p'),
    }
  }

  baseRender = () => {
    // вставка основных оболочек
    this.elements.main.body.insertAdjacentElement('beforeend', this.elements.main.mainElement);
    this.elements.main.mainElement.insertAdjacentElement('beforeend', this.elements.main.container);
    this.elements.main.container.insertAdjacentElement('beforeend', this.elements.main.mainContent);
    this.elements.main.mainContent.insertAdjacentElement('beforeend', this.elements.main.mainControllContainer);

    // вставка основной картинки
    this.elements.main.mainContent.insertAdjacentElement('afterbegin', this.elements.imgHangman.wrapperImg);
    this.elements.imgHangman.wrapperImg.insertAdjacentElement('beforeend', this.elements.imgHangman.mainImg);

    // вставка Pepe
    this.elements.imgHangman.wrapperImg.insertAdjacentElement('beforeend', this.elements.imgHangman.wrapperPepe);
    this.elements.imgHangman.wrapperPepe.insertAdjacentElement('beforeend', this.elements.imgHangman.pepeHead);
    this.elements.imgHangman.wrapperPepe.insertAdjacentElement('beforeend', this.elements.imgHangman.pepeBody);
    this.elements.imgHangman.wrapperPepe.insertAdjacentElement('beforeend', this.elements.imgHangman.pepeLeftHand);
    this.elements.imgHangman.wrapperPepe.insertAdjacentElement('beforeend', this.elements.imgHangman.pepeRightHand);
    this.elements.imgHangman.wrapperPepe.insertAdjacentElement('beforeend', this.elements.imgHangman.pepeLeftFoot);
    this.elements.imgHangman.wrapperPepe.insertAdjacentElement('beforeend', this.elements.imgHangman.pepeRightFoot);

    // вставка контейнера для клавиатуры
    this.elements.main.mainControllContainer.insertAdjacentElement('beforeend', this.elements.keyboard.listBtn);
  }

  keyboardRender = (keyboard) => {
    keyboard.forEach((btn) => {
      // создаю клона кнопки и выполняю вставку
      const currentBtn = this.elements.keyboard.btnKey.cloneNode(true);
      currentBtn.innerText = btn;
      const currentListItem = this.elements.keyboard.listItem.cloneNode(true);
      currentListItem.insertAdjacentElement('afterbegin', currentBtn);
      this.elements.keyboard.listBtn.insertAdjacentElement('beforeend', currentListItem);
    });
  }

  className = () => {
    // классы основных оболочек
    this.elements.main.mainElement.className ='main';
    this.elements.main.container.className = 'container';
    this.elements.main.mainContent.className = 'main__content';
    this.elements.main.mainControllContainer.className = 'main__controll-container';

    // основная картинка
    this.elements.imgHangman.wrapperImg.className = 'main__img-wrapper';
    this.elements.imgHangman.mainImg.className = 'main__img';

    // картинка Pepe
    this.elements.imgHangman.wrapperPepe.className = 'pepe';
    this.elements.imgHangman.pepeHead.className = 'pepe__head';
    this.elements.imgHangman.pepeBody.className = 'pepe__body';
    this.elements.imgHangman.pepeLeftHand.className = 'pepe__hand pepe__hand--left';
    this.elements.imgHangman.pepeRightHand.className = 'pepe__hand pepe__hand--right';
    this.elements.imgHangman.pepeLeftFoot.className = 'pepe__foot pepe__foot--left';
    this.elements.imgHangman.pepeRightFoot.className = 'pepe__foot pepe__foot--right';

    // клавиатура
    this.elements.keyboard.listBtn.className = 'keyboard';
    this.elements.keyboard.listItem.className = 'keyboard__item';
    this.elements.keyboard.btnKey.className = 'keyboard__btn';

    // шаблон для слова
    this.elements.template.template.className = 'wrapper-answer';
    this.elements.template.char.className = 'key-answer';

    // вопрос
    this.elements.question.question.className = 'question';
  }

  attributteSrc = (images) => {
    this.elements.imgHangman.mainImg.src = images.hangMan;
    this.elements.imgHangman.pepeHead.src = images.head;
    this.elements.imgHangman.pepeBody.src = images.body;
    this.elements.imgHangman.pepeLeftHand.src = images.hand;
    this.elements.imgHangman.pepeRightHand.src = images.hand;
    this.elements.imgHangman.pepeLeftFoot.src = images.foot;
    this.elements.imgHangman.pepeRightFoot.src = images.foot;
  }
  
  questionRender = (randomTask) => {
    this.elements.question.question.innerText = randomTask[0];
    this.templateRender(randomTask[1]);
    this.elements.main.mainControllContainer.insertAdjacentElement('afterbegin', this.elements.question.question);
  }

  templateRender = (word) => {

    this.elements.template.template.innerHTML = '';
    
    this.elements.main.mainControllContainer.insertAdjacentElement('afterbegin', this.elements.template.template);

    for (let i = 0; i < word.length; i++) {
      const char = this.elements.template.char.cloneNode(true);
      char.innerText = '_';
      this.elements.template.template.insertAdjacentElement('beforeend', char);
    }

  }

  counterRender = (countFromModel) => {
    // оболочка счётчика
    const wrapperCounter = document.createElement('div');
    wrapperCounter.className = 'not-correct';
    // заголовок счётчика
    const titleCounter = document.createElement('p');
    titleCounter.className = 'not-correct__title';
    titleCounter.innerText = 'Not correct answer';
    // счётчик
    const counter = document.createElement('span');
    counter.innerText = countFromModel;
    counter.className = 'not-correct__counter';
    const counterDefault = document.createElement('span');
    counterDefault.innerText = '/6';
    // вставка
    wrapperCounter.insertAdjacentElement('afterbegin', titleCounter);
    wrapperCounter.insertAdjacentElement('beforeend', counter);
    wrapperCounter.insertAdjacentElement('beforeend', counterDefault);
    this.elements.main.mainControllContainer.insertAdjacentElement('afterbegin', wrapperCounter);
  }

  showCharWord = (data) => {

    const allChar = document.querySelectorAll('.key-answer');

    for (let i = 0; i < allChar.length; i++) {

      for (let k = 0; k < data.indexOpenChar.length; k++) {
            
        if (i === data.indexOpenChar[k]) {
          allChar[i].innerText = data.currentChar;
        }

      }
    }

  }

  disabledVirtualKey = (valueBtn) => {

    const listVirtualKey = document.querySelectorAll('.keyboard__btn');

    listVirtualKey.forEach((btn) => {

      if (btn.innerText.toUpperCase() === valueBtn.toUpperCase()) {
        btn.classList.add('disabled');
        btn.disabled = true;
      }

    })

  }

  increaseСounter = (count) => {
    
    document.querySelector('.not-correct__counter').innerText = count;

    this.renderPepe(count);
  
  } 

  defeat = (secretWordFromModel) => {

    if (secretWordFromModel) {
      
      // создание модалки
      const feid = document.createElement('div');
      feid.className = 'feid';

      const modal = document.createElement('div');
      modal.className = 'modal';

      const modalImg = document.createElement('div');
      modalImg.className = 'modal__img';

      const img = document.createElement('img');

      const result = document.createElement('div');
      result.className = 'result';

      const resultTitle = document.createElement('p');
      resultTitle.className = 'result__title';

      const resultSecretWord = document.createElement('p');
      resultSecretWord.className = 'result__secret-word';

      const secretWordTitle = document.createElement('span');
      const secretWord = document.createElement('span');

      const buttonRefrash = document.createElement('button');

      const btnImg = document.createElement('img');

      btnImg.src = this.images.play;

      // вставка картинки
      img.src = this.images.defeat;
      modalImg.insertAdjacentElement('afterbegin', img);
      modal.insertAdjacentElement('afterbegin', modalImg);

      
      // вставка результата
      resultTitle.innerText = 'You lose!';

      result.insertAdjacentElement('afterbegin', resultTitle);

      secretWord.innerText = secretWordFromModel;

      resultSecretWord.insertAdjacentElement('beforeend', secretWord);

      secretWordTitle.innerText = 'Secret word: ';

      resultSecretWord.insertAdjacentElement('afterbegin', secretWordTitle);

      result.insertAdjacentElement('beforeend', resultSecretWord);

      modal.insertAdjacentElement('beforeend', result);
    
      // вставка кнопки

      buttonRefrash.className = 'refresh';

      buttonRefrash.insertAdjacentElement('beforeend', btnImg);

      buttonRefrash.dataset.refresh = 'play';

      modal.insertAdjacentElement('beforeend', buttonRefrash);
      
      feid.insertAdjacentElement('afterbegin', modal);

      this.elements.main.body.insertAdjacentElement('afterbegin', feid);

    }
  }

  victory = (secretWordFromModel) => {
    if (secretWordFromModel) {
      
      // создание модалки
      const feid = document.createElement('div');
      feid.className = 'feid';

      const modal = document.createElement('div');
      modal.className = 'modal';

      const modalImg = document.createElement('div');
      modalImg.className = 'modal__img';

      const img = document.createElement('img');

      const result = document.createElement('div');
      result.className = 'result';

      const resultTitle = document.createElement('p');
      resultTitle.className = 'result__title';

      const resultSecretWord = document.createElement('p');
      resultSecretWord.className = 'result__secret-word';

      const secretWordTitle = document.createElement('span');
      const secretWord = document.createElement('span');

      const buttonRefrash = document.createElement('button');

      const btnImg = document.createElement('img');

      btnImg.src = this.images.play;

      // вставка картинки
      img.src = this.images.win;
      modalImg.insertAdjacentElement('afterbegin', img);
      modal.insertAdjacentElement('afterbegin', modalImg);

      
      // вставка результата
      resultTitle.innerText = 'You won!';

      result.insertAdjacentElement('afterbegin', resultTitle);

      secretWord.innerText = secretWordFromModel;

      resultSecretWord.insertAdjacentElement('beforeend', secretWord);

      secretWordTitle.innerText = 'Secret word: ';

      resultSecretWord.insertAdjacentElement('afterbegin', secretWordTitle);

      result.insertAdjacentElement('beforeend', resultSecretWord);

      modal.insertAdjacentElement('beforeend', result);
    
      // вставка кнопки

      buttonRefrash.className = 'refresh';

      buttonRefrash.insertAdjacentElement('beforeend', btnImg);

      buttonRefrash.dataset.refresh = 'play';

      modal.insertAdjacentElement('beforeend', buttonRefrash);
      
      feid.insertAdjacentElement('afterbegin', modal);

      this.elements.main.body.insertAdjacentElement('afterbegin', feid);

    }
  }

  newGame = () => {

    document.querySelectorAll('.keyboard__btn').forEach((btn) => {
      btn.classList.remove('disabled');
      btn.disabled = false;
    })
    
    document.querySelectorAll('.feid').forEach((item) => {
      item.remove();
    })

    this.elements.imgHangman.wrapperPepe.querySelectorAll('img').forEach((item) => {
      item.style.display = 'none';
    })
  }

  renderPepe = (count) => {
    switch (count) {
      case 1:
          document.querySelector('.pepe__head').style.display = 'block';
        break;
      case 2:
        document.querySelector('.pepe__body').style.display = 'block';
        break;
      case 3:
        document.querySelector('.pepe__hand--left').style.display = 'block';
        break;
      case 4:
        document.querySelector('.pepe__hand--right').style.display = 'block';
        break;
      case 5:
        document.querySelector('.pepe__foot--left').style.display = 'block';
        break;
      case 6:
        document.querySelector('.pepe__foot--right').style.display = 'block';
        break;
    
      default:
        break;
    }
  }
}

