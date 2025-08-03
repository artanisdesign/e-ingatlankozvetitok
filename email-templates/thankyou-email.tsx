import * as React from "react"
import { Body } from "@react-email/body"
import { CodeInline } from "@react-email/code-inline"
import { Column } from "@react-email/column"
import { Container } from "@react-email/container"
import { Head } from "@react-email/head"
import { Heading } from "@react-email/heading"
import { Hr } from "@react-email/hr"
import { Html } from "@react-email/html"
import { Img } from "@react-email/img"
import { Link } from "@react-email/link"
import { Preview } from "@react-email/preview"
import { Row } from "@react-email/row"
import { Section } from "@react-email/section"
import { Tailwind } from "@react-email/tailwind"
import { Text } from "@react-email/text"

import { ThankYouEmailProps } from "@/email-templates/contanct-form-template"

export function ThankYouEmail(props: ThankYouEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>e-ingatlanügyvédek.hu: Köszönjük a megkeresést!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#3b82f6",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-white font-sans text-base">
          <Container className="bg-white p-4">
            <Img
              src={"https://e-ingatlanugyvedek.hu/logo_96.png"}
              width={"44"}
              height={"44"}
              className="-mb-4"
            />

            <Heading className="my-0 mt-8 leading-8">
              Köszönjük a megkeresést!
            </Heading>
            <Section>
              <Row>
                <Text className="text-base">
                  Kedves <strong>{props.name}</strong>!
                </Text>

                <Text className="text-base">
                  Hálásak vagyunk, hogy az{" "}
                  <strong>e-ingatlanügyvédek.hu</strong> csapatát választotta.
                  Hamarosan felvesszük Önnel a kapcsolatot.
                </Text>
                <Text className="text-base">
                  Üdvözlettel, <br />
                  <strong>Illés és Szabó Ügyvédi Társulás</strong>
                </Text>
              </Row>
            </Section>
            <Section>
              <Row>
                <Text className="text-xs">
                  Dear <strong>{props.name}</strong>!
                </Text>

                <Text className="text-xs">
                  Thank you for choosing the{" "}
                  <strong>e-ingatlanügyvédek.hu</strong> team. We’ve received
                  your message and will be in touch with you soon to assist with
                  your real estate legal needs.
                </Text>
                <Text className="text-xs">
                  Best regards, <br />
                  <strong> Illés and Szabó Lawyers’ Association</strong>
                </Text>
              </Row>
            </Section>
            <Section
              style={{
                background: "rgb(245, 244, 245)",
                borderRadius: "8px",
                marginBottom: "0px",
                marginTop: "30px",
                padding: "10px",
              }}
            >
              <Text className="text-xs">Üzenet/Message:</Text>
              <CodeInline className="text-xs">
                Név/Name: {props.name}
                <br />
                Email: {props.email}
                <br />
                Telefonszám/Phone no.: {props.phonenumber}
              </CodeInline>
            </Section>
          </Container>
          <Container className="mt-0 p-4">
            <Section>
              <Row>
                <Column className="text-sm">
                  <Row className="py-1">
                    <Link href="https://e-ingatlanugyvedek.hu/szolgaltatasok">
                      Szolgáltatások
                    </Link>
                  </Row>
                  <Row className="py-1">
                    <Link href="https://e-ingatlanugyvedek.hu/dijszabas">
                      Díjszabás
                    </Link>
                  </Row>
                  <Row className="py-1">
                    <Link href="https://e-ingatlanugyvedek.hu/blog">
                      IngatlanBlog
                    </Link>
                  </Row>
                </Column>

                <Column className="text-sm">
                  <Row className="py-1">
                    <Link href="https://e-ingatlanugyvedek.hu/aszf">ÁSZF</Link>{" "}
                  </Row>
                  <Row className="py-1">
                    <Link href="https://e-ingatlanugyvedek.hu/kapcsolat">
                      Kapcsolat
                    </Link>{" "}
                  </Row>
                  <Row className="py-1">
                    <Link href="https://e-ingatlanugyvedek.hu/english">
                      English
                    </Link>{" "}
                  </Row>
                </Column>
              </Row>
            </Section>
            <Hr />
            <Text className="font-sans text-xs font-semibold">
              e-ingatlanügyvédek.hu
            </Text>
            <Text className="mb-45 text-xs text-gray-400">
              Telefon / Phone no.:{" "}
              <Link href="tel:+36707191347">+36 70 719 1347</Link>
            </Text>
            <Text className="mb-45 text-xs text-gray-400">
              1024, Budapest, Lövőház utca 2-6.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ThankYouEmail
