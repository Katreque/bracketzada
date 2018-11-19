export class Player {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Node {
  public id: number;
  public idChildren: any;
  public playerLeft: any;
  public playerRight: any;

  constructor(id: number, idChildren?: Array<number>, playerLeft?: Player, playerRight?: Player) {
    this.id = id;
    this.idChildren = idChildren;
    this.playerLeft = playerLeft;
    this.playerRight = playerRight;
  }

  public addParent(ids: Array<number>) {
    this.idChildren = ids;
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

  constructor(id: number, idChildren?: Array<number>, winner?: Player) {
    super(id, idChildren);
    this.playerWinner = winner;
  }
}

export class Tournament {
  public name: any;
  public players: Array<Player>;
  private brackets: Array<Node>;

  constructor(players: Array<Player>, name?: string) {
    this.name = name || 'Bracketzada Tournament';
    this.players = players;
    this.brackets = [];
  }

  private _generateGraph(numNodes: number) : Array<Node> {
    //Winner Node
    this.brackets.push(new Node(0, [1]));

    for (let i = 1; i < numNodes; i++) {
      if (i*2 < numNodes) {
        this.brackets.push(
          new Node(i, [i*2, i*2+1])
        )
      } else {
        this.brackets.push(
          new Node(i, [])
        )
      }
    }

    return this.brackets = this._setPlayers(this.brackets, this.players);
  }

  private _setPlayers(graph: Array<Node>, players: Array<Player>) : Array<Node> {
    let _players = Array.from(players);

    if (players.length === 1) {
      throw new Error("Must have more then 1 player.");
    }

    for (let i = graph.length - 1; i >= (graph.length - (graph.length/2)); i--) {
      graph[i].addPlayerRight(_players.pop());
      graph[i].addPlayerLeft(_players.pop());
    }

    return graph;
  }

  public numberMatches() : number {
    return Math.pow(2, Math.ceil(Math.log2(this.players.length)));
  }

  public generateBrackets(): Array<Node> {
    if (!this.players || !this.players.length) {
      throw new Error("Players array can't be empty.");
    }

    return this._generateGraph(this.numberMatches());
  }

  public setWinnerMatch(idMatch: number, idWinner: number) {
    if (!this.brackets[idMatch]) {
      throw new Error("Match not found.");
    }

    let winner;

    if (!!this.brackets[idMatch].playerLeft && this.brackets[idMatch].playerLeft.id === idWinner) {
      winner = this.brackets[idMatch].playerLeft;

    } else if (!!this.brackets[idMatch].playerRight && this.brackets[idMatch].playerRight.id === idWinner) {
      winner = this.brackets[idMatch].playerRight;

    } else {
      throw new Error("Winner's ID not found.");
    }

    if (Math.floor(idMatch/2) === 0) {
      this.brackets[0] = new NodeWinner(0, winner);
    } else {
      if (this.brackets[idMatch].id % 2 === 0) {
        this.brackets[Math.floor(idMatch/2)].playerLeft = winner;
      } else {
        this.brackets[Math.floor(idMatch/2)].playerRight = winner;
      }
    }
  }

  public findMatch(idMatch: number) : Node | undefined {
    return this.brackets.find((el) => {
      return (el.id === idMatch) ? true : false;
    })
  }
}