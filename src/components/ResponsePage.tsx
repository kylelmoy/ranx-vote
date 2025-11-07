"use client";
import { meta } from "@/resources/once-ui.config";

import { ResponseForm } from "@/components/ResponseForm";
import { getBallot } from "@/lib/dbAccess";
import type { Ballot, BallotOption } from "@/lib/dbTypes";
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
import { useCallback, useEffect, useRef, useState } from "react";

interface BallotProps {
  ballotId?: string;
};

export default function ResponsePage({ ballotId }: BallotProps) {
  const [ballot, setBallot] = useState<Ballot | null>(null);
  useEffect(() => {
    if (!ballotId) {
      return;
    }
    getBallot(ballotId).then((ballot) => {
      setBallot(ballot);
      document.title = `${meta.home.title} - `;
    });
  }, [ballotId]);

  if (!ballot) {
    return (
      <Column>
        <Skeleton shape="line" width="l" delay="1" />
        <Skeleton shape="line" width="m" delay="2" />
        <Skeleton shape="line" width="s" delay="3" />
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
      border="neutral-alpha-weak"
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
      <Column marginBottom="s" padding="m">
        <Heading variant="heading-strong-m">
          {ballot?.name}
        </Heading>
        <Text>
          {ballot.description}
        </Text>
        <Line />
        <Text variant="label-default-s" color="neutral-alpha-weak" marginTop="s">
          Drag to rank the options. <br />
          The top option is your most preferred choice.
        </Text>
      </Column>
      <ResponseForm ballotId={ballot.ballotId || ""} initialOptions={ballot.options} />
    </Column>
  );
}
