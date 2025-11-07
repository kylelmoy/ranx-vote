"use client";
import { saveResponse } from "@/lib/dbAccess";
import type { BallotOption } from "@/lib/dbTypes";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Button,
  Card,
  Column,
  Input,
  Media,
  Row,
  Text,
  Option,
  Flex,
  ShineFx,
  IconButton,
} from "@once-ui-system/core";

interface BallotListProps {
  ballotId: string;
  initialOptions: BallotOption[];
}
export const ResponseForm: React.FC<BallotListProps> = ({ initialOptions, ballotId }) => {
  const [ballotOptions, setBallotOptions] = useState(initialOptions);
  const [name, setName] = useState("");

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copy = [...ballotOptions];
    const [reordered] = copy.splice(startIndex, 1);
    copy.splice(endIndex, 0, reordered);
    setBallotOptions(copy);
  };

  const handleSubmit = async () => {
    const vote: string[] = [];
    if (!ballotOptions) {
      return;
    }

    for (const option of ballotOptions) {
      if (option.optionId != null) {
        vote.push(option.optionId);
      }
    }

    saveResponse(ballotId, name || "Anonymous", vote);
  };
  return (
    <Column style={{ maxWidth: "400px" }} gap="16" horizontal="center" align="center">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ballot">
          {(droppableProvider) => (
            <div ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>
              <Column>
                {ballotOptions.map((ballotOption, index) => (
                  <Row key={ballotOption.name} fillWidth>
                    <Draggable
                      index={index}
                      key={ballotOption.name}
                      draggableId={`${ballotOption.name}`}
                    >
                      {(draggableProvider, snapshot) => (
                        <div
                          ref={draggableProvider.innerRef}
                          {...draggableProvider.draggableProps}
                          {...draggableProvider.dragHandleProps}
                        >
                          <BallotListItem option={ballotOption} isDragging={snapshot.isDragging} />
                        </div>
                      )}
                    </Draggable>
                  </Row>
                ))}
                {droppableProvider.placeholder}
              </Column>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <Input
          id="name"
          label="Your Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          id="about"
          variant="primary"
          size="l"
          weight="default"
          arrowIcon
          fillWidth
          disabled={!name}
          onClick={handleSubmit}
        >
          <Row gap="8" vertical="center" paddingRight="4">
            submit my vote
          </Row>
        </Button>
      </Column>
    </Column>
  );
};

interface BallotListItemProps {
  option: BallotOption;
  isDragging?: boolean;
}
const BallotListItem: React.FC<BallotListItemProps> = ({ option, isDragging }) => {
  return (
    <Flex paddingBottom="s">
      <Card radius="l-4" direction="row" border="neutral-alpha-medium" width={22}>
        {option.image && (
          <Column>
            <Media
              height={6}
              width={6}
              border="neutral-alpha-weak"
              fill
              objectFit="cover"
              aspectRatio="1/1"
              radius="l"
              src={option.image}
            />
          </Column>
        )}
        <Column fillWidth paddingLeft="m" paddingY="s" style={{ justifyContent: "center" }}>
          {isDragging ? <ShineFx>{option.name}</ShineFx> : option.name}
          {/* {option.description &&
						<Text variant="label-default-s">
							{option.description}
						</Text>
					} */}
        </Column>
        {option.url && (
          <IconButton
            icon="chevronRight"
            radius="right"
            style={{ height: "100%", minWidth: "50px" }}
            variant="secondary"
            href={option.url}
          />
        )}
      </Card>
    </Flex>
  );
};
