"use client";
import { TransferListOfChoice } from "@/components/choicesList";
import { AutocompleteLoading } from "@/components/searchPartner";
import { Flex, Text, TransferListData } from "@mantine/core";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function ListChoice() {
  // TODO create list of choices

  const mockdata = [
    {
      value: nanoid(),
      label: "Bender Bending Rodríguez",
    },
    {
      value: nanoid(),
      label: "Carol Miller",
    },
    {
      value: nanoid(),
      label: "Bender Bending Rodríguez",
    },
    {
      value: nanoid(),
      label: "Carol Miller",
    },
    {
      value: nanoid(),
      label: "Bender Bending Rodríguez",
    },
    {
      value: nanoid(),
      label: "Carol Miller",
    },
    {
      value: nanoid(),
      label: "Bender Bending Rodríguez",
    },
    {
      value: nanoid(),
      label: "Carol Miller",
    },
    {
      value: nanoid(),
      label: "Bender Bending Rodríguez",
    },
    {
      value: nanoid(),
      label: "Carol Miller",
    },
    {
      value: nanoid(),
      label: "Bender Bending Rodríguez",
    },
    {
      value: nanoid(),
      label: "Carol Miller",
    },
    {
      value: nanoid(),
      label: "Bender Bending Rodríguez",
    },
    {
      value: nanoid(),
      label: "Carol Miller",
    },
  ];

  const store = useState<TransferListData>(() => [mockdata, []]);
  return (
    <Flex direction={"column"} align={"start"} justify={"start"} gap={"lg"}>
      <Text size={"xl"}>project management form for end-of-study projects</Text>
      <Text size={"xl"}>computer science license</Text>
      <Text size={"xl"}>specialty : computer systems</Text>

      <AutocompleteLoading />

      <TransferListOfChoice store={store} />
    </Flex>
  );
}
