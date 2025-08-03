"use client"

import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu"
import { cn } from "@/app/lib/utils"
import { ExtendedLinkData, HeaderData } from "@/app/types/globals"

import { Contract, ContractPhone } from "./contract-offer"
import { MenuElement } from "./menu-element"

export function NavigationMenuTop({ data }: { data: HeaderData }) {
  const [value, setValue] = React.useState("")

  return (
    <NavigationMenu
      delayDuration={60}
      orientation="vertical"
      value={value}
      onValueChange={setValue}
      className="z-50 mr-0 flex  max-w-fit rounded-lg bg-background/80 px-0 shadow-sm max-[480px]:h-12 max-[480px]:max-w-full max-[480px]:rounded-none sm:px-6 min-[850px]:bg-transparent min-[850px]:px-2 min-[850px]:shadow-none lg:mr-4"
    >
      <NavigationMenuList>
        <MyItem
          title="Vevőknek"
          data={data.buyers}
          isActive={value === "Vevőknek"}
          firstElement={<Contract />}
        />
        <MyItem
          title="Eladóknak"
          data={data.sellers}
          isActive={value === "Eladóknak"}
          firstElement={<ContractPhone />}
        />
        <MyItem
          title="Szolgáltatások"
          data={data.services}
          isActive={value === "Szolgáltatások"}
          firstElement={<Contract />}
        />
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const MyItem = ({
  title,
  data,
  firstElement,
  isActive,
}: {
  title: string
  data: ExtendedLinkData[]
  firstElement: React.ReactNode
  isActive: boolean
}) => {
  const [style, setStyle] = React.useState("")

  React.useEffect(() => {
    if (isActive) {
      setStyle("grid")
    } else {
      setTimeout(function () {
        setStyle("pointer-events-none hidden ")
      }, 120)
    }
  }, [isActive])

  return (
    <NavigationMenuItem value={title} className="">
      <NavigationMenuTrigger className="bg-transparent px-3  hover:text-teal-500 max-[360px]:px-2 max-[360px]:text-xs sm:px-4">
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        forceMount
        className={cn(
          "top-0 hidden w-[365px] grid-cols-1 gap-x-2 rounded-xl p-4 transition-all duration-200 max-[350px]:w-[300px] sm:w-[430px] md:w-[550px] md:grid-cols-2 lg:w-[900px] lg:grid-cols-3",
          style
        )}
      >
        <NavMenuContentList data={data} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const NavMenuContentList = ({ data }: { data: ExtendedLinkData[] }) => {
  return (
    <>
      <div className="mx-1 flex flex-col md:mx-0">
        {data
          .filter((_e, i) => (i % 2) - 1)
          .map((service, index) => (
            <MenuElement
              key={"xs" + index}
              id={service.id}
              title={service.title}
              description={service.description}
              url={service.url}
              icon={service.icon}
              disabled={service.disabled}
              newTab={service.newTab}
            />
          ))}
      </div>

      <div className="mx-1 flex flex-col md:mx-0">
        {data
          .filter((_e, i) => i % 2)
          .map((service, index) => (
            <MenuElement
              key={"xsa" + index}
              id={service.id}
              title={service.title}
              description={service.description}
              url={service.url}
              icon={service.icon}
              disabled={service.disabled}
              newTab={service.newTab}
            />
          ))}
      </div>
    </>
  )
}
