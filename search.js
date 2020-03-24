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
    * Additional Notes from Email Exchange with Jake, instructions, and looking at sample Grids/WordLists:
        1) Words are formed in a single, contiguous direction of characters (more like a crossword than a boggle game). Keep track of direction.
        2) Resulting array of words does not need to account for duplicates. If it exists in the grid and wordlist in a single, contiguous direction, return it.
        3) Given the example grids, it seems safe to assume that characters can be reused to form other words from previously found words. For example, 'SUN' and 'MOON' share the same 'N' in grid2. 'LOVE' and 'LION' share the same 'L' in grid1.
        4) Case insensitive. Ensure values that are being checked are either both lowercase/uppercase.
    */
    const wordlistNoDuplicates = [...new Set(wordlist)].map((word) => word.toUpperCase()),
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

    console.log(wordlistNoDuplicates)
    console.table(grid)
    return Object.keys(wordsFound);
}

function checkCharAtCoordinateAgainstCharInWords(row, column, grid, trieNode, wordsFound){
    const letter = grid[row][column]
    if(!(letter in trieNode)) return;
    trieNode = trieNode[letter];
    if('*' in trieNode){
        wordsFound[trieNode['*']] = true;
    };
    const adjacentCharacters = getAdjacentCharacters(row, column, grid);
    for(const adjacentCharacter of adjacentCharacters){
        checkCharAtCoordinateAgainstCharInWords(adjacentCharacter[0], adjacentCharacter[1], grid, trieNode, wordsFound)
    };
}

function getAdjacentCharacters(row, column, grid){
    const adjacentCharacters = [];
    /*
    *Adjacent Char Directions from Given Letter*
    */
    const leftAdjacentChar = column > 0,
        rightAdjacentChar = column < grid[0].length - 1,
        topAdjacentChar = row > 0,
        bottomAdjacentChar = row < grid.length - 1
        topLeftAdjacentChar = row > 0 && column > 0,
        topRightAdjacentChar = row > 0 && column < grid[0].length - 1,
        bottomRightAdjacentChar = row < grid.length - 1 && column < grid[0].length - 1,
        bottomLeftAdjacentChar = row < grid.length - 1 && column > 0;
    
    if(topLeftAdjacentChar){
        adjacentCharacters.push([row - 1, column - 1]);
    };
    if(topRightAdjacentChar){
        adjacentCharacters.push([row - 1, column + 1]);
    };
    if(bottomRightAdjacentChar){
        adjacentCharacters.push([row + 1, column + 1]);
    };
    if(bottomLeftAdjacentChar){
        adjacentCharacters.push([row + 1, column - 1]);
    };
    if(topAdjacentChar){
        adjacentCharacters.push([row - 1, column]);
    };
    if(bottomAdjacentChar){
        adjacentCharacters.push([row + 1, column]);
    };
    if(leftAdjacentChar){
        adjacentCharacters.push([row, column - 1]);
    };
    if(rightAdjacentChar){
        adjacentCharacters.push([row, column + 1]);
    };
    
    return adjacentCharacters;
}


class Trie{
    constructor(){
        this.root={};
        this.endSymbol='*';
    }

    add(word){
        let current = this.root;
        for(const letter of word){
            if(!(letter in current)) {
                current[letter] = {};
            }
            current = current[letter];
        }
        current[this.endSymbol] = word;
    }
}