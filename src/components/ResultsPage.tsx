"use client";
import { ResponseForm } from "@/components/ResponseForm";
import { getBallot, getResponses } from "@/lib/dbAccess";
import type { Ballot, BallotOption, ResponseQueryResult } from "@/lib/dbTypes";
import { instantRunoff, InstantRunoffResult } from "@/utils/ranked-choice-vote";
import {
  Heading,
  Text,
  Column,
  Row,
  Background,
  Input,
  Textarea,
  RevealFx,
  IconButton,
  DropdownWrapper,
  Option,
  Button,
  ShineFx,
  Icon,
  Skeleton,
  Line,
  HoloFx,
  Particle,
  Media,
} from "@once-ui-system/core";
import { useCallback, useEffect, useRef, useState } from "react";

interface BallotProps {
  ballotId?: string;
};

export default function ResultsPage({ ballotId }: BallotProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ResponseQueryResult | null>(null);
  const [results, setResults] = useState<InstantRunoffResult | null>(null);

  useEffect(() => {
    if (!ballotId) {
      return;
    }
    getResponses(ballotId).then((data) => {
      setData(data);
      setLoading(false);
      console.log(data);
      document.title = `ranx-vote | results | ${data.ballot?.name || ''}`;

      const results = instantRunoff(data.responses.map(r => r.choices));
      setResults(results);
    });
  }, [ballotId]);

  if (loading) {
    return (
      <Column>
        <Skeleton shape="line" width="l" delay="1" />
        <Skeleton shape="line" width="m" delay="2" />
        <Skeleton shape="line" width="s" delay="3" />
      </Column>
    );
  }

  if (!data?.ballot) {
    return (
      <Column>
        <Text variant="body-strong-m">
          Ballot {ballotId} not found.
        </Text>
      </Column>
    );
  }

  const ballot = data.ballot as Ballot;
  const winner = ballot.options.find(o => o.optionId === results?.winner);
  if (!data?.responses || data.responses.length === 0) {
    return (
      <Column>
        <Text variant="body-strong-m">
          No responses yet!
        </Text>
      </Column>
    );
  }

  return (
    <Column gap="l" fillWidth>
      <Column
        overflow="hidden"
        fillWidth
        padding="m"
        radius="l"
        align="center"
        background="surface"
        border="neutral-alpha-medium"
        style={{ textAlign: "left" }}
      >
        <Particle opacity={70} position="absolute" top="0" left="0" fill interactive speed={4} size="2" density={50} pointerEvents="none" />
        <HoloFx
          fill
          top="0"
          left="0"
          position="absolute"
          texture={{
            opacity: 0,
          }}>
          <Background
            position="absolute"
            top="0"
            left="0"
            gradient={{
              display: true,
              x: 0,
              y: 125,
              colorStart: "accent-solid-strong",
              colorEnd: "static-transparent",
            }}
          />
          <Background
            gradient={{
              display: true,
              x: 125,
              y: 100,
              width: 150,
              height: 150,
              colorStart: "brand-background-strong",
              colorEnd: "static-transparent",
            }}
          />
        </HoloFx>
        <Column>
          <Heading variant="heading-strong-m">
            {ballot.name}
          </Heading>
          <Text variant="body-default-m">
            {ballot.description}
          </Text>
          <Row center fillWidth>
          </Row>
          <Row center fillWidth>

            {winner?.image &&
              <Media
                border="neutral-alpha-weak"
                sizes="400px"
                fillWidth
                aspectRatio="4 / 3"
                radius="l"
                src={winner.image}
                marginTop="m"
                marginBottom="m"
              />
            }
          </Row>
          <Row center fillWidth>
            <Text variant="heading-strong-l">
              {winner?.name || 'No winner yet'}
            </Text>
          </Row>

          <Row center fillWidth>
            <Text variant="label-default-m">
              Winner (so far)
            </Text>
          </Row>
        </Column>
      </Column>

      <Column gap="m" fillWidth>
        <Heading variant="heading-strong-m">
          Results Breakdown
        </Heading>
        {results?.rounds.map((round, index) => (
          <Column key={index}>
            <Heading variant="heading-strong-s" marginBottom="m">
              Round {index + 1}
            </Heading>
            <Column gap="s" fillWidth>
              {Array.from(round.counts.entries()).map(([candidateId, count]) => {
                const candidateOption = ballot.options.find(o => o.optionId === candidateId);
                const isEliminated = round.eliminated.includes(candidateId);
                return (
                  <Row key={candidateId} align="center" gap="m" fillWidth>
                    <Text variant={isEliminated ? "label-default-s" : "body-default-m"} style={{ textDecoration: isEliminated ? 'line-through' : 'none' }}>
                      {candidateOption?.name || candidateId}
                    </Text>
                    <Text variant="body-strong-m">
                      {count} vote{count !== 1 ? 's' : ''}
                    </Text>
                  </Row>
                );
              })}
            </Column>
          </Column>
        ))}
      </Column>
    </Column>
  );
}
