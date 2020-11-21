export class Record {
    record: string;
    map: string;
    gobble: string;
    numPlayers: string;
    rank: number;
    achieved: number;
    type: string;

    constructor(record: string, map: string, gobble: string, numPlayers: string, rank: number, achieved: number, type: string) {
        this.record = record;
        this.map = map;
        this.gobble = gobble;
        this.numPlayers = numPlayers;
        this.rank = rank;
        this.achieved = achieved;
        this.type = type
    }
    
}