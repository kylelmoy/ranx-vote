import ResultsPage from "@/components/ResultsPage";
import {
  Heading,
  Column,
  Row,
  RevealFx,
  Button,
} from "@once-ui-system/core";

export default async function Result({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  return (
    <Column fillWidth padding="l">
      <Column fillWidth horizontal="center" gap="l" align="center" paddingBottom="l">

        <Row maxWidth={24} horizontal="center">
          <Heading variant="display-strong-xl" marginTop="24">
            results
          </Heading>

          <Button prefixIcon="chevronLeft" variant="secondary" size="s" style={{ position: "absolute", left: 0, bottom: 0 }} href="/">
            home
          </Button>
        </Row>
        <Row maxWidth={24}>
          <ResultsPage ballotId={slugPath} />
        </Row>
      </Column>
    </Column>
  );
}
