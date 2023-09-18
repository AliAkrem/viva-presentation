"use client";
import { RankTableSort, Ranking } from "@/components/RankingTable";
import { StatsGroup } from "@/components/state";
import supabase from "@/utils/supabase-browser";
import {
  Flex,
  Grid,
  Group,
  SegmentedControl,
  SimpleGrid,
  Skeleton,
} from "@mantine/core";
import { nanoid } from "nanoid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

import useSWR from "swr";

const studentRegistrationFetcher = async () => {
  const { data: rows, error } = await supabase
    .from("students_registration")
    .select("*")
    .order("start", { ascending: false })
    .limit(1)
    .returns<
      {
        first_name: string;
        last_name: string;
        student_code: string;
        specialty_name: string;
        start: number;
        ms1: number;
        ms2: number;
        mgc: number;
        observation: string | null;
      }[]
    >();

  if (error) throw new Error("Failed to fetch data");

  let data:
    | {
        title: string;
        stats: string;
        description?: string | undefined;
      }[]
    | undefined = [];

  if (rows) {
    data = [
      {
        title: rows[0].specialty_name,
        stats: "specialty",
      },
      {
        title: rows[0].start + " / " + (rows[0].start + 1),
        stats: "scholar year",
      },
    ];
  }

  return data;
};
const studentsRankingFetcher = async (url: string[]) => {
  const { data: max_year, error: error1 } = await supabase
    .from("students_registration")
    .select("start")
    .order("start", { ascending: false })
    .limit(1)
    .single();

  let { data: exist_year, error: yearNotExist } = await supabase
    .from("year_scholar")
    .select("start")
    .eq("start", url[1])
    .single();
  const { data: rows, error } = await supabase
    .from("students_registration")
    .select("*")
    .eq("start", !yearNotExist ? exist_year?.start : max_year?.start)
    .returns<
      {
        first_name: string;
        last_name: string;
        student_code: string;
        specialty_name: string;
        start: string;
        ms1: string;
        ms2: string;
        mgc: string;
        observation: string | null;
      }[]
    >();

  // .eq("year_id", year_id);
  if (error) throw new Error("Failed to fetch data");

  let data: Ranking[] = [];

  if (rows != undefined)
    data = rows.map((row) => {
      return {
        nanoId: nanoid(),
        student_code: row.student_code,
        full_name: row.first_name + " " + row.last_name,
        ms1: row.ms1,
        ms2: row.ms2,
        mgc: row.mgc,
        observation: row.observation,
      };
    });

  return data;
};

export default function StudentProfile() {
  const {
    data: studentRegistrationData,
    isLoading: studentRegistrationDataLoading,
  } = useSWR("/fetchRegistration", studentRegistrationFetcher);

  const searchParams = useSearchParams()!;
  const router = useRouter();
  const pathname = usePathname();

  const { data: studentsRanking } = useSWR(
    ["/yearScholar", searchParams.get("year")],
    studentsRankingFetcher,
    {}
    );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams();
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const value = useMemo(() => {
    return {
      studentRegistrationData,
      studentsRanking,
    };
  }, [studentRegistrationData, studentsRanking]);


  return (
    <>
      <Flex
        direction={"column"}
        justify={"space-between"}
        rowGap={"lg"}
        sx={{ width: "100%" }}  
      >
        {!studentRegistrationDataLoading ? (
          <SimpleGrid sx={{ width: "100%" }} cols={1}>
            <StatsGroup data={value.studentRegistrationData} />
          </SimpleGrid>
        ) : (
          <Skeleton height={210} width={"100%"} hidden={false} />
        )}

        {value.studentsRanking ? (
          <>
            <SegmentedControl
              onChange={(value) => {
                router.push(pathname + "?" + createQueryString("year", value));
              }}
              data={[
                { label: "2021/2022", value: "2021" },
                { label: "2022/2023", value: "2022" },
              ]}
              defaultValue={searchParams.get("year") || ""}
            />
            <RankTableSort data={value.studentsRanking} />
          </>
        ) : (
          <Skeleton height={300} hidden={false} width={"100%"} />
        )}
      </Flex>
    </>
  );
}
