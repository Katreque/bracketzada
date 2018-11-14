import {expect} from 'chai';
import {Tournament, Player} from './bracketzada.js';
describe('Teste do teste', function() {
  describe('_generateGraph', function() {
    it('Deve retornar um array com os nós conectados corretamente.', function() {
      let players = [
        new Player('a', 0),
        new Player('b', 1),
        new Player('c', 2),
        new Player('d', 3),
        new Player('e', 4),
        new Player('f', 5),
        new Player('g', 6),
        new Player('h', 7)
      ]

      let champ = new Tournament(players);
      champ.generateBrackets();
      //champ.setWinnerMatch(4, 6);
      //expect(graph[0].idParent).equals("Kappa");
    });
  });
});