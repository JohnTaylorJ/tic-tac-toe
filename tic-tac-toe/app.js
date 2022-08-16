let cells = document.querySelectorAll('.cell');

let winX = document.getElementById('winX');
let win0 = document.getElementById('win0');
let deadHeat = document.getElementById('deadHeat');

let winFlag = false;

let currentSymbol = document.getElementById('go');

let btnStart = document.getElementById('start');
btnStart.addEventListener('click', clear);

const winPositions = [[0,1,2],
                      [3,4,5],
                      [6,7,8],
                      [0,3,6],
                      [1,4,7],
                      [2,5,8],
                      [0,4,8],
                      [2,4,6]
]


window.addEventListener('load', start);


// Функции
function start () {

    currentSymbol.innerHTML = 'Ходит: X';
    cells.forEach(cell => cell.addEventListener('click', writeX) )
}

function writeX () {

    if (this.innerHTML == '') {

        this.innerHTML = 'X';
        currentSymbol.innerHTML = 'Ходит: 0';

        cells.forEach(cell => { cell.removeEventListener('click', writeX);
        cell.addEventListener('click', write0) } )
    }

    isWin();
    isDeadHeat();
}

function write0 () {

    if (this.innerHTML == '') {

        this.innerHTML = '0';

        cells.forEach(cell => cell.removeEventListener('click', write0) );

        start();
    }
    isWin();
    isDeadHeat();
}

function clear () {

    cells.forEach(cell => cell.innerHTML = '')
    winFlag = false;
    start();
}

function isWin () {

    for (let i = 0; i < winPositions.length; i++) {
        let j = 0;

        if (cells[winPositions[i][j]].innerHTML == 'X' && cells[winPositions[i][j+1]].innerHTML == 'X' && cells[winPositions[i][j+2]].innerHTML == 'X') {

            currentSymbol.innerHTML = 'Выиграл X!!!';

            winFlag = true;

            cells.forEach(cell => cell.removeEventListener('click', write0))

            winX.innerHTML++;
            break;
        }
        if (cells[winPositions[i][j]].innerHTML == '0' && cells[winPositions[i][j+1]].innerHTML == '0' && cells[winPositions[i][j+2]].innerHTML == '0') {
            currentSymbol.innerHTML = 'Выиграл 0!!!';

            winFlag = true;

            cells.forEach(cell => cell.removeEventListener('click', writeX));

            win0.innerHTML++;
            break;
        }
    }
}

function isDeadHeat () {

    if (winFlag == false) {

        let count = 0;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML) {
            count++;
            }
            if (count == 9) {
                currentSymbol.innerHTML = 'Ничья!';

                deadHeat.innerHTML++;
                for (let i = 0; i < cells.length; i++) {
                cells[i].removeEventListener('click', writeX);
                cells[i].removeEventListener('click', write0);
                }
            }
        }
    }
}