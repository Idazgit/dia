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
const initialInputs = document.getElementById("pseudo");
const liste = document.getElementById("maListe");
const consignes = document.getElementById("consignes");
// Ajouter un tableau pour stocker les pseudos
let tableauPseudos = [];
// définir l'index du joueur
indexJoueurActuel = 0;
let dernierTableau;
// function qui ajoute les pseudo a la liste et au tableau
function ajouterName() {
  if (initialInputs.value !== "") {
    // Ajouter la valeur a l'objet dans le tableau
    const joueurTableau = {
      pseudo: initialInputs.value.trim(),
      score: 0,
    };
    tableauPseudos.push(joueurTableau);
    dernierTableau = tableauPseudos[tableauPseudos.length - 1];

    // Créer un nouvel élément de liste
    const li = document.createElement("li");
    li.textContent = initialInputs.value;

    // Ajouter l'élément à la liste
    liste.appendChild(li);

    // Vider l'input
    initialInputs.value = "";
    // Afficher le tableau dans la console
    console.log("Tableau des pseudos:", tableauPseudos);
    return joueurTableau;
  }
}
// function qui fait une valeur dés aléatoire
function desAleatoires() {
  const randomNumber = Math.floor(Math.random() * 12) + 1;
  const resultat = Math.floor(randomNumber);
  console.log(resultat);
  return resultat;
}
// function change l'affichage des pseudo dans la div actual
function switchPseudo() {
  indexJoueurActuel = (indexJoueurActuel + 1) % tableauPseudos.length;
  // permet le changement de pseudo au bout de 2 secondes
  setTimeout(function () {
    joueurTableau = ajouterName();
    console.log(indexJoueurActuel);

    actualPlayer.textContent = tableauPseudos[indexJoueurActuel].pseudo;
  }, 2000);
  return indexJoueurActuel;
}
// changement des pseudo dans la div actualPlayer
function changementPseudo() {
  // définir la div pseudo au premier pseudo rentré lors du lancement de la page
  actualPlayer.textContent = tableauPseudos[0].pseudo;

  // utilisation de la function pour l'affichage des pseudo / distribution des gorgées
  bouttonJoueur.addEventListener("click", () => {
    calculGorgées();
  });
}
// défininition des consignes
function calculGorgées() {
  resultat = desAleatoires();
  switch (resultat) {
    case 2:
      consignes.textContent = "distribue 1 gorgée";
      break;
    case 3:
      break;
    case 4:
      consignes.textContent = "distribue 2 gorgée";
      break;

    case 6:
      consignes.textContent = "distribue 3 gorgée";
      break;
    case 7:
      consignes.textContent = "CRIE DIABLE !!!!";
      break;
    case 8:
      if (indexJoueurActuel === 0) {
        consignes.textContent = dernierTableau + " boit 1 gorgée";
      } else {
        consignes.textContent =
          tableauPseudos[indexJoueurActuel - 1] + " boit 1 gorgée";
      }
      break;
    case 9:
      if (indexJoueurActuel === 0) {
        consignes.textContent = tableauPseudos[0] + " boit 1 gorgée";
      } else {
        consignes.textContent =
          tableauPseudos[indexJoueurActuel] + " boit 1 gorgée";
      }

      break;
    case 10:
      if (indexJoueurActuel === tableauPseudos.length - 1) {
        consignes.textContent = tableauPseudos[0] + " boit 1 gorgée";
      } else {
        consignes.textContent =
          tableauPseudos[indexJoueurActuel + 1] + " boit 1 gorgée";
      }
      break;
    case 11:
      consignes.textContent = "tout le monde boit";
      break;
    case 12:
      consignes.textContent = "distribue 6 gorgées";
      break;
    default:
      consignes.textContent = "Ne Fait Rien";
  }
  indexJoueurActuel = switchPseudo();
}

// Ajouter un nouveau pseudo avec le bouton "addPlayer"
addPlayer.addEventListener("click", ajouterName);

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
  changementPseudo();
  if (estArrete) {
    estArrete = false;
    defilerTemps();
  }
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
