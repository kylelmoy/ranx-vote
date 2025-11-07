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
  AvatarGroup,
  HoverCard,
  Tag,
  Badge,
} from "@once-ui-system/core";
import { useCallback, useEffect, useRef, useState } from "react";

interface BallotProps {
  ballotId?: string;
}

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
      document.title = `ranx-vote | results | ${data.ballot?.name || ""}`;

      const results = instantRunoff(data.responses);
      setResults(results);
      console.log("Data:", data);
      console.log("Results:", results);
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
        <Text variant="body-strong-m">Ballot {ballotId} not found.</Text>
      </Column>
    );
  }

  const ballot = data.ballot as Ballot;
  const winner = ballot.options.find((o) => o.optionId === results?.winner);
  if (!data?.responses || data.responses.length === 0) {
    return (
      <Column>
        <Text variant="body-strong-m">No responses yet!</Text>
      </Column>
    );
  }

  return (
    <Column gap="l" fillWidth>
      <Column align="left">
        <Heading variant="display-strong-s">{ballot.name}</Heading>
        <Text variant="body-default-m">{ballot.description}</Text>
      </Column>
      {winner && (
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
          <Particle
            opacity={70}
            position="absolute"
            top="0"
            left="0"
            fill
            interactive
            speed={4}
            size="2"
            density={50}
            pointerEvents="none"
          />
          <HoloFx
            fill
            top="0"
            left="0"
            position="absolute"
            texture={{
              opacity: 0,
            }}
          >
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
            <Row center fillWidth>
              {winner?.image && (
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
              )}
            </Row>
            <Row center fillWidth>
              <Text variant="heading-strong-l">{winner.name}</Text>
            </Row>

            <Row center fillWidth>
              <Text variant="label-default-m">Winner (so far)</Text>
            </Row>
          </Column>
        </Column>
      )}
      {!winner && results?.tie && (
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
          <Background
            position="absolute"
            top="0"
            left="0"
            fill
            gradient={{
              display: true,
              x: 50,
              y: 0,
              colorStart: "accent-background-medium",
              colorEnd: "static-transparent",
            }}
            lines={{
              display: true,
              size: "16",
              thickness: 1,
              angle: 90,
              color: "accent-background-strong",
            }}
            dots={{
              display: true,
              size: "4",
              color: "page-background",
            }}
          />
          <Row center fillWidth>
            <Text variant="heading-strong-l">No winner yet.</Text>
          </Row>
          <Column center fillWidth gap="s">
            <Text variant="label-default-m" marginBottom="s">
              It's a tie!
            </Text>
            {results.tie.map((t) => {
              const candidate = ballot.options.find((o) => o.optionId === t);
              return (
                <Badge
                  key={candidate?.optionId}
                  title={candidate?.name}
                  arrow={false}
                  paddingX="12"
                  paddingY="8"
                />
              );
            })}
          </Column>
        </Column>
      )}
      <Column gap="m" fillWidth marginTop="m">
        <Heading variant="heading-strong-l">Eliminations</Heading>
        <Text variant="label-default-s">
          Each round, the candidate(s) with the fewest votes are eliminated until a winner is found.
        </Text>
        {results?.rounds.map((round, index) => (
          <Column
            key={index}
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            padding="m"
          >
            <Heading variant="heading-strong-s" marginBottom="m">
              Round {index + 1}
            </Heading>
            <Column gap="s" fillWidth>
              {Array.from(round.voters.entries()).map(([candidateId, voters]) => {
                const candidateOption = ballot.options.find((o) => o.optionId === candidateId);
                const isEliminated = round.eliminated.includes(candidateId);
                return (
                  <Row
                    key={candidateId}
                    align="center"
                    gap="m"
                    fillWidth
                    style={{ justifyContent: "space-between" }}
                  >
                    <Column align="left">
                      <Text
                        variant="body-default-m"
                        style={{ textDecoration: isEliminated ? "line-through" : "none" }}
                      >
                        {candidateOption?.name || candidateId}
                      </Text>
                    </Column>
                    <HoverCard
                      placement="top"
                      trigger={
                        <AvatarGroup
                          size="m"
                          avatars={voters.map((voterName) => ({
                            value: voterName.charAt(0).toUpperCase(),
                          }))}
                        />
                      }
                    >
                      <Column
                        padding="20"
                        gap="20"
                        radius="l"
                        maxWidth={24}
                        background="page"
                        border="neutral-alpha-weak"
                      >
                        <Row gap="8" wrap>
                          {voters.map((voterName) => (
                            <Tag key={voterName}>{voterName}</Tag>
                          ))}
                        </Row>
                      </Column>
                    </HoverCard>
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
