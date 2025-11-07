"use client";

import type { VoteResponse } from "@/lib/dbTypes";

export interface InstantRunoffResult {
    winner: string | null;
    tie: string[] | null;
    rounds: Array<{
        voters: Map<string, string[]>;
        eliminated: string[];
    }>;
}
export function instantRunoff(votes: VoteResponse[]): InstantRunoffResult | null {
    let winner: string | null = null;
    let tie: string[] | null = null;
    const rounds: Array<{
        voters: Map<string, string[]>;
        eliminated: string[];
    }> = [];
    // add all eligible candidates to a set
    // candidates will be eliminated until a winner is found
    const remainingCandidates = new Set<string>();
    for (const vote of votes) {
        for (const candidate of vote.choices) remainingCandidates.add(candidate);
    }

    // if no candidates, no winner
    const candidateCount = remainingCandidates.size;

    if (candidateCount === 0) {
        return null;
    }
    let roundNumber = 0;
    while (true) {
        roundNumber++;
        if (roundNumber > candidateCount) {
            return null;
        }

        // initialize accumulators for each remaining candidate
        const voters = new Map<string, string[]>();
        for (const candidate of remainingCandidates) voters.set(candidate, []);

        let activeBallots = 0;

        for (const ballot of votes) {

            // find each ballot's highest-ranked candidate that is still remaining
            let highestRankedCandidate: string | null = null;
            for (const pref of ballot.choices) {
                if (remainingCandidates.has(pref)) {
                    highestRankedCandidate = pref; break;
                }
            }
            if (highestRankedCandidate !== null) {
                voters.get(highestRankedCandidate)?.push(ballot.name)
                activeBallots++;
            }
        }

        if (activeBallots === 0) {
            break;
        }

        // if any candidate has majority, they win
        for (const [candidate, voted] of voters) {
            if (voted.length > (activeBallots / 2)) {
                winner = candidate;
                break;
            }
        }
        if (winner !== null) {
            rounds.push({ voters, eliminated: Array.from(remainingCandidates).filter(c => c !== winner) });
            break;
        }

        // otherwise, find the candidate(s) with the fewest votes
        let min = votes.length + 1;
        for (const candidate of remainingCandidates) {
            const cnt = voters.get(candidate)?.length ?? 0;
            if (cnt < min) {
                min = cnt;
            }
        }

        // there may be multiple candidates with the lowest score
        const lowest = Array.from(remainingCandidates).filter(c => (voters.get(c)?.length ?? 0) === min);

        // if all remaining candidates are tied for lowest, it's a tie -> no winner
        if (lowest.length === remainingCandidates.size) {
            tie = lowest;
            rounds.push({ voters, eliminated: [] });
            break;
        }

        // eliminate lowest-scoring candidate(s) and continue to next round
        for (const c of lowest) {
            remainingCandidates.delete(c);
        }
        rounds.push({ voters, eliminated: lowest });
    }
    return { winner, tie, rounds };
}