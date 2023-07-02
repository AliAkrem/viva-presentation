"use client";
import React, { useState } from "react";
//? mantine components requirement _________________________________________
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  rem,
  Alert,
  Overlay,
} from "@mantine/core";
//? ________________________________________________________________
//? style requirement _________________________________________
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: "cover",
    backgroundColor: "#11284b",
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(540),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));
//? ________________________________________________________________
//? validation requirement _________________________________________
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { combineValidators } from "@/utils/validators/combineValidators";
import { isPasswordValid } from "@/utils/validators/validSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { IconAlertCircle } from "@tabler/icons-react";
import handleSignIn from "@/functions/handleSignIn";
//? ________________________________________________________________


export default function LoginForm() {
  const { classes } = useStyles();

  const router = useRouter();

  const searchParams = useSearchParams();

  const [loginLoading, setLoginLoading] = useState(false);

  // *________________ form data and validation schema __________________________
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: combineValidators(
        isNotEmpty("Please enter a value for this field."),
        isEmail("The email address you entered is invalid.")
      ),
      password: combineValidators(
        isPasswordValid(
          "Password should contain a combination of letters, numbers, and special characters."
        ),
        isNotEmpty("Please enter a value for this field.")
      ),
    },
  });
  // * __________________________________________

  const _handleLogin = () => {
    setLoginLoading(true);

    const loginCredentials = loginForm.values;

    handleSignIn({ loginCredentials, router, setLoginLoading });
  };

  return (
    <div className={classes.wrapper}>
      {loginLoading && <Overlay opacity={0} />}
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Log in
        </Title>
        {searchParams.get("error") === "badLoginCredentials" && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="bad credentials"
            color="red"
            mb="30px"
          >
            Sign in failed. Check the details you provided are correct.
          </Alert>
        )}
        <form onSubmit={loginForm.onSubmit(_handleLogin)}>
          <TextInput
            label="Email address"
            placeholder="Your email"
            size="md"
            {...loginForm.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...loginForm.getInputProps("password")}
          />
          <Button
            disabled={loginLoading}
            type="submit"
            variant="outline"
            fullWidth
            mt="xl"
            size="md"
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
