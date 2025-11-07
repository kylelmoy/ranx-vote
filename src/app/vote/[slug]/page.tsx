import { Heading, Column, Row, Button } from "@once-ui-system/core";
import ResponsePage from "../../../components/ResponsePage";
import type { Metadata } from "next";
import { getBallot } from "@/lib/dbAccess";

// set dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {

  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const ballot = await getBallot(slugPath);
  if (!ballot) {
    return {
      title: "ranx-vote | ballot not found",
      description: "The requested ballot could not be found.",
    };
  }
  return {
    title: `ranx-vote | vote | ${ballot.name}`,
    description: ballot.description,
  };
}

export default async function Vote({
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
      <Column fillWidth horizontal="center" align="center" paddingBottom="l">
        <Row maxWidth={24} horizontal="center">
          <Heading variant="display-strong-xl" marginTop="24">
            vote
          </Heading>
        </Row>
        <Row maxWidth={24} style={{ justifyContent: "space-between" }} paddingY="m">
          <Button prefixIcon="chevronLeft" variant="secondary" size="s" href="/">
            home
          </Button>

          <Button
            suffixIcon="chevronRight"
            variant="secondary"
            size="s"
            href={`/result/${slugPath}`}
          >
            results
          </Button>
        </Row>
        <Row maxWidth={24}>
          <ResponsePage ballotId={slugPath} />
        </Row>
      </Column>
    </Column>
  );
}
