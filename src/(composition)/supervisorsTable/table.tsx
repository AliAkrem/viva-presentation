"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  MantineReactTable,
  MRT_TableOptions,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "mantine-react-table";
import {
  Box,
  Button,
  Flex,
  Title,
  ActionIcon,
  Stack,
  TextInput,
  Tooltip,
  Modal,
  Text,
  Menu,
} from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useAuth } from "@/components/Auth/AuthProvider";
import { modals } from "@mantine/modals";
import Link from "next/link";

import type { Student } from "@/app/students/page";
import { nanoid } from "nanoid";
import { Supervisors } from "@/app/supervisors/page";
import { IconDotsVertical } from "@tabler/icons-react";

type TableProps = {
  supervisors: Supervisors[];
};

export default function SupervisorsTable({ supervisors }: TableProps) {
  const { supabase } = useAuth();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => supervisors);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = async (values: Supervisors) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MRT_TableOptions<Supervisors>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        //?send/receive api updates here, then refetch or update local table data for re-render

        // TODO ------ create supabase function handle update of student to avoid multi request -----

        tableData[row.index] = values;
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const openModal = (row: MRT_Row<Supervisors>) => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          are you sure you want to delete student {row.getValue("first_name")}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => handleDeleteRow(row),
    });
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Supervisors>) => {
      const deleteRow = async () => {
        const { error } = await supabase
          .from("users")
          .delete()
          .eq("id", row.getValue("student_id"));

        if (error) return;
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      };

      deleteRow();
    },
    [tableData]
  );

  const getCommonEditTextInputProps = useCallback(
    (
      cell: MRT_Cell<Supervisors>
    ): MRT_ColumnDef<Supervisors>["mantineEditTextInputProps"] => {
      return {
        error: validationErrors[cell.id],
      };
    },
    [validationErrors]
  );

  const columns = useMemo<MRT_ColumnDef<Supervisors>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableClickToCopy: false,
        size: 4,
        columnDefType: "data",
      },

      {
        accessorKey: "first_name",
        header: "First Name",
        // size: 140,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        // size: 140,
      },
      {
        accessorKey: "position_abbreviated",
        header: "Academic position",
      },
      {
        accessorKey: "n_assigned_team",
        header: "number of teams",
      },
    ],
    [getCommonEditTextInputProps]
  );

  return (
    <>
      <MantineReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            mantineTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        enableClickToCopy
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "16px" }}>
            <Menu position="left">
              <Menu.Target>
                <ActionIcon variant="light">
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Tooltip label="remove">
                    <IconTrash color="red" />
                  </Tooltip>
                </Menu.Item>
                <Menu.Item>
                  <Tooltip label="edit">
                    <IconEdit  />
                  </Tooltip>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        )}
      />

      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
}

interface Props {
  columns: MRT_ColumnDef<Supervisors>[];
  onClose: () => void;
  onSubmit: (values: Supervisors) => void;
  open: boolean;
}

//example of creating a mantine dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: Props) => {
  const inputs = columns.filter((column) => column.accessorKey !== "id");

  const [values, setValues] = useState<any>(() =>
    inputs.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );

  const handleSubmit = async () => {
    //put your validation logic here

    onSubmit(values);
    onClose();
  };

  return (
    <Modal opened={open} onClose={onClose}>
      <Title ta="center">add supervisors</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack
          sx={{
            width: "100%",
            gap: "24px",
          }}
        >
          {inputs.map((column) => (
            <TextInput
              key={column.accessorKey}
              label={column.header}
              name={column.accessorKey}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          ))}
        </Stack>
      </form>
      <Flex
        sx={{
          padding: "20px",
          width: "100%",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <Button onClick={onClose} variant="subtle">
          Cancel
        </Button>
        <Button color="teal" onClick={handleSubmit} variant="filled">
          Create New Account
        </Button>
      </Flex>
    </Modal>
  );
};
