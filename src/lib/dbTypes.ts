export type Ballot = {
    _id?: string;
    ballotId?: string;
    name: string;
    description: string;
    timestamp?: number;
    options: BallotOption[];
}

export type BallotOption = {
    _id?: string;
    optionId?: string;
    name?: string,
    description?: string,
    image?: string,
    url?: string,
}

export type VoteResponse = {
    _id?: string;
    ballotId?: string;
    responseId?: string;
    name: string;
    choices: string[];
    timestamp: number;
}

export type ResponseQueryResult = {
    ballot: Ballot | null;
    responses: VoteResponse[];
}