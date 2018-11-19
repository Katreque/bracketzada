import {expect} from 'chai';
import {Tournament, Player} from './bracketzada.js';

describe('Player Class', function() {
  describe('Instance', function() {
    it('Must have id and name instantiating a new Player.', function() {
      let player = new Player(1, "Kappa");

      expect(player.id).equal(1);
      expect(player.name).equal("Kappa");
    })
  })
})

describe('Tournament Class', function() {
  describe('Instance', function() {
    it('Must have a Players array.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'a')
      ];
      let tournament = new Tournament(players);

      expect(tournament.name).equal('Bracketzada Tournament');
      expect(tournament.players).equals(players);
    })

    it('Name should be overwritten.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'a')
      ];
      let tournament = new Tournament(players, "Charlinhos Cup!");

      expect(tournament.name).equal('Charlinhos Cup!');
      expect(tournament.players).equals(players);
    })
  })

  describe('numberMatches', function() {
    it('Should return 0 as there are no players on the tournament.', function() {
      let players: Player[] = [];
      let tournament = new Tournament(players);

      expect(tournament.numberMatches()).equal(0);
    });

    it('Should return 1 as there is 1 player on the tournament.', function() {
      let players = [
        new Player(0, 'a')
      ];
      let tournament = new Tournament(players);

      expect(tournament.numberMatches()).equal(1);
    });

    it('Should return 2 as there are 2 player on the tournament.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
      ];
      let tournament = new Tournament(players);

      expect(tournament.numberMatches()).equal(2);
    });

    it('Should return 4 as there are 3 player on the tournament.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c')
      ];
      let tournament = new Tournament(players);

      expect(tournament.numberMatches()).equal(4);
    });

    it('Should return 16 as there are 9 player on the tournament.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd'),
        new Player(4, 'e'),
        new Player(5, 'f'),
        new Player(6, 'g'),
        new Player(7, 'h'),
        new Player(8, 'i')
      ];
      let tournament = new Tournament(players);

      expect(tournament.numberMatches()).equal(16);
    });

    it('Should return 32 as there are 31 player on the tournament.', function() {
      let players = [];
      for (let i = 0; i < 31; i++) {
        players.push(new Player(i, 'PogChamp'));
      }
      let tournament = new Tournament(players);

      expect(tournament.numberMatches()).equal(32);
    });

    it('Should return 128 as there are 115 player on the tournament.', function() {
      let players = [];
      for (let i = 0; i < 115; i++) {
        players.push(new Player(i, 'PogChamp'));
      }
      let tournament = new Tournament(players);

      expect(tournament.numberMatches()).equal(128);
    });

    it('Should return 1024 as there are 1000 player on the tournament.', function() {
      let players = [];
      for (let i = 0; i < 1000; i++) {
        players.push(new Player(i, 'PogChamp'));
      }
      let tournament = new Tournament(players);

      expect(tournament.numberMatches()).equal(1024);
    });
  });

  describe('generateBrackets', function() {
    it('As there are no players on the tournament, should throw error.', function() {
      let players: Player[] = [];
      let tournament = new Tournament(players);

      expect(function(){tournament.generateBrackets()}).to.throw(Error, "Players array can't be empty.");
    });

    it('As there is 1 players on the tournament, should return the right bracket.', function() {
      let players = [
        new Player(0, 'a')
      ];
      let tournament = new Tournament(players);

      expect(function(){tournament.generateBrackets()}).to.throw(Error, "Must have more then 1 player.");
    });

    it('As there are 2 players on the tournament, should return the right bracket.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b')
      ];
      let tournament = new Tournament(players);
      let brackets = tournament.generateBrackets();

      expect(brackets[0].id).equal(0);
      expect(brackets[0].idChildren[0]).equal(1);
      expect(brackets[0].playerLeft).equal(undefined);
      expect(brackets[0].playerRight).equal(undefined);

      expect(brackets[1].id).equal(1);
      expect(brackets[1].idChildren[0]).equal(undefined);
      expect(brackets[1].playerLeft.id).equal(0);
      expect(brackets[1].playerLeft.name).equal('a');
      expect(brackets[1].playerRight.id).equal(1);
      expect(brackets[1].playerRight.name).equal('b');
    });

    it('As there are 4 players on the tournament, should return the right bracket.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd')
      ];
      let tournament = new Tournament(players);
      let brackets = tournament.generateBrackets();

      expect(brackets[0].id).equal(0);
      expect(brackets[0].idChildren[0]).equal(1);
      expect(brackets[0].playerLeft).equal(undefined);
      expect(brackets[0].playerRight).equal(undefined);

      expect(brackets[1].id).equal(1);
      expect(brackets[1].idChildren[0]).equal(2);
      expect(brackets[1].idChildren[1]).equal(3);
      expect(brackets[0].playerLeft).equal(undefined);
      expect(brackets[0].playerRight).equal(undefined);

      expect(brackets[2].id).equal(2);
      expect(brackets[2].idChildren[0]).equal(undefined);
      expect(brackets[2].playerLeft.id).equal(0);
      expect(brackets[2].playerLeft.name).equal('a');
      expect(brackets[2].playerRight.id).equal(1);
      expect(brackets[2].playerRight.name).equal('b');

      expect(brackets[3].id).equal(3);
      expect(brackets[3].idChildren[0]).equal(undefined);
      expect(brackets[3].playerLeft.id).equal(2);
      expect(brackets[3].playerLeft.name).equal('c');
      expect(brackets[3].playerRight.id).equal(3);
      expect(brackets[3].playerRight.name).equal('d');
    });
  })

  describe('setWinnerMatch', function() {
    it('If id of match doesnt exist, must throw.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd')
      ];
      let tournament = new Tournament(players);
      tournament.generateBrackets();

      expect(function(){tournament.setWinnerMatch(5, 0);}).to.Throw("Match not found.");
    })

    it('If id of player doesnt exist inside the match, must throw.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd')
      ];
      let tournament = new Tournament(players);
      tournament.generateBrackets();

      expect(function(){tournament.setWinnerMatch(2, 2);}).to.Throw("Winner's ID not found.");
    })

    it('If player doesnt exist inside the match, must throw.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd')
      ];
      let tournament = new Tournament(players);
      tournament.generateBrackets();

      expect(function(){tournament.setWinnerMatch(1, 3);}).to.Throw("Winner's ID not found.");
    })

    it('Should pass the winner to the next match and respect the left position.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd')
      ];
      let tournament = new Tournament(players);
      let brackets = tournament.generateBrackets();
      tournament.setWinnerMatch(2, 1);

      expect(brackets[0].id).equal(0);
      expect(brackets[0].idChildren[0]).equal(1);
      expect(brackets[0].playerLeft).equal(undefined);
      expect(brackets[0].playerRight).equal(undefined);

      expect(brackets[1].id).equal(1);
      expect(brackets[1].idChildren[0]).equal(2);
      expect(brackets[1].idChildren[1]).equal(3);
      expect(brackets[1].playerLeft.id).equal(1);
      expect(brackets[1].playerLeft.name).equal('b');
      expect(brackets[0].playerRight).equal(undefined);

      expect(brackets[2].id).equal(2);
      expect(brackets[2].idChildren[0]).equal(undefined);
      expect(brackets[2].playerLeft.id).equal(0);
      expect(brackets[2].playerLeft.name).equal('a');
      expect(brackets[2].playerRight.id).equal(1);
      expect(brackets[2].playerRight.name).equal('b');

      expect(brackets[3].id).equal(3);
      expect(brackets[3].idChildren[0]).equal(undefined);
      expect(brackets[3].playerLeft.id).equal(2);
      expect(brackets[3].playerLeft.name).equal('c');
      expect(brackets[3].playerRight.id).equal(3);
      expect(brackets[3].playerRight.name).equal('d');
    })

    it('Should pass the winner to the next match and respect the right position.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd')
      ];
      let tournament = new Tournament(players);
      let brackets = tournament.generateBrackets();
      tournament.setWinnerMatch(3, 2);

      expect(brackets[0].id).equal(0);
      expect(brackets[0].idChildren[0]).equal(1);
      expect(brackets[0].playerLeft).equal(undefined);
      expect(brackets[0].playerRight).equal(undefined);

      expect(brackets[1].id).equal(1);
      expect(brackets[1].idChildren[0]).equal(2);
      expect(brackets[1].idChildren[1]).equal(3);
      expect(brackets[0].playerLeft).equal(undefined);
      expect(brackets[1].playerRight.id).equal(2);
      expect(brackets[1].playerRight.name).equal('c');

      expect(brackets[2].id).equal(2);
      expect(brackets[2].idChildren[0]).equal(undefined);
      expect(brackets[2].playerLeft.id).equal(0);
      expect(brackets[2].playerLeft.name).equal('a');
      expect(brackets[2].playerRight.id).equal(1);
      expect(brackets[2].playerRight.name).equal('b');

      expect(brackets[3].id).equal(3);
      expect(brackets[3].idChildren[0]).equal(undefined);
      expect(brackets[3].playerLeft.id).equal(2);
      expect(brackets[3].playerLeft.name).equal('c');
      expect(brackets[3].playerRight.id).equal(3);
      expect(brackets[3].playerRight.name).equal('d');
    })
  })

  describe('findMatch', function() {
    it('If match id doesnt exist, return undefined.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd')
      ];
      let tournament = new Tournament(players);
      tournament.generateBrackets();

      expect(tournament.findMatch(4)).equal(undefined);
    })

    it('If match id exist, return match data.', function() {
      let players = [
        new Player(0, 'a'),
        new Player(1, 'b'),
        new Player(2, 'c'),
        new Player(3, 'd')
      ];
      let tournament = new Tournament(players);
      tournament.generateBrackets();
      let match = tournament.findMatch(3);

      if (!!match) {
        expect(match.id).equal(3);
        expect(match.idChildren[0]).equal(undefined);
        expect(match.playerLeft.id).equal(2);
        expect(match.playerLeft.name).equal('c');
        expect(match.playerRight.id).equal(3);
        expect(match.playerRight.name).equal('d');
      } else {
        expect(true).equal(false);
      }
    })
  })
})