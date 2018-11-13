export class Player {
  public id: number;
  public name: string;

  constructor(name: string, id: number) {
    this.id = id;
    this.name = name;
  }
}

class Node {
  public id: number;
  public idChilden: any;
  public playerLeft: any;
  public playerRight: any;

  constructor(id: number, idChilden?: Array<number>, playerLeft?: Player, playerRight?: Player) {
    this.id = id;
    this.idChilden = idChilden;
    this.playerLeft = playerLeft;
    this.playerRight = playerRight;
  }

  public addParent(ids: Array<number>) {
    this.idChilden = ids;
  }

  public addPlayerLeft(player: Player) {
    this.playerLeft = player;
  }

  public addPlayerRight(player: Player) {
    this.playerRight = player;
  }
}

class NodeWinner extends Node {
  public playerWinner: any;

  constructor(id: number, idChilden?: Array<number>, winner?: Player) {
    super(id, idChilden);
    this.playerWinner = winner;
  }
}

export class Tournament {
  public name: any;
  public players: Array<Player>;

  constructor(players: Array<Player>, name?: string) {
    this.name = name || 'Bracketzada Tournament';
    this.players = players;
  }

  private _numberNodes(numberPlayers: number) : number {
    return Math.pow(2, Math.ceil(Math.log2(numberPlayers)));
  }

  private _generateGraph(numNodes: number) {
    let graph = [];

    //Winner Node
    graph.push(new NodeWinner(0, [1]));

    let actualParent = 1;
    for (let i = 1; i < numNodes; i++) {
      graph.push(
        new Node(i, [actualParent, actualParent+1])
      )
    }

    //this._setPlayers(graph, this.players);

  }

  private _setPlayers(graph: Array<Node>, players: Array<Player>) {

  }

  public generateBrackets() {
    let numNodes = this._numberNodes(this.players.length);
    let graph = this._generateGraph(numNodes);

  }
}