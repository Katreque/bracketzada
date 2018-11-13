import {expect} from 'chai';
import {Tournament, Player} from './bracketzada.js';
describe('Teste do teste', function() {
  describe('_generateGraph', function() {
    it('Deve retornar um array com os nós conectados corretamente.', function() {
      let players = [
        new Player('a', 0),
        new Player('a', 1),
        new Player('a', 2),
        new Player('a', 3),
        new Player('a', 4),
        new Player('a', 5),
        new Player('a', 6),
        new Player('a', 7),
        new Player('a', 0),
        new Player('a', 1),
        new Player('a', 2),
        new Player('a', 3),
        new Player('a', 4),
        new Player('a', 5),
        new Player('a', 6),
        new Player('a', 7),
      ]

      let champ = new Tournament(players);
      let graph = champ.generateBrackets();
      //expect(graph[0].idParent).equals("Kappa");
    });
  });
});