import { CopyField } from "@/components/CopyField";
import { Heading, Column, Row, Button, Text, RevealFx } from "@once-ui-system/core";

export default async function Share({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  return (
    <Column fillWidth fillHeight padding="l">
      <Column fillWidth horizontal="center" align="center" paddingBottom="l">
        <Row maxWidth={24} horizontal="center">
          <Heading variant="display-strong-xl" marginTop="24">
            share
          </Heading>
        </Row>

        <Row maxWidth={24} style={{ justifyContent: "space-between" }} paddingY="m">
          <Button prefixIcon="chevronLeft" variant="secondary" size="s" href="/">
            home
          </Button>

          <Button suffixIcon="chevronRight" variant="secondary" size="s" href={`/vote/${slugPath}`}>
            vote
          </Button>
        </Row>
      </Column>
      <RevealFx fillHeight fillWidth>
        <Column maxWidth={24} fillHeight vertical="center" horizontal="center">
          <Text variant="body-default-m" onBackground="neutral-strong">
            share your ballot with this link!
          </Text>
          <CopyField ballotId={slugPath} />
        </Column>
      </RevealFx>
    </Column>
  );
}
