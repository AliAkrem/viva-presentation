"use client";

import { StatsGroup } from "@/components/state";
import { Flex } from "@mantine/core";
import React from "react";

export default function AdminHome() {
  const data = [
    {
      title: "teachers",
      stats: "456,133",
      //   description:
      //     "24% more than in the same month last year, 33% more that two years ago",
    },
    {
      title: "New users",
      stats: "2,175",
      //   description:
      //     "13% less compared to last month, new user engagement up by 6%",
    },
    {
      title: "Students",
      stats: "1,994",
      //   description:
      //     "1994 orders were completed this month, 97% satisfaction rate",
    },
  ];

  return (
    <>
      <Flex direction={'column'} gap={'md'} >
        <StatsGroup data={data} />
        <StatsGroup data={data} />
      </Flex>
    </>
  );
}
