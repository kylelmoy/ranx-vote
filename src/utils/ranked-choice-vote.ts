"use client";
export interface InstantRunoffResult {
    winner: string | null;
    rounds: Array<{
        counts: Map<string, number>;
        eliminated: string[];
    }>;
}
export function instantRunoff(votes: string[][]): InstantRunoffResult | null {
    let winner: string | null = null;
    const rounds: Array<{
        counts: Map<string, number>;
        eliminated: string[];
    }> = [];
    // add all eligible candidates to a set
    // candidates will be eliminated until a winner is found
    const remainingCandidates = new Set<string>();
    for (const ballot of votes) {
        for (const candidate of ballot) remainingCandidates.add(candidate);
    }

    // if no candidates, no winner
    if (remainingCandidates.size === 0) return null;


    while (true) {
        // initialize accumulators for each remaining candidate
        const counts = new Map<string, number>();
        for (const candidate of remainingCandidates) counts.set(candidate, 0);

        let activeBallots = 0;

        for (const ballot of votes) {

            // find each ballot's highest-ranked candidate that is still remaining
            let highestRankedCandidate: string | null = null;
            for (const pref of ballot) {
                if (remainingCandidates.has(pref)) {
                    highestRankedCandidate = pref; break;
                }
            }
            if (highestRankedCandidate !== null) {
                counts.set(highestRankedCandidate, (counts.get(highestRankedCandidate) ?? 0) + 1);
                activeBallots++;
            }
        }

        if (activeBallots === 0) return null; // all ballots exhausted

        // if any candidate has majority, they win
        for (const [candidate, cnt] of counts) {
            if (cnt > (activeBallots / 2)) {
                winner = candidate;
                break;
            }
        }
        if (winner !== null) {
            rounds.push({ counts, eliminated: Array.from(remainingCandidates).filter(c => c !== winner) });
            break;
        }

        // otherwise, find the candidate(s) with the fewest votes
        let min = votes.length + 1;
        for (const candidate of remainingCandidates) {
            const cnt = counts.get(candidate) ?? 0;
            if (cnt < min) {
                min = cnt;
            }
        }

        // there may be multiple candidates with the lowest score
        const lowest = Array.from(remainingCandidates).filter(c => (counts.get(c) ?? 0) === min);

        // if all remaining candidates are tied for lowest, it's a tie -> no winner
        if (lowest.length === remainingCandidates.size) return null;

        // eliminate lowest-scoring candidate(s) and continue to next round
        for (const c of lowest) {
            remainingCandidates.delete(c);
        }
        rounds.push({ counts, eliminated: lowest });
    }
    return { winner, rounds };
}