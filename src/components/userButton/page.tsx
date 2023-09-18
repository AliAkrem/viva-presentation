"use client";
import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
  Flex,
} from "@mantine/core";
import { IconChevronRight, IconLogout, IconUsers } from "@tabler/icons-react";
import { useAuth } from "../Auth/AuthProvider";
import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    height: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image?: string;
  Username: string | null | undefined;
  email: string | null | undefined;
  role?: { role: string }[];
}

export default function UserButton({
  image,
  Username,
  email,
  role,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();

  const  router = useRouter()
  const { signOut } = useAuth();

  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
      {...others}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {Username}
              </Text>
              {/* //TODO ROLES DISPLAYED IN DEV MODE ONLY */}
              <Flex gap={"xs"}>
                {role?.map((value: { role: string }) => {
                  return (
                    <Text key={value.role} className="text-teal-500 text-sm">
                      {value.role}
                    </Text>
                  );
                })}
              </Flex>

              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconUsers size="1rem" stroke={1.5} />}
          onClick={ () => { 
            router.push('/profile')
          }}
        >
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            profile
          </Text>
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size="1rem" stroke={1.5} />}
          onClick={() => {
            signOut();
          }}
        >
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            Sign Out
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
