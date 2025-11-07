"use client";

import { getBallot } from "@/lib/dbAccess";
import { Text, Column, Input, Icon, Spinner } from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { type ChangeEventHandler, useCallback, useMemo, useState } from "react";

export const BallotSearch = () => {
  const router = useRouter();
  const [ballotCode, setBallotCode] = useState("");
  const [invalidCodes, setInvalidCodes] = useState<{ [key: string]: boolean }>({});
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
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
          setIsInvalid(false); // reset while checking
          setLoading(true);
          getBallot(code).then((ballot) => {
            if (!ballot) {
              setInvalidCodes((prev) => {
                const copy = { ...prev };
                copy[code] = true;
                return copy;
              });

              setLoading(false);
              setIsInvalid(true);
              return;
            }
            setDone(true);
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
    <Column fillWidth maxWidth={14}>
      <Input
        id="ballot-code"
        label="enter a ballot code"
        size={4}
        maxLength={4}
        hasPrefix={<Icon marginLeft="4" onBackground="neutral-weak" name="search" size="xs" />}
        hasSuffix={
          done ? (
            <Icon onBackground="neutral-weak" name="check" size="m" />
          ) : loading ? (
            <Spinner size="m" />
          ) : undefined
        }
        value={ballotCode}
        onChange={onCodeChanged}
        error={isInvalid}
        errorMessage={
          isInvalid && !loading ? (
            <Column
              fillWidth
              center
            >{`hmm, ballot ${ballotCode} doesn't exist. try again?`}</Column>
          ) : undefined
        }
      />
      {loading && (
        <Text variant="label-default-s" onBackground="neutral-weak" marginTop="s">
          hang tight, looking up ballot...
        </Text>
      )}
    </Column>
  );
};
