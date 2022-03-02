const X_CLASS = "x";
const CIRCLE_CLASS = "circle"
const cells = document.querySelectorAll(`[data-cell]`);
const board = document.getElementById("board")
const restartBtn = document.getElementById("restart")
const winningElement = document.getElementById("winning")
const winningMessage = document.querySelector(`[data-winning-message-text]`)
const winningNumbers = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
let circleTurn

const startGame = (() =>{
    const start = () => {
        circleTurn = false;
        cells.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
            cell.addEventListener("click", play.handleClick, { once: true });
        })
        setHover()
        winningElement.classList.remove("show")
    }

    const setHover = () => {
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
        circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
    }
    return Object.assign({}, {start}, {setHover})
})();

const play = (() => {
    const handleClick = (e) => {
        let cell = e.target;
        let currentPlayer = circleTurn ? CIRCLE_CLASS : X_CLASS
        placeMark(cell, currentPlayer)
        if (checkWin(currentPlayer)) {
            endGame(false);
        }
        else if (isDraw()) {
            endGame(true);
        }
        else {
            switchTurns();
            startGame.setHover();
        }
    }

    const endGame = (draw) => {
        if (draw) {
            winningMessage.innerText = "Its a TIE..."
        }
        else {
            winningMessage.innerText = `${circleTurn ? "The O's Win!" : "The X's Win!"}`;
        }
        winningElement.classList.add(`show`)
    }

    const placeMark = (cell, currentPlayer) => {
        cell.classList.add(currentPlayer)
    }

    const switchTurns = () => {
        circleTurn = !circleTurn;
    }

    const checkWin = (currentPlayer) => {
        return winningNumbers.some(combo => {
            return combo.every(index => {
                let check = cells[index].classList.value;
                return check.includes(currentPlayer);
            })
        })
    }

    const isDraw = () => {
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
        })
    }
    
    return Object.assign({}, { handleClick, endGame, placeMark, switchTurns, checkWin, isDraw })

})();



startGame.start();
restartBtn.addEventListener("click", startGame.start);