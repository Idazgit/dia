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
// Ajouter un tableau pour stocker les pseudos
let tableauPseudos = [];
// définir l'index du joueur
indexJoueurActuel = 0;

let dernierTableau;
// function qui ajoute les pseudo a la liste et au tableau
function ajouterName() {
  if (initialInputs.value !== "") {
    // Ajouter la valeur au tableau
    tableauPseudos.push(initialInputs.value.trim());
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
  actualPlayer.textContent = tableauPseudos[indexJoueurActuel];
}
// changement des pseudo dans la div actualPlayer
function changementPseudo() {
  // définir la div pseudo au premier pseudo rentré lors du lancement de la page
  actualPlayer.textContent = tableauPseudos[0];

  // utilisation de la function pour l'affichage des pseudo / distribution des gorgées
  bouttonJoueur.addEventListener("click", () => {
    switchPseudo();
    calculGorgées();

    console.log(dernierTableau);
  });
}
const premierTableau = tableauPseudos[0];

function calculGorgées() {
  resultat = desAleatoires();
  switch (resultat) {
    case 2:
      console.log("distribue 1 gorgée");
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
      break;
    case 9:
      break;
    case 10:
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
