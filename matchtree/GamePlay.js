/**
 * Created with JetBrains WebStorm.
 * User: LDo
 * Date: 11/15/13
 * Time: 10:36 AM
 * To change this template use File | Settings | File Templates.
 */


MatchThree.GamePlay = function (game) {
    this.MATCHING_3_GEMS_POINT = 100;
    this.COLLECTING_COIN_POINT = 150;
    this.COINTS_FOR_COMBO = 1;

    this.ROWS = 8;
    this.COLUMNS = 8

    this.colorsArray = ['black', 'green', 'purple', 'red', 'blue', 'orange'];

    this.GEMS_NUM = this.colorsArray.length;
    this.GEM_SIZE = 65;
    this.gemsArray = [];
    this.gemInstanceArray = [];

    this.selectorRow = -this.ROWS;
    this.selectorColumn = -this.COLUMNS;

    this.gainedCoins = 0;
    this.score = 0;
};

MatchThree.GamePlay.prototype = {

    create: function() {
        this.updateScoreAndCoins(0, 0);
        this.initGame();
    },

    initGame:function() {
        for (var i = 0; i < this.COLUMNS; i++) {
            this.gemsArray[i] = [];
            for (var j = 0; j < this.ROWS; j++) {
                do {
                    this.gemsArray[i][j]= Math.floor(Math.random()* this.GEMS_NUM);
                }
                while (this.isStreak(i,j));
                this.addGem(i + "_" + j, j * this.GEM_SIZE, i * this.GEM_SIZE, this.colorsArray[this.gemsArray[i][j]], this.gemClickHandler);
            }
        }
    },

    gemClickHandler: function(gem) {
        var clickedRow = gem.y / this.GEM_SIZE;
        var clickedColumn = gem.x / this.GEM_SIZE;

        if (!this.isAdjacent(clickedRow, clickedColumn, this.selectorRow, this.selectorColumn)) {
            this.selectorRow = clickedRow;
            this.selectorColumn = clickedColumn;
        }
        else {
            this.swapGemValue(this.selectorRow, this.selectorColumn, clickedRow, clickedColumn);
            if (this.isStreak(this.selectorRow,this.selectorColumn)||this.isStreak(clickedRow,clickedColumn)) {
                this.swapGem(this.selectorRow, this.selectorColumn, clickedRow, clickedColumn);

                if (this.isStreak(this.selectorRow,this.selectorColumn)) {
                   this.removeGems(this.selectorRow,this.selectorColumn);
                }
                if (this.isStreak(clickedRow,clickedColumn)) {
                   this.removeGems(clickedRow,clickedColumn);
                }
                this.updateScoreAndCoins(0, this.MATCHING_3_GEMS_POINT);
            }
            else {
                this.swapGemValue(this.selectorRow, this.selectorColumn, clickedRow, clickedColumn);
            }
            this.selectorColumn = -this.COLUMNS;
            this.selectorRow = -this.ROWS;
        }
    },

    // game logical
    swapGemValue: function(fromRow,fromColumn,toRow,toColumn) {
        var originalPosition = this.gemsArray[fromRow][fromColumn];
        this.gemsArray[fromRow][fromColumn] = this.gemsArray[toRow][toColumn];
        this.gemsArray[toRow][toColumn] = originalPosition;
    },

    isStreak: function(row,col) {
        return this.checkRow(row,col) > 2 || this.checkColumn(row,col) > 2;
    },

    isAdjacent: function (row1,col1,row2,col2){
        return (Math.abs(row1 - row2)+ Math.abs(col1 - col2)) == 1;
    },

    isSameGem: function (gemType,row,column) {
        if (this.gemsArray[row] == null) {
            return false;
        }

        if (this.gemsArray[row][column] == null) {
            return false;
        }

        return gemType == this.gemsArray[row][column];
    },

    checkColumn: function (row,column) {
        var gemType = this.gemsArray[row][column];
        var lineLength = 1;
        var checkRow = row;

        while (this.isSameGem(gemType,checkRow-1,column)) {
            checkRow --;
            lineLength ++;
        }

        checkRow = row;
        while (this.isSameGem(gemType,checkRow+1,column)) {
            checkRow ++;
            lineLength ++;
        }
        return lineLength;
    },

    checkRow: function (row,column) {
        var gemType = this.gemsArray[row][column];
        var lineLength = 1;
        var checkColumn = column;

        while (this.isSameGem(gemType,row,checkColumn-1)) {
            checkColumn --;
            lineLength ++;
        }
        checkColumn = column;
        while (this.isSameGem(gemType,row,checkColumn+1)) {
            checkColumn ++;
            lineLength ++;
        }
        return lineLength;
    },

    //utilities functions
    updateScoreAndCoins: function(coins, newScore) {
        this.gainedCoins += coins;
        this.score += newScore;
        document.getElementById("coin").innerText = this.gainedCoins;
        document.getElementById("score").innerText = this.score;
    },

    // gems management functions
    addGem: function(name, x, y, color, clickHandler) {
        var gem = this.game.add.sprite(x, y, color);
        gem.name = name;
        this.gemInstanceArray.push(gem);
        gem.inputEnabled = true;
        gem.events.onInputDown.add(clickHandler, this);
    },

    getGemByName: function(name) {
        for (var i = 0; i < this.gemInstanceArray.length; i ++) {
            if (this.gemInstanceArray[i].name === name) {
                return this.gemInstanceArray[i];
            }
        }
        return null;
    },

    removeGemByName: function(name) {
        for (var i = 0; i < this.gemInstanceArray.length; i ++) {
            if (this.gemInstanceArray[i].name === name) {
                this.gemInstanceArray.splice(i, 1);
                return;
            }
        }
    },

    swapGem: function(row1,col1,row2,col2) {
        var gem1 = this.getGemByName(row1 + "_" + col1);
        var gem2 = this.getGemByName(row2 + "_" + col2);

        if ((gem1 == null) || (gem2 == null)) {
            return;
        }


        gem1.x = col2 * this.GEM_SIZE;
        gem1.y = row2 * this.GEM_SIZE;
        gem1.name = "tmp";

        gem2.x = col1 * this.GEM_SIZE;
        gem2.y = row1 * this.GEM_SIZE;
        gem2.name = row1 + "_" + col1;

        this.getGemByName("tmp").name = row2 + "_" + col2;
    },


    removeGems: function(row,col) {
        var gemsToRemove = [row+"_"+col];
        var current = this.gemsArray[row][col];
        var tmp;

        if (this.checkRow(row,col)>2) {
            tmp = col;
            while (this.isSameGem(current,row,tmp-1)) {
                tmp--;
                gemsToRemove.push(row+"_"+tmp);
            }
            tmp = col;
            while (this.isSameGem(current,row,tmp+1)) {
                tmp++;
                gemsToRemove.push(row+"_"+tmp);
            }
        }

        if (this.checkColumn(row,col)>2) {
            tmp = row;
            while (this.isSameGem(current,tmp-1,col)) {
                tmp--;
                gemsToRemove.push(tmp+"_"+col);
            }
            tmp = row;
            while (this.isSameGem(current,tmp+1,col)) {
                tmp++;
                gemsToRemove.push(tmp+"_"+col);
            }
        }

        for (var i = 0; i < gemsToRemove.length; i ++) {
            var removedGem = this.getGemByName(gemsToRemove[i]);
            if (removedGem != null) {
                var coord = removedGem.name.split("_");
                this.gemsArray[coord[0]][coord[1]] = null;
                removedGem.destroy();
                this.removeGemByName(gemsToRemove[i]);
            }
        }

        this.adjustGems();
        this.replaceGems();
    },

    adjustGems: function() {
        for (var j = 0; j < this.COLUMNS; j++) {
            for (var i = this.ROWS - 1; i > 0; i--) {
                if (this.gemsArray[i][j] == null) {
                    for (var k = i; k > 0; k--) {
                        if (this.gemsArray[k][j]!= null) {
                            break;
                        }
                    }

                    if (this.gemsArray[k][j]!= null) {
                        this.gemsArray[i][j] = this.gemsArray[k][j];
                        this.gemsArray[k][j] = null;
                        var gem = this.getGemByName(k+"_"+j);
                        if (gem != null) {
                            gem.y = this.GEM_SIZE * i;
                            gem.name = i+"_"+j;

                            if (this.isStreak(i,j)) { // combo
                                this.removeGems(i,j);
                                this.updateScoreAndCoins(this.COINTS_FOR_COMBO, this.COLLECTING_COIN_POINT);
                            }
                        }
                    }
                }
            }
        }
    },

    replaceGems: function() {
        for (var i = this.COLUMNS - 1; i >= 0; i --) {
            for (var j = 0; j < this.ROWS; j++) {
               if (this.gemsArray[i][j] == null) {
                   this.gemsArray[i][j]= Math.floor(Math.random()* this.GEMS_NUM);
                   this.addGem(i + "_" + j, j * this.GEM_SIZE, i * this.GEM_SIZE, this.colorsArray[this.gemsArray[i][j]], this.gemClickHandler);
                   if (this.isStreak(i,j)) { // combo
                       this.removeGems(i,j);
                       this.updateScoreAndCoins(this.COINTS_FOR_COMBO, this.COLLECTING_COIN_POINT);
                   }
               }
            }
        }
    }
};
