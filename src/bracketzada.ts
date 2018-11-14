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

  public addPlayerLeft(player?: Player) {
    this.playerLeft = player;
  }

  public addPlayerRight(player?: Player) {
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
  public graph: Array<Node>;

  constructor(players: Array<Player>, name?: string) {
    this.name = name || 'Bracketzada Tournament';
    this.players = players;
    this.graph = [];
  }

  private _numberNodes(numberPlayers: number) : number {
    return Math.pow(2, Math.ceil(Math.log2(numberPlayers)));
  }

  private _generateGraph(numNodes: number) : Array<Node> {
    //Winner Node
    this.graph.push(new Node(0, [1]));

    for (let i = 1; i < numNodes; i++) {
      if (i*2 < numNodes) {
        this.graph.push(
          new Node(i, [i*2, i*2+1])
        )
      } else {
        this.graph.push(
          new Node(i, [])
        )
      }
    }

    return this.graph = this._setPlayers(this.graph, this.players);
  }

  private _setPlayers(graph: Array<Node>, players: Array<Player>) : Array<Node> {
    for (let i = graph.length - 1; i >= (graph.length - (graph.length/2)); i--) {
      graph[i].addPlayerLeft(players.pop());
      graph[i].addPlayerRight(players.pop());
    }

    return graph;
  }

  public generateBrackets(): Array<Node> {
    return this._generateGraph(this._numberNodes(this.players.length));
  }

  public setWinnerMatch(idNode: number, idWinner: number) {
    if (!this.graph[idNode]) {
      throw "Node not found.";
    }

    let winner;

    if (this.graph[idNode].playerLeft.id === idWinner) {
      winner = this.graph[idNode].playerLeft;

    } else if (this.graph[idNode].playerRight.id === idWinner) {
      winner = this.graph[idNode].playerRight;

    } else {
      throw "Winner's ID not found.";
    }

    if (Math.floor(idNode/2) === 0) {
      this.graph[0] = new NodeWinner(0, winner);
    } else {
      if (this.graph[idNode].id % 2 === 0) {
        this.graph[Math.floor(idNode/2)].playerLeft = winner;
      } else {
        this.graph[Math.floor(idNode/2)].playerRight = winner;
      }
    }
  }

  public findMatch() {

  }
}