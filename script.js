const addPlayer = document.querySelector("#addPlayer");
const divPlayer = document.querySelector(".divPlayer");

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
