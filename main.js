// Hangman Game

const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");
let category = document.querySelector(".category span");
let lettersGuessContainer = document.querySelector(".letters-guess");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.className = "letter-box";

  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);

  lettersContainer.appendChild(span);
});

const words = {
  programming: ["javascript", "html", "php", "css", "python"],
  cars: ["bmw", "ford", "mercedes", "toyota", "fiat"],
  people: ["marwa lahrech", "adam khelladi", "omar", "fatima", "hafsa"],
  countries: ["egypt", "palestine", "moroco", "spain", "algeria"],
};

let allkeys = Object.keys(words);
let randomProp = allkeys[Math.floor(Math.random() * allkeys.length)];

let randomPropValue = words[randomProp];
let randomWord =
  randomPropValue[Math.floor(Math.random() * randomPropValue.length)];

category.innerHTML = randomProp;

let letterAndSpace = Array.from(randomWord);

letterAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");

  if (letter === " ") {
    emptySpan.className = "has-space";
  }

  lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDrow = document.querySelector(".hangman-drow");

document.addEventListener("click", (e) => {
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let clickedLetter = e.target.innerHTML.toLowerCase();

    letterAndSpace.forEach((wordLetter, wordIndex) => {
      if (clickedLetter == wordLetter) {
        theStatus = true;

        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });

    if (theStatus !== true) {
      wrongAttempts++;
      theDrow.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        setTimeout(() => {
          endGame();
          loseTheGame();
        }, 1000);
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
      winTheGame();
    }
  }
});

let row = document.querySelector(".row");
let result = document.querySelector(".result");

function endGame() {
  result.style.display = "block";
  row.remove();
  lettersGuessContainer.remove();
}

function loseTheGame() {
  let div = document.createElement("div");
  div.className = "popup";
  div.innerHTML = `Game Over, The Word Is <span>[ ${randomWord.toUpperCase()} ]</span>`;

  result.appendChild(div);
  palyAgain();
}

function palyAgain() {
  let again = document.createElement("div");
  again.className = "again";
  again.innerHTML = "Play Again";

  result.appendChild(again);

  document.querySelector(".again").addEventListener("click", () => {
    location.reload();
  });
}

function winTheGame() {
  let allLettersGuessed = true;
  guessSpans.forEach((span) => {
    if (span.innerHTML === "") {
      allLettersGuessed = false;
    }
  });

  if (allLettersGuessed) {
    setTimeout(() => {
      endGame();

      let div = document.createElement("div");
      div.className = "popup";
      div.innerHTML = `Congratulations, you are doing great!`;

      div.style.backgroundColor = "#222";
      div.style.color = "var(--main-color)";

      result.appendChild(div);
      palyAgain();
    }, 1000);
  }
}
