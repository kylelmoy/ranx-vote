import { Row, IconButton, Text, Badge } from "@once-ui-system/core";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">Kyle Moy</Text>
        </Text>
        <Row gap="16">
          <IconButton
            key="GitHub"
            href="https://github.com/kylelmoy/ranx-vote"
            icon="github"
            tooltip="kylelmoy/ranx-vote on GitHub"
            size="s"
            variant="ghost"
          />
          <IconButton
            key="LinkedIn"
            href="https://www.linkedin.com/in/kylelmoy/"
            icon="linkedin"
            tooltip="Kyle Moy on LinkedIn"
            size="s"
            variant="ghost"
          />
          <IconButton
            key="Bio"
            href="https://www.kylelmoy.com"
            icon="person"
            tooltip="Kyle Moy's Bio"
            size="s"
            variant="ghost"
          />
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
