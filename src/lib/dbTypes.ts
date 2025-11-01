export type Ballot = {
    _id?: string;
    name: string;
    description: string;
    timestamp?: number;
    options: BallotOption[];
}

export type BallotOption = {
    _id?: string;
    name?: string,
    description?: string,
    image?: string,
    url?: string,
}

export type Vote = {
    _id: string;
    ballotId: string;
    name: string;
    choices: string[];
    timestamp: number;
}