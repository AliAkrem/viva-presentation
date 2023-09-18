import { useCallback, useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  scrolBar: {
    width: "100%",
    height: 500,
    [theme.fn.smallerThan("md")]: {
      width: "67vw",
    },
    [theme.fn.smallerThan("sm")]: {
      width: "93vw",
    },
  },
  table: {
    width: "100%",
    maxHeight: 100,
    [theme.fn.smallerThan("md")]: {
      width: 900,
    },
    [theme.fn.smallerThan("sm")]: {
      width: 900,
    },
  },
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.md} ${theme.spacing.xs}`,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    // width: rem(21),
    // height: rem(21),
    // borderRadius: rem(21),
  },
}));

export interface Ranking {
  nanoId: string;
  student_code: string;
  full_name: string;
  ms1: string;
  ms2: string;
  mgc: string;
  observation: string | null;
}
interface TableSortProps {
  data: Ranking[];
}
interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: Ranking[], search: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item) =>
    keys(data[0]).some((key) =>
      item[key]?.toString().toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: Ranking[],
  payload: { sortBy: keyof Ranking | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy]?.toString().localeCompare(a[sortBy] ?? "") ?? 0;
      }
      return a[sortBy]?.toString().localeCompare(b[sortBy] ?? "") ?? 0;
    }),
    payload.search
  );
}

export function RankTableSort({ data }: TableSortProps) {
  const { classes } = useStyles();

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Ranking | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const setSorting = (field: keyof Ranking) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      setSearch(value);
      setSortedData(
        sortData(data, {
          sortBy,
          reversed: reverseSortDirection,
          search: value,
        })
      );
    },
    [search]
  );

  const rows = sortedData?.map((row) => (
    <>
      <tr key={row.nanoId}>
        <td>{row.student_code}</td>
        <td>{row.full_name}</td>
        <td>{row.ms1}</td>
        <td>{row.ms2}</td>
        <td>{row.mgc}</td>
        <td>{row.observation}</td>
      </tr>
    </>
  ));

  return (
    <>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea className={classes.scrolBar} scrollbarSize={0}>
        <Table
          horizontalSpacing="xl"
          verticalSpacing="xl"
          withColumnBorders
          withBorder
          fontSize={"md"}
          className={classes.table}
          sx={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <Th
              // sorted={sortBy === "full_name"}
              // reversed={reverseSortDirection}
              // onSort={() => setSorting("student_code")}
              >
                Code
              </Th>
              <Th
                sorted={sortBy === "full_name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("full_name")}
              >
                Full Name
              </Th>
              <Th
                sorted={sortBy === "ms1"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("ms1")}
              >
                MS1
              </Th>
              <Th
                sorted={sortBy === "ms2"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("ms2")}
              >
                MS2
              </Th>
              <Th
                sorted={sortBy === "mgc"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("mgc")}
              >
                MGC
              </Th>
              <Th
                sorted={sortBy === "observation"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("observation")}
              >
                Observation
              </Th>
            </tr>
          </thead>
          <tbody>
            {!rows || rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={data.length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
