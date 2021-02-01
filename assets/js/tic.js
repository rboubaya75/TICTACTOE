const statusDisplay = document.querySelector('.GameStatus');

let GameActive = true;

let CurrentPlayer = "X"

let GameState = ["", "", "", "", "", "", "", "", ""];

const MessageGagnant = () => confirm(`Bravo Joueur ${CurrentPlayer}, tu as gagné ! `);
const MessageEgaliter = () => confirm("c'est une égalité! Une nouvelle parti ?");
const TourJoueurActuel = () => `Joueur ${CurrentPlayer} à toi de jouer `;

// condition de victoir qui prenne en compte l'index afin de valider tout les possibilité grace à l'index de chaque cellule
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

statusDisplay.innerHTML = TourJoueurActuel(); // affiche le joueur actuel dans la partir GameStatus du html
function CelluleJouer(clickedCell, clickedCellIndex) {
    GameState[clickedCellIndex] = CurrentPlayer;
    clickedCell.innerHTML = CurrentPlayer;
}

// cette fonction permet de gerer les changement de joueur a chaque click elle va passer au joueur suivant
function ChangementJoueur() {
    CurrentPlayer = CurrentPlayer === "X" ? "O" : "X"; // verifie si le joueur est le X ou le O
    statusDisplay.innerHTML = TourJoueurActuel();
}

// cette fonction permet de définir le resultat de la parti en fonction des conditions de victoire

function ResultatPartie() {
    let Victoire = false; // durant le jeu la variable victoire est egal a false
    for (let i = 0; i <= 7; i++) {  
        const winCondition = winningConditions[i];
        let a = GameState[winCondition[0]];
        let b = GameState[winCondition[1]];
        let c = GameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            Victoire = true;
            break
        }
    }
// cette boucle prend en compte la victoire d'un des deux joueurs et arrête la parti tout en affichant le nom du vaincu
if (Victoire) {
        statusDisplay.innerHTML = MessageGagnant();
        GameActive = false;
        return;
    }
// si la partie ce conclue par une egalité, on cree une variable match nul et on fait passer le game active en false pour stopper le match, le message d'egalité informe aussi les joueur
    let MatchNul = !GameState.includes("");
    if (MatchNul) {
        statusDisplay.innerHTML = MessageEgaliter();
        GameActive = false;
        return;
    }

    ChangementJoueur();
}
// cette fonction valide les cellule cliquer afin de les rendre inactive et empecher le double clique d'une cellule
function CelluleCliquer(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );

    if (GameState[clickedCellIndex] !== "" || !GameActive) {
        return;
    }
   
    CelluleJouer(clickedCell, clickedCellIndex);
    ResultatPartie();

}
// Cette fonction permet de relancer la parti en réinitialisant les paramètres de bases
function GestionRematch() {
    GameActive = true;
    CurrentPlayer = "X";
    GameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = TourJoueurActuel();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}
// rend chaque cellule cliquable
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CelluleCliquer));
// rend le bouton restart match cliquable
document.querySelector('.GameRestart').addEventListener('click', GestionRematch);