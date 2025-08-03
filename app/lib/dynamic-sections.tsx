"use client"

import dynamic from "next/dynamic"

import ContactFormEnglish from "../components/blocks/contact-form-english"
import { Icons } from "../components/icons"
import { Block } from "../types/pages"

const loader = () => (
  <div className="flex items-center justify-center">
    <Icons.spinner className="mr-2 size-4 animate-spin place-self-center text-teal-500" />
  </div>
)
/*
const TeamSection = dynamic(() => import("../components/blocks/team-section"), {
  loading: loader,
})*/
/*
const Testimonials = dynamic(
  () => import("../components/blocks/testimonials"),
  {
    loading: loader,
  }
)*/

const ContactForm = dynamic(() => import("../components/blocks/contact-form"), {
  loading: loader,
})

const CountrySelect1 = dynamic(
  () => import("../components/calculators/country-select-1"),
  {
    loading: loader,
  }
)

const LawyerContactForm = dynamic(
  () => import("../components/blocks/lawyer-contact-form"),
  {
    loading: loader,
  }
)

const RealEstateContactForm = dynamic(
  () => import("../components/blocks/contact-form-real-estate"),
  {
    loading: loader,
  }
)

const MortgageContactForm = dynamic(
  () => import("../components/blocks/contact-form-mortgage"),
  {
    loading: loader,
  }
)

const LawyerFee = dynamic(
  () => import("../components/calculators/lawyer-fee"),
  {
    loading: loader,
  }
)

const NewbuildGuarantee = dynamic(
  () => import("../components/calculators/newbuild-guarantee"),
  {
    loading: loader,
  }
)

const RegionBankPicker = dynamic(
  () => import("../components/blocks/region-bank-picker"),
  {
    loading: loader,
  }
)

export default function DynamicSectionRenderer({
  section,
}: {
  section: Block
}) {
  return (
    <>
      {section.__component === "blocks.bank-account-picker" && (
        <RegionBankPicker data={section} />
      )}
      {section.__component === "calculators.ujepitesu-lakasok-jotallas" && (
        <NewbuildGuarantee data={section} />
      )}
      {section.__component === "blocks.contact-form" &&
        section.type === "lawyer-contact-form" && <LawyerContactForm />}

      {section.__component === "blocks.contact-form" &&
        section.type === "real-estate-contact-form" && (
          <RealEstateContactForm />
        )}

      {section.__component === "blocks.contact-form" &&
        section.type === "mortgage-contact-form" && <MortgageContactForm />}

      {section.__component === "blocks.contact-form" &&
        section.type === "basic-contact-form" && <ContactForm />}

      {section.__component === "blocks.contact-form" &&
        section.type === "english-contact-form" && <ContactFormEnglish />}

      {section.__component === "calculators.country-select" && (
        <CountrySelect1 data={section} />
      )}
      {section.__component === "calculators.lawyer-fee" && (
        <LawyerFee data={section} />
      )}
      {/*section.__component === "blocks.team" && (
        <TeamSection data={section as TeamBlock} />
      )*/}
      {/*section.__component === "blocks.testimonials" && (
        <Testimonials data={section as TestimonialsBlock} />
      )*/}
    </>
  )
}
