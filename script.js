const addPlayer = document.querySelector("#addPlayer");
const divPlayer = document.querySelector(".divPlayer");
const premierePage = document.querySelector(".premierePage");
const gamePage = document.querySelector(".gamePage");
const rulesPage = document.querySelector(".rulesPage");

//choix des pseudo
let playerCount = 0;
console.log(playerCount);

addPlayer.addEventListener("click", () => {
  if (playerCount < 10) {
    playerCount++;

    const newPlayer = document.createElement("input");
    newPlayer.setAttribute("type", "text");
    newPlayer.id = "pseudo";
    divPlayer.appendChild(newPlayer);
  } else {
    addPlayer.disabled = true;
  }
});
// changement de page
const jouer = document.querySelector(".jouer");
const regles = document.querySelector(".regles");

regles.addEventListener("click", () => {
  rulesPage.style.display = "flex";
  premierePage.style.display = "none";
});

jouer.addEventListener("click", () => {
  gamePage.style.display = "flex";
  premierePage.style.display = "none";
});
//boutton back
const buttonBack1 = document.querySelector(".buttonBack");

buttonBack1.addEventListener("click", () => {
  gamePage.style.display = "none";
  premierePage.style.display = "flex";
});
const buttonBack2 = document.querySelector(".buttonBack2");

buttonBack2.addEventListener("click", () => {
  rulesPage.style.display = "none";
  premierePage.style.display = "flex";
});

// CHRONO !

let chrono = document.getElementById("chrono");
let startBtn = document.getElementById("loadGame");

let heures = 0;
let minutes = 0;
let secondes = 0;
let timeout;

let estArrete = true;

const demarrer = () => {
  if (estArrete) {
    estArrete = false;
    defilerTemps();
  }
  //recupération des données input pseudo
  const newPlayer = document.getElementById("pseudo");
  const actualPlayer = document.querySelector(".actualPlayer");
  const inputValue = newPlayer.value;
  actualPlayer.textContent = inputValue;

  gamePage.style.display = "none";
  tapisJeu.style.display = "flex";
};

const arreter = () => {
  if (!estArrete) {
    estArrete = true;
    clearTimeout(timeout);
  }
};

const defilerTemps = () => {
  if (estArrete) return;

  secondes = parseInt(secondes);
  minutes = parseInt(minutes);
  heures = parseInt(heures);

  secondes++;

  if (secondes == 60) {
    minutes++;
    secondes = 0;
  }

  if (minutes == 60) {
    heures++;
    minutes = 0;
  }

  //   affichage
  if (secondes < 10) {
    secondes = "0" + secondes;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (heures < 10) {
    heures = "0" + heures;
  }

  chrono.textContent = `${heures}:${minutes}`;

  timeout = setTimeout(defilerTemps, 1000);
};

const reset = () => {
  chrono.textContent = "00:00";
  estArrete = true;
  heures = 0;
  minutes = 0;
  secondes = 0;
  clearTimeout(timeout);
};

startBtn.addEventListener("click", demarrer);

//bouton endPage
const endGame = document.querySelector(".endGame");
const endPage = document.querySelector(".endPage");
const tapisJeu = document.querySelector(".tapisJeu");

endGame.addEventListener("click", () => {
  tapisJeu.style.display = "none";
  endPage.style.display = "flex";
});
//bouton reload
const reload = document.querySelector(".buttonReload");

function handleclick() {
  window.location.reload();
}

reload.addEventListener("click", handleclick);
