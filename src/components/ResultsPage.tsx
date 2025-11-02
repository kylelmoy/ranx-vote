"use client";
import { ResponseForm } from "@/components/ResponseForm";
import { getBallot } from "@/lib/dbAccess";
import type { Ballot, BallotOption, VoteResponse } from "@/lib/dbTypes";
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
} from "@once-ui-system/core";
import { get } from "http";
import { useCallback, useEffect, useRef, useState } from "react";

interface BallotProps {
  ballotId?: string;
};

export default function ResultsPage({ ballotId }: BallotProps) {

  const [loading, setLoading] = useState(true);
  const [ballot, setBallot] = useState<Ballot | null>(null);
  const [responses, setResponses] = useState<VoteResponse[] | null>(null);

  useEffect(() => {
    if (!ballotId) {
      return;
    }
    getBallot(ballotId).then((ballot) => {
      setBallot(ballot);
      setLoading(false);
      console.log(ballot);
    });

    getResponses(ballotId).then((responses) => {
      setResponses(responses);
      setLoading(false);
      console.log(responses);
    }
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

  if (!ballot) {
    return (
      <Column>
        <Text variant="body-strong-m">
          Ballot {ballotId} not found.
        </Text>
      </Column>
    );
  }

  return (
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
      <Column marginBottom="l" padding="m">
        <Heading variant="heading-strong-m">
          {ballot?.name}
        </Heading>
        <Text>
          {ballot.description}
        </Text>
      </Column>
    </Column>
  );
}
