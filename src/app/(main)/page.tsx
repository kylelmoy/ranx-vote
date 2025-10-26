"use client";

import {
  Heading,
  Text,
  Column,
  TypeFx,
} from "@once-ui-system/core";

export default function Home() {
  return (
    <Column fillWidth center padding="l">
      <Column maxWidth="s" horizontal="center" gap="l" align="center">
        <Heading variant="display-strong-xl" marginTop="24">
            ran
        <TypeFx
          words={["ked choice vote","x-vote"]}
          speed={80}
          delay={500}
          hold={5000}
          trigger="instant"
        />
        </Heading>
        <Text
          variant="heading-default-xl"
          onBackground="neutral-weak"
          wrap="balance"
          marginBottom="16"
        >
          a simple voting system that uses voters' rankings of candidates to choose a single winner
        </Text>
      </Column>
    </Column>
  );
}
