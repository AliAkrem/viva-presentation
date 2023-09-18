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
  PasswordInput,
} from "@mantine/core";
import { isEmail, isNotEmpty, matchesField, useForm } from "@mantine/form";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "../Auth/AuthProvider";
import { isPasswordValid } from "@/utils/validators/validSchema";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
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

type Props = {};

export function ChangePassword() {
  const { supabase, user } = useAuth();
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      password: "",
      confirm: "",
    },
    validate: {
      password: combineValidators(
        isNotEmpty("cannot be empty"),
        isPasswordValid(
          "password must contain at least 8 character, lowercase, uppercase and  numbers"
        )
      ),
      confirm: matchesField("password", "Passwords are not the same"),
    },
  });

  const router = useRouter();

  const handleSubmit = useCallback(({ password }: { password: string }) => {
    async function updatePassword(password: string) {
      const { error } = await supabase.auth.updateUser({ password: password });
      if (!error) {
        router.push("/");
        showNotification({ title: "success", message : 'password changed successfully' , icon : <IconCheck />  });
      }
    }
    updatePassword(password);
  }, []);

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        set new password
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        {user?.user_email}
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            label="New Password"
            placeholder=""
            withAsterisk={true}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            pt="md"
            label="Confirm password"
            placeholder=""
            withAsterisk={true}
            {...form.getInputProps("confirm")}
          />
          <Group position="right" mt="lg" className={classes.controls}>
            <Button type="submit" variant="light" className={classes.control}>
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
