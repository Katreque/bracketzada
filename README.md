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
Install bracketzada via **npm** on your project:

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
let championship = new Tournament(players);
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

## Classes and Methods
Player Class:

```javascript
class Player {
  id: number;
  name: string;
}

let player = new Player(1, "Epic Name Here");
```

Tournament Class:

```javascript
class Tournament {
  players: Array<Player>;
  name: string;
  brackets: Array<Match>;
}

let tournament = new Tournament(playersArray, "Epic Tournament Name Here");
```

**generateBrackets()** - Initialize Tournament and return Tournament brackets object;

```javascript
tournament.generateBrackets();

/*
Return:

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

**tournament.brackets** - Has all brackets information;

```javascript
/*
tournament.brackets:

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

**numberMatches()** - Return number of Matches;

```javascript
tournament.numberMatches();

/*
Return:

4
*/
```

**setWinnerMatch(idMatch, idPlayer)** - Set the winner to the next match;

```javascript
class Tournament {
tournament.setWinnerMatch(1, 3);

/*
Return:

[ Node {
    id: 0,
    idChildren: [ 1 ],
    playerLeft: undefined,
    playerRight: undefined },
  Node {
    id: 1,
    idChildren: [ 2, 3 ],
    playerLeft: undefined,
    playerRight: Player { id: 2, name: 'PogChamp' } },
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

**findMatch(idMatch)** - Return data about match. If doesn't exist, return undefined;

```javascript
tournament.findMatch(1);

/*
Return:

{
  id: 1,
  idChildren: [ 2, 3 ],
  playerLeft: undefined,
  playerRight: undefined
}
*/
```

## License
[MIT](https://github.com/Katreque/bracketzada/blob/master/LICENSE)