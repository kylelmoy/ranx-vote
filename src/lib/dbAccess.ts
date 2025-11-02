'use server';
import { generateCode } from "@/utils";
import dbClient from "./dbClient";
import type { Ballot, Vote } from "@/lib/dbTypes";
import { redirect } from 'next/navigation'

const MONGODB_DB = process.env.MONGODB_DB || "";

export async function createBallot(ballot: Ballot) {
	const client = await dbClient;
	const db = client?.db(MONGODB_DB);
	let code: string;

	while (true) {
		code = generateCode(4);
		const codeInvalid = await db?.collection("ballots").findOne({ ballotId: code });
		if (!codeInvalid) {
			break;
		}
	}

	const result = await db?.collection("ballots").insertOne({
		ballotId: code,
		name: ballot.name,
		description: ballot.description,
		options: ballot.options,
		timestamp: Date.now()
	});

	redirect(`/vote/${code}`);
	return result?.acknowledged;
}

export async function saveVote(ballotId: string, name: string, choices: string[]) {
	const client = await dbClient;
	const db = client?.db(MONGODB_DB);

	const result = await db?.collection("vote").insertOne({
		ballotId: ballotId,
		name: name,
		choices: choices,
		timestamp: Date.now()
	});
	return result?.acknowledged;
}

export async function getVotes(ballotId: string) {
	const client = await dbClient;
	const db = client?.db(MONGODB_DB);

	const result = await db?.collection("vote").find({
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
