"use client";
import { Dispatch, SetStateAction } from "react";
import {
  ActionIcon,
  Checkbox,
  Group,
  Text,
  TransferList,
  TransferListData,
  TransferListItemComponent,
  TransferListItemComponentProps,
} from "@mantine/core";
import { IconArrowBarToDown, IconArrowBarToUp } from "@tabler/icons-react";

type Props = {
  store: [TransferListData, Dispatch<SetStateAction<TransferListData>>];
  searchPlaceholder?: string;
  nothingFound?: string;
  titles?: [string, string];
};

export function TransferListOfChoice({
  store,
  searchPlaceholder,
  nothingFound,
  titles,
}: Props) {
  const ItemComponent: TransferListItemComponent = ({
    data,
    selected,
  }: TransferListItemComponentProps) => (
    <>
      <Group
        noWrap
      >
        <div style={{ flex: 1 }}>
          <Text size="md" weight={600}>
            {data.label}
          </Text>
        </div>
        <Checkbox
          checked={selected}
          tabIndex={-1}
          sx={{ pointerEvents: "none" }}
        />
      </Group>
    </>
  );

  return (
    <>
      <TransferList
        value={store[0]}
        w={'100%'}
        onChange={store[1]}
        searchPlaceholder={searchPlaceholder}
        nothingFound={nothingFound}
        titles={titles}
        listHeight={42 * (store[0][0].length + store[0][1].length)}
        breakpoint="md"
        itemComponent={ItemComponent}
      />
    </>
  );
}
