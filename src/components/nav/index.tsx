"use client";
import { Navbar, ScrollArea, createStyles, Flex, Group } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  TablerIconsProps,
} from "@tabler/icons-react";
import { LinksGroup } from "./navbarLinksGroup";
import React from "react";

type Props = {
  children?: React.ReactNode;
  Links: Links;
};

type Links = {
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  initiallyOpened?: boolean;
  link?: string;
  links?: {
    label: string;
    link: string;
  }[];
}[];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    width: "300px",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

export default function NavbarNested({ children, Links }: Props) {
  const { classes } = useStyles();
  const links = Links.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <>
      <Navbar height={'100vh'} p="md" className={classes.navbar}>
        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
