import { Block } from "./pages"

export interface GlobalAttributes {
  siteName: string
  siteDescription: string
  siteTitle: string
  Footer: FooterData
  NavMenu: HeaderData
  Blocks: Block[]
}

export interface HeaderData {
  id: string
  buyers: ExtendedLinkData[]
  sellers: ExtendedLinkData[]
  services: ExtendedLinkData[]
}

export interface FooterData {
  id: string
  DisclaimerLinks: LinkData[]
  CompanyLinks: LinkData[]
  ProductLinks: LinkData[]
}

export interface LinkData {
  title: string
  url: string
  id: string
  newTab: boolean
}

export interface ExtendedLinkData extends LinkData {
  description: string
  icon?: string
  disabled?: boolean
}
