'use server';
import { generateCode } from "@/utils";
import dbClient from "./dbClient";
import type { Ballot, Vote } from "@/lib/dbTypes";
import { redirect } from 'next/navigation';

const MONGODB_DB = process.env.MONGODB_DB || "";

export async function createBallot(ballot: Ballot) {
	const client = await dbClient;
	const db = client?.db(MONGODB_DB);
	let ballotId: string;

	while (true) {
		ballotId = generateCode(4);
		const codeInvalid = await db?.collection("ballots").findOne({ ballotId: ballotId });
		if (!codeInvalid) {
			break;
		}
	}

	const result = await db?.collection("ballots").insertOne({
		ballotId: ballotId,
		name: ballot.name,
		description: ballot.description,
		options: ballot.options,
		timestamp: Date.now()
	});

	redirect(`/vote/${ballotId}`);
	return result?.acknowledged;
}

export async function getBallot(ballotId: string): Promise<Ballot | null> {
	const client = await dbClient;
	const db = client?.db(MONGODB_DB);

	const result = await db?.collection("ballots").findOne({
		ballotId: ballotId,
	});

	if (!result) {
		return null;
	}

	const ballot = {
		ballotId: result.ballotId,
		name: result.name,
		description: result.description,
		options: result.options,
		timestamp: result.timestamp
	}

	for (let i = 0; i < ballot.options.length; i++) {
		ballot.options[i].optionId = i;
	}
	return ballot;
}


export async function saveVote(ballotId: string, name: string, choices: number[]) {
	const client = await dbClient;
	const db = client?.db(MONGODB_DB);

	const result = await db?.collection("votes").insertOne({
		ballotId: ballotId,
		name: name,
		choices: choices,
		timestamp: Date.now()
	});

	redirect(`/results/${ballotId}`);
	return result?.acknowledged;
}

export async function getVotes(ballotId: string) {
	const client = await dbClient;
	const db = client?.db(MONGODB_DB);

	const result = await db?.collection("votes").find({
		ballotId: ballotId,
	}).toArray();

	const votes: Vote[] | undefined = result?.map((document) => {
		return {
			_id: document._id.toString(),
			ballotId: document.ballotId,
			name: document.name,
			choices: document.choices,
			timestamp: document.timestamp
		};
	})
	return votes;
}
