"use client";
import { baseURL } from "@/resources/once-ui.config";
import { Column, Icon, Input, Text, Row } from "@once-ui-system/core";
import { useCallback, useState } from "react";

interface ICopyFieldProps {
    ballotId: string;
}
export const CopyField: React.FC<ICopyFieldProps> = ({ ballotId }) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = useCallback((e) => {
        e.target.select();
        const link = `${baseURL}/vote/${ballotId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    }, [ballotId]);
    return (
        <Column gap="m">
            <Input
                id="ballot-share-link"
                value={`${baseURL}/vote/${ballotId}`}
                placeholder="ballot share link"
                hasSuffix={<Icon onBackground="neutral-weak" name="copy" size="s" />}
                readOnly
                onClick={copyToClipboard}
            />
            {copied && (
                <Row center>
                    <Icon onBackground="neutral-weak" name="check" size="m" marginRight="xs" />
                    <Text variant="body-strong-s">
                        Link copied to clipboard!
                    </Text>
                </Row>
            )}
        </Column>
    );
};