const { render } = require("ejs");

const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard")

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const sqaureElement = document.createElement("div")
            sqaureElement.classList.add(
                "square",
                (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark"
            )

            sqaureElement.dataset.row = rowIndex;
            sqaureElement.dataset.col = squareIndex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece", square.color === "w" ? "white" : "black"
                )
                pieceElement.innerText = "";
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: squareIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSqua = null;
                });

                sqaureElement.appendChild(pieceElement);
            }

            sqaureElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            sqaureElement.addEventListener("drop", () => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(sqaureElement.dataset.row),
                        col: parseInt(sqaureElement.dataset.col)
                    };
                    handleMove(sourceSquare, targetSource);
                }
            });
            boardElement.appendChild(sqaureElement);
        })
    })
}

const handleMove = () => {

}

const getPieceUnicode = () => {

}

renderBoard();