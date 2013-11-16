/**
 * Created with JetBrains WebStorm.
 * User: LDo
 * Date: 11/15/13
 * Time: 9:41 AM
 * To change this template use File | Settings | File Templates.
 */
MatchThree = {};
MatchThree.PreLoader = function (game) {

};

MatchThree.PreLoader.prototype = {
    preload: function() {
        this.load.image('black', 'assets/black.png');
        this.load.image('red', 'assets/red.png');
        this.load.image('blue', 'assets/blue.png');
        this.load.image('green', 'assets/green.png');
        this.load.image('orange', 'assets/orange.png');
        this.load.image('purple', 'assets/purple.png');
        this.load.image('goldCoin', 'assets/gold_coin.png');
    },

    create: function() {
        this.initGameSettings();
        this.game.state.start('GamePlay');
    },

    initGameSettings: function() {
        this.game.input.maxPointers = 1;
        this.game.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.game.stage.scale.pageAlignHorizontally = true;
        }
        else {
             this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        }
    }
};