"use client";
import { Avatar, Text, Paper, createStyles, Skeleton } from "@mantine/core";
import { UserInfo } from "../Auth/AuthProvider";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

export function UserInfoAction({
  first_name,
  last_name,
  user_email,
}: UserInfo) {
  const { classes } = useStyles();

  return (
    <Skeleton visible={first_name == null}>
      <Paper className={classes.container} withBorder>
        <Avatar
          src={
            "https://scontent.forn3-2.fna.fbcdn.net/v/t39.30808-1/308724419_1180138019236301_7242318700379809400_n.jpg?stp=dst-jpg_p160x160&_nc_cat=103&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=8QzoXQyxzaIAX8rn9Ri&_nc_ht=scontent.forn3-2.fna&oh=00_AfBKG4y2vfJt-ENWQStoJDq120Ie-5j9b39qMeVAXG9A2Q&oe=64A98180"
          }
          size={120}
          radius={120}
          mx="auto"
        />
        <Text ta="center" fz="lg" weight={500} mt="md">
          {first_name + " " + last_name}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {user_email}
          {/* ••••••• */}
        </Text>
      </Paper>
    </Skeleton>
  );
}
