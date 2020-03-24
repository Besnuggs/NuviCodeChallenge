/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search (grid, wordlist) {
    /*
    * Additional Important Notes from Email Exchange with Jake, instructions, and looking at sample Grids/WordLists:
        1) Words are formed in a single, contiguous direction of characters (more like a crossword than a boggle game). Keep track of direction.
        2) Resulting array of words does not need to account for duplicates. If it exists in the grid and wordlist in a single, contiguous direction, return it. "You only need to find words that lie in a straight line."
        3) Given the example grids, it seems safe to assume that characters can be reused to form other words from previously found words. For example, 'SUN' and 'MOON' share the same 'N' in grid2. 'LOVE' and 'LION' share the same 'L' in grid1.
        4) Case insensitive. Ensure values that are being checked are either both lowercase/uppercase. The wordlist seems to always be lowercase based on examples provided in sample.
    */
    const wordlistNoDuplicates = [...new Set(wordlist)].map((word) => word.toLowerCase()),
        wordsFound = {},
        trie = new Trie();

    for(const word of wordlistNoDuplicates){
        trie.add(word);
    }
    
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            checkCharAtCoordinateAgainstCharInWords(i, j, grid, trie.root, wordsFound)
        }
    }

    console.log(wordlistNoDuplicates);
    console.table(grid);
    return Object.keys(wordsFound);
}

function checkCharAtCoordinateAgainstCharInWords(row, column, grid, trieNode, wordsFound, coordinates=[]){
    const letter = grid[row][column].toLowerCase();
    if(!(letter in trieNode)) return;
    //Need to see if direction is consistent - Need at least three coordinates to test
    if(coordinates.length >= 3){
        if(!isStraightLine(coordinates)) return coordinates=[];
    }
    coordinates.push([row, column])
    trieNode = trieNode[letter];
    if('*' in trieNode){
        console.log(trieNode)
        wordsFound[trieNode['*']] = true;
        coordinates=[];
    };
    const adjacentCharacters = getAdjacentCharacters(row, column, grid);
    for(const adjacentCharacter of adjacentCharacters){
        checkCharAtCoordinateAgainstCharInWords(adjacentCharacter[0], adjacentCharacter[1], grid, trieNode, wordsFound, coordinates);
    };
}

function isStraightLine(coordinates){
    let isSingleLine = true;

    const south = coordinates[0][0] < coordinates[1][0] && coordinates[0][1] === coordinates[1][1],
        north = coordinates[0][0] > coordinates[1][0] && coordinates[0][1] === coordinates[1][1],
        northEast = coordinates[0][0] > coordinates[1][0] && coordinates[0][1] < coordinates[1][1],
        northWest = coordinates[0][0] > coordinates[1][0] && coordinates[0][1] > coordinates[1][1],
        east = coordinates[0][0] === coordinates[1][0] && coordinates[0][1] < coordinates[1][1],
        west = coordinates[0][0] === coordinates[0][1] && coordinates[0][1] > coordinates[1][1],
        southEast = coordinates[0][1] > coordinates[1][0] && coordinates[0][1] < coordinates[1][1],
        southWest = coordinates[0][1] > coordinates[1][0] && coordinates[0][1] > coordinates[1][1];
    
    for(const coordinate of coordinates){
        if(south){
            coordinate[]
        } else if(southEast){

        } else if(southWest){

        } else if(north){

        } else if(northEast){

        } else if(northWest){

        } else if(east){

        } else if(west){

        } 
    }

    console.log({south, north, northEast, northWest, east, west, southEast, southWest})


    return isSingleLine;
}

function getAdjacentCharacters(row, column, grid){
    const adjacentCharacters = [];
    /*
    *Conditions: Adjacent Char Directions from Given Letter Coordinates*
    */
    const leftChar = column > 0,
        rightChar = column < grid[0].length - 1,
        topChar = row > 0,
        bottomChar = row < grid.length - 1
        topLeftChar = row > 0 && column > 0,
        topRightChar = row > 0 && column < grid[0].length - 1,
        bottomRightChar = row < grid.length - 1 && column < grid[0].length - 1,
        bottomLeftChar = row < grid.length - 1 && column > 0;
    
    if(topLeftChar){
        adjacentCharacters.push([row - 1, column - 1]);
    };
    if(topRightChar){
        adjacentCharacters.push([row - 1, column + 1]);
    };
    if(bottomRightChar){
        adjacentCharacters.push([row + 1, column + 1]);
    };
    if(bottomLeftChar){
        adjacentCharacters.push([row + 1, column - 1]);
    };
    if(topChar){
        adjacentCharacters.push([row - 1, column]);
    };
    if(bottomChar){
        adjacentCharacters.push([row + 1, column]);
    };
    if(leftChar){
        adjacentCharacters.push([row, column - 1]);
    };
    if(rightChar){
        adjacentCharacters.push([row, column + 1]);
    };
    
    return adjacentCharacters;
}


class Trie{
    constructor(){
        this.root={};
        this.endSymbol='*';
    };

    add(word){
        let current = this.root;
        for(const letter of word){
            if(!(letter in current)) {
                current[letter] = {};
            };
            current = current[letter];
        };
        current[this.endSymbol] = word;
    };
}