import * as React from "react"

export interface EmailTemplateProps {
  name: string
  email: string
  phonenumber: string
  when: string
  business?: string
  city?: string
  path?: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  phonenumber,
  when,
  business,
  city,
  path,
}) => (
  <div>
    <h2>Általános kapcsolatfelvétel</h2>
    <h2>Név: {name}</h2>
    <h2>Email: {email}</h2>
    <h2>Telefonszám: {phonenumber}</h2>
    <h2>Mikor: {when}</h2>
    <h2>Ügytípus: {business}</h2>
    <h2>Város: {city}</h2>
    <h4>Oldal: {path}</h4>
  </div>
)

export interface EmailTemplateLawyerProps {
  name: string
  email: string
  phonenumber: string
  guild: string
}

export const EmailTemplateLawyer: React.FC<EmailTemplateLawyerProps> = ({
  name,
  email,
  phonenumber,
  guild,
}) => (
  <div>
    <h2>Ügyvédi kapcsolatfelvétel</h2>
    <h2>Név: {name}</h2>
    <h2>Email: {email}</h2>
    <h2>Telefonszám: {phonenumber}</h2>
    <h2>Kamara: {guild}</h2>
  </div>
)

export interface ThankYouEmailProps {
  name: string
  email: string
  phonenumber: string
}
