import { TablerIconsProps } from "@tabler/icons-react";
import { Url } from "next/dist/shared/lib/router/router";

export type UserNavLinks = ({
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  initiallyOpened?: boolean;
  link?: string
  links?: {
    label: string;
    link: string;
  }[];
}
)[];

