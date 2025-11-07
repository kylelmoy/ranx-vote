"use server";
import { generateCode } from "@/utils";
import dbClient from "./dbClient";
import type { Ballot, VoteResponse, ResponseQueryResult } from "@/lib/dbTypes";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";

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

  for (const option of ballot.options) {
    option.optionId = randomUUID();
  }

  const result = await db?.collection("ballots").insertOne({
    ballotId: ballotId,
    name: ballot.name,
    description: ballot.description,
    options: ballot.options,
    timestamp: Date.now(),
  });

  redirect(`/share/${ballotId}`);
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
    timestamp: result.timestamp,
  };

  return ballot;
}

export async function saveResponse(ballotId: string, name: string, choices: string[]) {
  const client = await dbClient;
  const db = client?.db(MONGODB_DB);

  const result = await db?.collection("responses").insertOne({
    ballotId: ballotId,
    responseId: randomUUID(),
    name: name,
    choices: choices,
    timestamp: Date.now(),
  });

  redirect(`/result/${ballotId}`);
  return result?.acknowledged;
}

export async function getResponses(ballotId: string): Promise<ResponseQueryResult> {
  const client = await dbClient;
  const db = client?.db(MONGODB_DB);
  const response: ResponseQueryResult = {
    ballot: null,
    responses: [] as VoteResponse[],
  };

  response.ballot = await getBallot(ballotId);
  if (!response.ballot) {
    return response;
  }

  const result = await db
    ?.collection("responses")
    .find({
      ballotId: ballotId,
    })
    .toArray();

  response.responses =
    result?.map((document) => {
      return {
        responseId: document.responseId,
        name: document.name,
        choices: document.choices,
        timestamp: document.timestamp,
      };
    }) ?? [];

  return response;
}
