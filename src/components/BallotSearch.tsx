"use client";

import { getBallot } from "@/lib/dbAccess";
import {
  Heading,
  Text,
  Column,
  TypeFx,
  Button,
  ShineFx,
  RevealFx,
  Input,
  Icon,
  Row,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { type ChangeEventHandler, useCallback, useMemo, useState } from "react";

export const BallotSearch = () => {
  const router = useRouter();
  const [ballotCode, setBallotCode] = useState("");
  const [invalidCodes, setInvalidCodes] = useState<{ [key: string]: boolean }>({});
  const [isInvalid, setIsInvalid] = useState(false);
  const onCodeChanged: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const code = e.currentTarget.value;
      setBallotCode(code);

      if (code.length === 4) {
        let isValid = false;
        if (invalidCodes[code]) {
          // Do error thing
          isValid = false;
        } else {
          // Check if exists on db
          console.log("Checking if exists");
          getBallot(code).then((ballot) => {
            if (!ballot) {
              setInvalidCodes((prev) => {
                const copy = { ...prev };
                copy[code] = true;
                return copy;
              });
              setIsInvalid(true);
              return;
            }

            // Send them to the vote page
            router.push(`/vote/${code}`);
          });
        }
        setIsInvalid(!isValid);
      } else {
        setIsInvalid(false);
      }
    },
    [invalidCodes, router],
  );

  return (
    <Row fillWidth maxWidth={24}>
      <Input
        id="ballot-code"
        label="Find a ballot by code"
        maxLength={4}
        hasPrefix={<Icon marginLeft="4" onBackground="neutral-weak" name="search" size="xs" />}
        value={ballotCode}
        onChange={onCodeChanged}
        error={isInvalid}
        errorMessage={isInvalid ? `Hmm, ballot ${ballotCode} doesn't exist. Try again?` : undefined}
      />
    </Row>
  );
};
