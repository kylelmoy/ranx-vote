"use client";

import { BallotSearch } from "@/components/BallotSearch";
import {
  Heading,
  Text,
  Column,
  TypeFx,
  Button,
  ShineFx,
  RevealFx,
  Row,
  Line,
} from "@once-ui-system/core";

export default function Home() {
  return (
    <Column fillWidth center padding="l">
      <RevealFx center>
        <Column maxWidth="s" horizontal="center" gap="l" align="center">
          <Heading variant="display-strong-xl" marginTop="24">
            ran
            <TypeFx
              words={["x-vote", "ked choice vote"]}
              speed={80}
              delay={500}
              hold={5000}
              trigger="instant"
            />
          </Heading>
        </Column>
      </RevealFx>

      <RevealFx delay={0.2} center>
        <Column maxWidth="s" horizontal="center" gap="l" align="center">
          <Text
            variant="heading-default-xl"
            onBackground="neutral-weak"
            wrap="balance"
            marginBottom="16"
          >
            a simple voting system that uses voters' rankings of candidates to choose a single
            winner
          </Text>
        </Column>
      </RevealFx>

      <RevealFx delay={0.8} translateY={1} center>
        <Column maxWidth="s" horizontal="center" gap="l" align="center">
          <Button variant="secondary" size="m" href="./create" suffixIcon="chevronRight">
            <ShineFx speed={5}>create a ballot</ShineFx>
          </Button>
        </Column>
      </RevealFx>

      <RevealFx delay={1} translateY={1} center marginTop="m">
        <Column maxWidth="s" horizontal="center" gap="l" align="center" minHeight={8}>
          <BallotSearch />
        </Column>
      </RevealFx>
    </Column>
  );
}
