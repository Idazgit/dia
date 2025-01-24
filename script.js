const addPlayer = document.querySelector("#addPlayer");
const divPlayer = document.querySelector(".divPlayer");
const premierePage = document.querySelector(".premierePage");
const gamePage = document.querySelector(".gamePage");
const rulesPage = document.querySelector(".rulesPage");
const tapisJeu = document.querySelector(".tapisJeu");
const endGame = document.querySelector(".endGame");
const endPage = document.querySelector(".endPage");
const jouer = document.querySelector(".jouer");
const regles = document.querySelector(".regles");
const actualPlayer = document.querySelector(".actualPlayer");
const bouttonJoueur = document.querySelector(".bouttonJoueur");
const reload = document.querySelector(".buttonReload");
let chrono = document.getElementById("chrono");
let startBtn = document.getElementById("loadGame");

// Ajouter un tableau pour stocker les pseudos
let pseudoList = [];
let indexJoueurActuel = 0;
const scores = {};
console.log(pseudoList);
console.log(scores);

// Récupérer les inputs déjà présents
const initialInputs = document.querySelectorAll("#pseudo");
initialInputs.forEach((input, index) => {
  // Ajouter les valeurs initiales au tableau
  pseudoList[index] = input.value.trim();

  // Mettre à jour le tableau lorsqu'un champ existant est modifié
  input.addEventListener("blur", (event) => {
    const value = event.target.value.trim();
    pseudoList[index] = value;
  });
});

// Mise à jour du compteur en fonction des inputs existants
let playerCount = initialInputs.length;

// Ajouter un nouvel input avec le bouton "addPlayer"
addPlayer.addEventListener("click", () => {
  if (playerCount < 10) {
    playerCount++;

    const newPlayer = document.createElement("input");
    newPlayer.setAttribute("type", "text");
    newPlayer.classList.add("pseudo-input");

    // Sauvegarder le pseudo lorsqu'on quitte l'input
    newPlayer.addEventListener("blur", (event) => {
      const value = event.target.value.trim();
      pseudoList[playerCount - 1] = value; // Mettre à jour le tableau
    });

    divPlayer.appendChild(newPlayer);
  } else {
    addPlayer.disabled = true;
  }
});
// Chaque joueur commence avec un score de 0
pseudoList.forEach((pseudo) => {
  scores[pseudo] = 0;
});
console.log(pseudo);
let dernierTableau = pseudoList[pseudoList.length - 1];
let premierTableau = pseudoList[0];
//function qui change les pseudo dans la div l'un après l'autre
function changementPseudo() {
  actualPlayer.textContent = pseudoList[0];
  bouttonJoueur.addEventListener("click", () => {
    //function qui fait le dés randoms
    function désClique() {
      const randomNumber = Math.floor(Math.random() * 12) + 1;
      const resultat = Math.floor(randomNumber);
      console.log(resultat);

      switch (resultat) {
        case 2:
          text = "distribue 1 gorgée";
          break;
        case 3:
          break;
        case 4:
          console.log("distribue 2 gorgées");
          break;
        case 5:
          break;
        case 6:
          console.log("distribue 3 gorgées");
          break;
        case 7:
          console.log("crie diable");
          break;
        case 8:
          if (premierTableau) {
            console.log(dernierTableau + " boit 1 gorgée");
          } else {
            console.log(pseudoList[indexJoueurActuel - 2] + "boit 1 gorgée");
          }
          break;
        case 9:
          if (premierTableau) {
            console.log(dernierTableau + " boit 1 gorgée");
          } else {
            console.log(pseudoList[indexJoueurActuel - 1] + "boit 1 gorgée");
          }

          break;
        case 10:
          if (dernierTableau) {
            console.log(premierTableau + " boit 1 gorgée");
          } else {
            console.log(pseudoList[indexJoueurActuel] + 1 + " boit 1 gorgée");
          }

          break;
        case 11:
          console.log("tout le monde boit");
          break;
        case 12:
          console.log("distribue 6 gorgées");
          break;
        default:
          console.log("ne fait rien");
      }
    }
    indexJoueurActuel = (indexJoueurActuel + 1) % pseudoList.length;
    actualPlayer.textContent = pseudoList[indexJoueurActuel];
    désClique();
  });
}

// changement de page pour jouer
regles.addEventListener("click", () => {
  rulesPage.style.display = "flex";
  premierePage.style.display = "none";
});

jouer.addEventListener("click", () => {
  gamePage.style.display = "flex";
  premierePage.style.display = "none";
});
endGame.addEventListener("click", () => {
  tapisJeu.style.display = "none";
  endPage.style.display = "flex";
});
//boutton back qui change de page
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
  changementPseudo();

  //changement de page vers la page de jeu
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

startBtn.addEventListener("click", demarrer);

//bouton reload game
function handleclick() {
  window.location.reload();
}
reload.addEventListener("click", handleclick);

// prendre les données de l'input et les ajouter dans le tableau puis vider l'input , rajouter une liste en dessous des inputs pour les joueurs deja rentré
