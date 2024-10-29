import hangMan from '../img/hangman.jpg';
import head from '../img/head.png';
import body from '../img/body.png';
import hand from '../img/hand.png';
import foot from '../img/foot.png';
import defeat from '../img/defeat.png';
import win from '../img/win.png';
import play from '../img/play.svg';

export default class ModelHangman {

  constructor() {
    this.count = 0;
    this.isDefeat = false;
    this.isVictory = false;
    this.desabledBtns = [];
    this.openChar = [];
  }
  
  images = {
    hangMan: hangMan,
    head: head,
    body: body,
    hand: hand,
    foot: foot,
    defeat: defeat,
    play: play,
    win: win,
  }

  keyBoard = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B','N', 'M'];

  tasks = new Map(
    [
      ["What is the name of the green Jedi?", "YODA"],
      ["This name was given to a car and a comic book character", "LOGAN"],
      ["The most famous Georgian dish", "KHINKALI"],
      ["The capital of Great Britain", "LONDON"],
      ["What is the name of Biba's friend?", "BOBA"],
      ["What is the name of the Russian Zuckerberg?", "DUROV"],
      ["First man on the moon?", "ARMSTRONG"],
      ["First man in space?", "GAGARIN"],
      ["Capital of Armenia?", "EREVAN"],
      ["The biggest country in the world?", "RUSSIA"],
    ]
  )

  takeRandom = () => {
    const arrayTasks = Array.from(this.tasks);

    let randomTask = Math.floor(Math.random() * arrayTasks.length);

    const couple = arrayTasks[randomTask];

    return couple;
  }

  setLocalKey = (key) => {
    localStorage.setItem("secretWord", JSON.stringify(key));
  }

  loadFromStorage = () => {

    const localSecretWord = JSON.parse(localStorage.getItem("secretWord")) ||  this.takeRandom();

    if (!localSecretWord) {
      this.setLocalKey(this.takeRandom());
    } 

    let newRandomSecretWord = this.takeRandom();

    while (localSecretWord[0] === newRandomSecretWord[0]) {
      newRandomSecretWord = this.takeRandom();
    }

    this.setLocalKey(newRandomSecretWord);

    return newRandomSecretWord;
  }

  guessWord = (valueBtn) => {
    
    const secretWord = JSON.parse(localStorage.getItem("secretWord"))[1];

    let currentChar = '';

    const indexOpenChar = [];
    
    

    for(let char = 0; char < secretWord.length; char++){
      
      if (secretWord[char] === valueBtn.toUpperCase() && this.openChar.indexOf(char) === -1) {
        
        currentChar = secretWord[char];
        
        indexOpenChar.push(char);
      }
    }

    this.openChar.push(...indexOpenChar);

    if (this.openChar.length === secretWord.length) {
      this.isVictory = true;
    }

    return {currentChar, indexOpenChar};
    
  }
  
  counter = (valueBtn) => {
    
    const secretWord = JSON.parse(localStorage.getItem("secretWord"))[1];

    const noteIndex = secretWord.indexOf(valueBtn.toUpperCase());

    const blockKey = this.desabledBtns.indexOf(valueBtn.toUpperCase());

    const fromAlfabet = this.keyBoard.indexOf(valueBtn.toUpperCase());

    if (noteIndex === -1 && blockKey == -1 && fromAlfabet !== -1) {
      this.count += 1;
      this.desabledBtns.push(valueBtn.toUpperCase());
    }

    if (this.count >= 6) {
      this.isDefeat = true;
    }

    return this.count;
  }

  checkStatusDefeat = () => {
    if (this.isDefeat) {
      this.secretWord = JSON.parse(localStorage.getItem("secretWord"))[1]; 
      return this.secretWord;
    } 
  }

  
  checkStatusVictory = () => {
    if (this.isVictory) {
      this.secretWord = JSON.parse(localStorage.getItem("secretWord"))[1]; 
      return this.secretWord;
    }
  }

  newGame = () => {
    this.count = 0;
    this.secretWord = '';
    this.isDefeat = false;
    this.isVictory = false;
    this.desabledBtns = [];
    this.openChar = [];
    return this.loadFromStorage()
  }
}
