"use client";
import { combineValidators } from "@/utils/validators/combineValidators";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "../Auth/AuthProvider";
import { showNotification } from "@mantine/notifications";
import { RecoverEmailLimiter } from "@/app/api/config/limiters";
const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFcamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export function ForgotPassword() {
  const { supabase } = useAuth();
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: combineValidators(
        isNotEmpty("cannot be empty"),
        isEmail("not valid email format")
      ),
    },
  });

  const handleSubmit = async ({ email }: { email: string }) => {


    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback`,
    });

    if (!error) {
      showNotification({
        message: "confirmation link sended to email",
        color: "green",
        icon: <IconCheck />,
      });
    } else {
      showNotification({
        message: "Too many attempts",
        color: "red",
        icon: <IconX />,
      });
      
    }
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Your email"
            placeholder="username@example.com"
            // required
            withAsterisk={true}
            {...form.getInputProps("email")}
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Link href="/login">
                  {" "}
                  <Box ml={5}> Back to the login page</Box>
                </Link>
              </Center>
            </Anchor>
            <Button type="submit" variant="light" className={classes.control}>
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
