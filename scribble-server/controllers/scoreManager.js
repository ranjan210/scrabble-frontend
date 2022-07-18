const fs = require("fs");
const testArr = []

for (let l = 0; l < 81; l++) {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    testArr.push(randLetter);
}


exports.checkScore = async (val, pos, id_room, callbackfunc) => {
    let score = 0;
    const rowScore = await checkRow(id_room, pos);
    const colScore = await checkCol(id_room, pos);
    score = parseInt(rowScore) + parseInt(colScore);
    console.log(rowScore + ":" + colScore)
    callbackfunc(score)
}

async function checkWord(file, word) {
    const fileContent = fs.readFileSync(file);
    const regex = new RegExp("\\b" + word + "\\b");
    if (regex.test(fileContent)) {
        return word.length.toString();
    }

    else {
        return 0;

    };

}

async function checkRow(id_room, pos) {

    const posNum = parseInt(pos);
    const quot = parseInt(pos / 9);
    let rowArr = []
    let words = [];
    for (let i = 0; i <= 81; i++) {
        if (parseInt(i / 9) == quot) {
            rowArr.push(i);
        }
    }

    const index = rowArr.indexOf(posNum)
    // j is the current starting point

    for (let j = 0; j < 9; j++) {

        if (j < index) {

            // k is all possible end points 
            for (let k = index; k < 9; k++) {
                let word = "";
                // a goes from current starting point to current end points
                for (let a = j; a <= k; a++) {
                    const letter = global[id_room].grid[rowArr[a]];
                    if (letter != null) {
                        if (letter == "") { break; }
                        word += letter;
                    }
                }
                words.push(word)

            }
        }

        if (j >= index) {
            // k is all possible endpoints
            for (let k = j; k < 9; k++) {
                // a goes from index to current end points
                let word = "";
                for (let a = index; a <= k; a++) {
                    const letter = global[id_room].grid[rowArr[a]];
                    if (letter != null) {
                        if (letter == "") { break; }
                        word += letter;
                    }

                }
                words.push(word)

            }
            break;
        }

    }
    let maxScore = 0;
    let wordToUse = ""
    for (const word of words) {
        if(global[id_room].usedWords.includes(word)){
            continue;
        }
        const newS = await checkWord("twl06.txt", word);
        if (newS > maxScore) {
            maxScore = newS
                wordToUse = word

        }
    }
    global[id_room].usedWords.push(wordToUse)
    return maxScore;
}


async function checkCol(id_room, pos) {
    const posNum = parseInt(pos);
    const rem = parseInt(pos % 9);
    let colArr = []
    const words = [];
    for (let i = 0; i <= 81; i++) {
        if (parseInt(i % 9) == rem) {
            colArr.push(i);
        }
    }

    const index = colArr.indexOf(posNum)
    // j is the current starting point

    for (let j = 0; j < 9; j++) {

        if (j < index) {

            // k is all possible end points 
            for (let k = index; k < 9; k++) {
                let word = "";
                // a goes from current starting point to current end points
                for (let a = j; a <= k; a++) {
                    const letter = global[id_room].grid[colArr[a]];
                    console.log("Letter:" + letter);

                    if (letter != null) {
                        if (letter == "") { break; }
                        word += letter;
                    }

                }
                words.push(word)
                console.log("Word: " + word);

            }
        }

        if (j >= index) {
            // k is all possible endpoints
            for (let k = j; k < 9; k++) {
                // a goes from index to current end points
                let word = "";
                for (let a = index; a <= k; a++) {
                    const letter = global[id_room].grid[colArr[a]];
                    console.log("Letter:" + letter);
                    if (letter != null) {
                        if (letter == "") { break; }
                        word += letter;
                    }
                }
                words.push(word)
                console.log("Word: " + word);

            }
            break;
        }

    }

    let maxScore = 0;
    let wordToUse = ""
    console.log(words);
    for (const word of words) {
        if(global[id_room].usedWords.includes(word)){
            continue;
        }

        const newS = await checkWord("twl06.txt", word);
        if (newS > maxScore) {
            console.log("Word: " + word + ": " + newS)
            maxScore = newS
                wordToUse = word
            
        }
    }
    global[id_room].usedWords.push(wordToUse)

    return maxScore;
}