import { Button, Menu, Text, useMantineTheme } from "@mantine/core";
import {
  IconSquareCheck,
  IconPackage,
  IconUsers,
  IconCalendar,
  IconChevronDown,
  Icon,
} from "@tabler/icons-react";

type Props = {
  ButtonLabel: string | number;
  DropDown?: {
    label: string;
    onclick: () => any;
    icon?: React.ReactNode;
    rightSection?: {
      label?: string;
    };
  }[];
};

export function ButtonMenu({ ButtonLabel, DropDown }: Props) {
  const dropDown = DropDown?.map((item) => {
    return (
      <>
        <Menu.Item
            onClick={item.onclick}
          icon={item.icon}
          rightSection={
            <Text size="xs" transform="uppercase" weight={700} color="dimmed">
              {item.rightSection?.label}
            </Text>
          }
        >
          {item.label}
        </Menu.Item>
      </>
    );
  });

  const theme = useMantineTheme();
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button
          rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />}
          pr={12}
        >
          {ButtonLabel}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>{dropDown}</Menu.Dropdown>
    </Menu>
  );
}
