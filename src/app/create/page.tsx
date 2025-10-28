"use client";

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
} from "@once-ui-system/core";
import { useState } from "react";

type BallotOption = {
  name?: string,
  description?: string,
  image?: string,
  url?: string,

  dropdownOpen?: boolean,
  hasDecription?: boolean,
  hasImage?: boolean,
  hasUrl?: boolean,
}

export default function Home() {
  const [options, setOptions] = useState<BallotOption[]>([{ name: "" }, { name: "" }, { name: "" }]);

  return (
    <Column fillWidth padding="l">
      <RevealFx horizontal="center">
        <Column fillWidth horizontal="center" gap="l" align="center" paddingBottom="l">

          <Row maxWidth={24} horizontal="center">
            <Heading variant="display-strong-xl" marginTop="24">
              create
            </Heading>

            <Button prefixIcon="chevronLeft" variant="secondary" size="s" style={{ position: "absolute", left: 0, bottom: 0 }} href="/">
              home
            </Button></Row>
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
                  y: 100,
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
                    label="Name"
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
          <Row maxWidth={24} >
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
                {options?.map((option, index) => {
                  return (
                    <Column key={index}
                      fillWidth
                      padding="s"
                      radius="l"
                      horizontal="start"
                      align="center"
                      background="surface"
                      border="neutral-alpha-weak"
                      style={{ textAlign: "left" }}
                    >
                      <Row fillWidth marginBottom="s">
                        <Column>
                          <Text wrap="nowrap" variant="label-default-m">
                            {"Option #" + (index + 1)}
                          </Text>
                        </Column>
                        <Column style={{ alignItems: "end" }} fillWidth>
                          <DropdownWrapper
                            isOpen={options[index].dropdownOpen}
                            onOpenChange={(state) => {
                              options[index].dropdownOpen = state;
                              setOptions([...options]);
                            }}
                            placement="right"
                            trigger={
                              <IconButton icon="miniPlus" variant="secondary" size="s" style={{ height: "100%" }}
                                onClick={() => {
                                  options[index].dropdownOpen = !options[index].dropdownOpen;
                                  setOptions([...options]);
                                }}
                              />
                            }
                            dropdown={
                              <Column fillWidth padding="4" gap="2">
                                <Option
                                  label="Description"
                                  value="top"
                                  onClick={() => {
                                    options[index].dropdownOpen = false;
                                    options[index].hasDecription = true;
                                    setOptions([...options]);
                                  }}
                                />
                                <Option
                                  label="Image URL"
                                  value="middle"
                                  onClick={() => {
                                    options[index].dropdownOpen = false;
                                    options[index].hasImage = true;
                                    setOptions([...options]);
                                  }}
                                />
                                <Option
                                  label="Link"
                                  value="bottom"
                                  onClick={() => {
                                    options[index].dropdownOpen = false;
                                    options[index].hasUrl = true;
                                    setOptions([...options]);
                                  }}
                                />
                              </Column>
                            }
                          />
                        </Column>
                      </Row>

                      <Row fillWidth style={{ alignItems: "center" }}>
                        <Input
                          id={`option-name-${index}`}
                          name="Name"
                          label="Name"
                          value={option.name}
                          onChange={(e) => {
                            options[index].name = e.target.value;
                            setOptions([...options]);
                          }}
                          radius={(options[index].hasDecription
                            || options[index].hasImage
                            || options[index].hasUrl
                          ) ? "top" : undefined}
                          required
                        />
                      </Row>

                      {options[index].hasDecription && (
                        <Row fillWidth>
                          <Input
                            id={`option-desc-${index}`}
                            name="Description"
                            label="Description"
                            radius={(options[index].hasImage
                              || options[index].hasUrl
                            ) ? "none" : "bottom"}
                          />
                        </Row>
                      )}
                      {options[index].hasImage && (
                        <Row fillWidth>
                          <Input
                            id={`option-img-${index}`}
                            name="Image"
                            label="Image URL"
                            radius={(options[index].hasUrl
                            ) ? "none" : "bottom"}
                          />
                        </Row>
                      )}
                      {options[index].hasUrl && (
                        <Row fillWidth>
                          <Input
                            id={`option-url-${index}`}
                            name="Link"
                            label="External Link"
                            radius="bottom"
                          />
                        </Row>
                      )}
                    </Column>
                  );
                })}

                <Row fillWidth center gap="l">
                  <IconButton icon="minus" size="l" disabled={options.length < 4} onClick={() => {
                    if (options.length < 4) {
                      return;
                    }
                    const newOptions = options.slice(0, options.length - 1);
                    setOptions([...newOptions]);
                  }} />
                  <IconButton icon="plus" size="l" onClick={() => {
                    options.push({});
                    setOptions([...options]);
                  }} />
                </Row>
              </Column>
            </Column>
          </Row>
          <Row maxWidth={24}>
            <Button id="submit-button" variant="primary" fillWidth arrowIcon>
              <ShineFx baseOpacity={0.6}>Create this ballot</ShineFx>
            </Button>
          </Row>
        </Column>
      </RevealFx>
    </Column>
  );
}
