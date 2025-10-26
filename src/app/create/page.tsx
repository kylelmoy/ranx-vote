"use client";

import {
  Heading,
  Text,
  Column,
  TypeFx,
  Button,
  ShineFx,
  Row,
  Background,
  Icon,
  Card,
  Input,
  opacity,
  SpacingToken,
  Line,
  Textarea,
} from "@once-ui-system/core";

export default function Home() {
  return (
    <Column fillWidth padding="l">
      <Column horizontal="center" gap="l" align="center">
        <Heading variant="display-strong-xl" marginTop="24">
          Create
        </Heading>
        <Row maxWidth={24}>
          <Column
            overflow="hidden"
            fillWidth
            padding="m"
            radius="l"
            horizontal="center"
            align="center"
            background="surface"
            border="neutral-alpha-weak"
            style={{ textAlign: "left" }}
          >
            <Background
              top="0"
              position="absolute"
              mask={{
                cursor: true,
                x: 50,
                y: 0,
                radius: 100,
              }}
              gradient={{
                display: true,
                opacity: 90,
                x: 50,
                y: 0,
                width: 50,
                height: 50,
                tilt: 0,
                colorStart: "accent-background-strong",
                colorEnd: "static-transparent",
              }}
              dots={{
                display: true,
                opacity: 20,
                size: "2",
                color: "brand-on-background-weak",
              }}
            />
            <Column fillWidth horizontal="start">
              <Heading marginBottom="s" variant="display-strong-xs">
                Ballot
              </Heading>
              <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
                Tell us about your ballot
              </Text>
            </Column>
            <Column fillWidth horizontal="start" gap="8">
              <Row fillWidth>
                <Input
                  id="ballot-name"
                  name="ballotName"
                  label="Name your ballot"
                  required
                />

              </Row>

              <Row fillWidth>
                <Textarea
                  id="ballot-description"
                  label="Describe what you're voting on"
                  lines={3}
                />
              </Row>
            </Column>
          </Column>
        </Row>
        <Row maxWidth={24}>

          <Column
            overflow="hidden"
            fillWidth
            padding="m"
            radius="l"
            horizontal="center"
            align="center"
            background="surface"
            border="neutral-alpha-weak"
            style={{ textAlign: "left" }}
          >
            <Background
              top="0"
              position="absolute"
              mask={{
                cursor: true,
                x: 50,
                y: 0,
                radius: 100,
              }}
              gradient={{
                display: true,
                opacity: 90,
                x: 50,
                y: 0,
                width: 50,
                height: 50,
                tilt: 0,
                colorStart: "accent-background-strong",
                colorEnd: "static-transparent",
              }}
              dots={{
                display: true,
                opacity: 20,
                size: "2",
                color: "brand-on-background-weak",
              }}
            />
            <Column fillWidth horizontal="start">
              <Heading marginBottom="s" variant="display-strong-xs">
                Options
              </Heading>
              <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
                What are you voting on?
              </Text>
            </Column>
            <Column fillWidth horizontal="start" gap="8">
              <Row fillWidth>
                <Input
                  id="option-name"
                  name="Option Name"
                  label="Option Name"
                  required
                />
              </Row>
            </Column>
          </Column>
        </Row>
      </Column>
    </Column>
  );
}
