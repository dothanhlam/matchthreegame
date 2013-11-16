1. About game framework: phaser.io
I just used a minimum of phaser.io to organize application structure and manage sprite loading. The fact that we can
implement our own stuffs with pure javascript

2. NodeJS support
NodeJS have been supported. If you had the the nodeJS installation already, please open Commmand Line, and execute
"node nodejs/web-server.js". Then we can access the game at "localhost:8000"

3. Web server deployment
For some securities reason (I think), you must deploy the game to your own web server. Please deploying these following
folders and files:
 + assets      [folder] : all images assets
 + css         [folder] : css file
 + libs        [folder] : contains phaser.io framework
 + matchthree  [folder] : primary game application source
 + index.html  [file]   : HTML host file

4. Devices testing
This game has been tested on following device to test performance and screen issues:
Tablet:
    + Lenovo thinkpad Android tablet (10")
    + Asus Fonepad tablet (7")
Smartphone:
    + Hisence U950 (4.8")

5. How to play ?
Click / touch the first item to select
Click / touch the second appropriate item to swap. If this action does not build the matching of 3 items, then nothing
happens. Otherwise, 3 matching items will be removes and new coin appears at the third item position.

6. Knowledge issues / missing feature
Because of testing purpose only, the game have been implemented with minimum things. Some feature has not implemented
such as:
 - New Gems falling from the top of window after user builds 3 matching item
 - Combo treating: new gems may build the matching itself
 - Hint: giving user the hint when they could not build the matching for a long time.
 - Animation / transition: switching 2 gems, falling effects
 - Sound FX

7. Typescript version
Phaser.io also supports both Javascript and TypeScript version. As we know that Javascript is functional programming
language and applying OOP concepts for JavaScript application is painful. TypeScript is adaptable well with OOP
concept (class/interface declaration, encapsulation variables, function scopes ...). Developer that ports an existed
game from AS2/AS3 Flash to HTML5 would spend less time than implementing from pure JavaScript.