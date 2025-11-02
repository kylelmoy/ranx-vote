"use client";

import { createBallot } from "@/lib/dbAccess";
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
} from "@once-ui-system/core";
import { useCallback, useRef, useState } from "react";

type BallotForm = {
  name: string,
  description: string;
  error: boolean,
};

type BallotOptionWithProps = BallotOption & {
  dropdownOpen?: boolean,
  hasDecription?: boolean,
  hasImage?: boolean,
  hasUrl?: boolean,
  error: boolean
}

export default function Home() {
  const [ballotForm, setBallotForm] = useState<BallotForm>({ name: "", description: "", error: false });
  const [options, setOptions] = useState<BallotOptionWithProps[]>(Array.from({ length: 3 }, () => { return { name: "", description: "", image: "", url: "", error: false } }));
  const nameRef = useRef<HTMLInputElement>(null);

  const handleFormChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setBallotForm(prev => {
      const newFormValues = {
        ...prev,
        [name]: value
      }
      newFormValues.error = !newFormValues.name;
      return newFormValues;
    });
  }, []);

  const handleOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;
      const [idxStr, keyStr] = name.split(".");
      const index = Number(idxStr);
      const key = keyStr as keyof BallotOption;

      setOptions(prev => {
        const next = [...prev] as BallotOptionWithProps[];
        const option = { ...next[index] };
        option[key] = value;
        option.error = !option.name;
        next[index] = option;
        return next;
      });
    },
    []
  );
  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }

    const ballot: Ballot = {
      ...ballotForm,
      options: options.filter((option) => option.name).map((option) => {
        return {
          name: option.name,
          description: option.description,
          image: option.image,
          url: option.url,
        };
      }),
    };

    console.log(ballot);
    createBallot(ballot);

  }, [ballotForm, options]);

  const validate = () => {
    if (!ballotForm.name) {
      setBallotForm(prev => {
        return {
          ...prev,
          error: true
        }
      });
      nameRef.current?.focus();
      return false;
    };

    let hasError = false;
    for (let i = 0; i < options.length; i++) {
      if (!options[i].name) {
        options[i].error = true;
        hasError = true;
      }
    }
    if (hasError) {
      setOptions([...options]);
    }
    console.log("Validation:" + hasError);
    return !hasError;
  };
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
                    name="name"
                    label="Name"
                    ref={nameRef}
                    value={ballotForm.name}
                    onChange={handleFormChange}
                    errorMessage={ballotForm.error ? (
                      <Row vertical="center" gap="8">
                        <Icon name="danger" size="xs" />
                        Please enter a name for your ballot.
                      </Row>) : undefined}
                  />
                </Row>

                <Row fillWidth>
                  <Textarea
                    id="ballot-description"
                    name="description"
                    value={ballotForm.description}
                    onChange={handleFormChange}
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

                      {options[index].error && (
                        <Row vertical="center" gap="8" style={{ color: "red" }} marginBottom="xs">
                          <Icon name="danger" size="xs" />
                          Please enter a name for this option.
                        </Row>)
                      }
                      <Row fillWidth style={{ alignItems: "center" }}>
                        <Input
                          id={`${index}.name`}
                          name={`${index}.name`}
                          label="Name"
                          value={option.name}
                          onChange={handleOptionChange}
                          radius={(options[index].hasDecription
                            || options[index].hasImage
                            || options[index].hasUrl
                          ) ? "top" : undefined}
                        />
                      </Row>

                      {options[index].hasDecription && (
                        <Row fillWidth>
                          <Input
                            id={`${index}.description`}
                            name={`${index}.description`}
                            label="Description"
                            value={option.description}
                            onChange={handleOptionChange}
                            radius={(options[index].hasImage
                              || options[index].hasUrl
                            ) ? "none" : "bottom"}
                          />
                        </Row>
                      )}
                      {options[index].hasImage && (
                        <Row fillWidth>
                          <Input
                            id={`${index}.image`}
                            name={`${index}.image`}
                            label="Image URL"
                            value={option.image}
                            onChange={handleOptionChange}
                            radius={(options[index].hasUrl
                            ) ? "none" : "bottom"}
                          />
                        </Row>
                      )}
                      {options[index].hasUrl && (
                        <Row fillWidth>
                          <Input
                            id={`${index}.url`}
                            name={`${index}.url`}
                            label="External Link"
                            value={option.url}
                            onChange={handleOptionChange}
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
                    options.push({ name: "", description: "", image: "", url: "", error: false });
                    setOptions([...options]);
                  }} />
                </Row>
              </Column>
            </Column>
          </Row>
          <Row maxWidth={24}>
            <Button id="submit-button" variant="primary" fillWidth arrowIcon onClick={handleSubmit}>
              <ShineFx baseOpacity={0.6}>Create this ballot</ShineFx>
            </Button>
          </Row>
        </Column>
      </RevealFx>
    </Column>
  );
}
