# bracketzada
A JavaScript library for tournament brackets generation. Design your own way, Bracketzada do the rest. Live example: https://katreque.github.io/bracketzada/

## Why?
Most of tournament bracket generators/libs implement algorithms and create components for you. Bracketzada has the idea to provide an API to generate and manage tournaments while you create and design your own frontend. The freedom you want, the power you need.

## Types
Implemented:
 - Simple Elimination

Future:
 - Double Elimination
 - Swiss Brackets


## Quick Start
Install bracketzada via npm on your project:

```
npm install bracketzada --save
```

Import both Player and Tournament classes and generate Tournament Brackets object, with all the info you need.

```javascript
let {Player, Tournament} = require('bracketzada');
let players = [
        new Player(0, 'Kappa'),
        new Player(1, 'Keppo'),
        new Player(2, 'PogChamp'),
        new Player(3, '4Head')
      ];
let championship = new Tournament();
let brackets = championship.generateBrackets();

/*
brackets:

[ Node {
    id: 0,
    idChildren: [ 1 ],
    playerLeft: undefined,
    playerRight: undefined },
  Node {
    id: 1,
    idChildren: [ 2, 3 ],
    playerLeft: undefined,
    playerRight: undefined },
  Node {
    id: 2,
    idChildren: [],
    playerLeft: Player { id: 0, name: 'Kappa' },
    playerRight: Player { id: 1, name: 'Keppo' } },
  Node {
    id: 3,
    idChildren: [],
    playerLeft: Player { id: 2, name: 'PogChamp' },
    playerRight: Player { id: 3, name: '4Head' } } ]
*/
```

## Methods


## License
[MIT](https://github.com/Katreque/bracketzada/blob/master/LICENSE)