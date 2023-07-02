"use client";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  ActionIcon,
  useMantineColorScheme,
  Loader,
  Flex,
} from "@mantine/core";
// import { ServerStyles, createStylesServer } from '@mantine/next';
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconSun,
  IconMoonStars,
  IconPackage,
  IconLock,
  IconTriangle,
  IconDatabase,
  IconBrandMantine,
  IconLetterN,
  IconLogout,
} from "@tabler/icons-react/";
import Link from "next/link";
const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,

    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,

    paddingBottom: theme.spacing.xl,

    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));
const mockdata = [
  {
    icon: IconPackage,
    title: "next-auth",
    description:
      "NextAuth.js is becoming Auth.js! 🎉 We're creating Authentication for the Web. Everyone included. You are looking at the NextAuth.js (v4) documentation. For the new documentation go to ",
  },
  {
    icon: IconLock,
    title: "credentials provider",
    description:
      "The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password,",
  },
  {
    icon: IconTriangle,
    title: "prisma ORM",
    description:
      "Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion. ",
  },
  {
    icon: IconDatabase,
    title: "Mysql DB",
    description:
      "Build applications for popular use cases with step-by-step instructions and code samples.",
  },
  {
    icon: IconBrandMantine,
    title: "mantine ui component",
    description:
      "Build fully functional accessible web applications faster than ever Mantine includes more than 100 customizable components and 50 hooks to cover you in any situation",
  },
  {
    icon: IconLetterN,
    title: "Next.js",
    description:
      "Used by some of the world's largest companies, Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.",
  },
];

// import { getSession, signOut, useSession } from "";
import { useRouter } from "next/navigation";
import UserButton from "@/components/userButton/page";

import { useAuth } from "@/components/Auth/AuthProvider";

export default function HomeNavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [logoutOpened, { toggle: toggleLogout }] = useDisclosure(false);

  const { classes, theme } = useStyles();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const router = useRouter();

  const { initial, role, session, user, signOut } = useAuth();


  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header height={70} px="xl">
        <Flex
          justify={"space-between"}
          align={"center"}
          sx={{ height: "100%", overflow: "hidden" }}
        >
          <Group
            sx={{ height: "80%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link href="/" className={classes.link}>
              Home
            </Link>

            <HoverCard
              width={760}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
              zIndex={9999999}
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Dev Tools
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </a>
              </HoverCard.Target>
              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Dev Tools</Text>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text fw={500} fz="sm">
                        (<Link href="/login">Get started</Link>)
                      </Text>
                      <Text size="xs" color="dimmed">
                        try sign-up and login system using{" "}
                        <Text
                          variant="gradient"
                          gradient={{ from: "pink", to: "yellow" }}
                        >
                          Next-Auth package
                        </Text>{" "}
                      </Text>
                    </div>
                    {!session && (
                      <Button
                        variant="default"
                        onClick={() => {
                          router.push("/login");
                        }}
                      >
                        Get started
                      </Button>
                    )}
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="/" className={classes.link}>
              Learn
            </Link>
            <Link href="/" className={classes.link}>
              Academy
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            {initial ? (
              <Loader size={"sm"} />
            ) : !session ? (
              <>
                <Button
                  variant="default"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Log in
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <UserButton
                    role={role}
                    Username={
                      user?.first_name && user?.last_name
                        ? user?.last_name + " " + user?.first_name
                        : ""
                    }
                    email={user?.user_email || ""}
                  />
                </div>
              </>
            )}
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme}
              title="Toggle color scheme"
            >
              {dark ? (
                <IconSun size="1.1rem" />
              ) : (
                <IconMoonStars size="1.1rem" />
              )}
            </ActionIcon>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Flex>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={"Navigation"}
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "blue"}
          onClick={() => {
            toggleColorScheme();
          }}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link
            href="/"
            className={classes.link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Home
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Dev Tools
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>

          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {session ? (
            <>
              <div className="flex items-center" onClick={toggleLogout}>
                <UserButton
                  Username={
                    user?.first_name && user?.last_name
                      ? user?.last_name + " " + user?.first_name
                      : ""
                  }
                  email={user?.user_email}
                />
              </div>
              <Collapse in={logoutOpened}>
                <UnstyledButton
                  className={classes.subLink}
                  onClick={() => signOut()}
                >
                  <Group noWrap align="center">
                    <ThemeIcon size={34} variant="default" radius="md">
                      <IconLogout
                        size={rem(22)}
                        color={theme.fn.primaryColor()}
                      />
                    </ThemeIcon>

                    <div>
                      <Text size="sm" fw={500}>
                        log out
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
              </Collapse>
            </>
          ) : (
            <Group position="center" grow pb="xl" px="md">
              <Button
                variant="default"
                onClick={() => {
                  router.push("/login");
                  closeDrawer();
                }}
              >
                Log in
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
