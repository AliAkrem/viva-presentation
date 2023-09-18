"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  MantineReactTable,
  MRT_TableOptions,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
  useMantineReactTable,
} from "mantine-react-table";
import {
  Box,
  Button,
  Flex,
  Title,
  Stack,
  TextInput,
  Modal,
  Text,
} from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useAuth } from "@/components/Auth/AuthProvider";
import { modals } from "@mantine/modals";

import type { User } from "@/app/users-accounts/page";
import { ButtonMenu } from "../../menuButton";
import { deleteUser } from "./crudFunctions/delete";
import updateUser from "./crudFunctions/update";

type TableProps = {
  users: User[];
};

export default function UsersTable({ users }: TableProps) {
  const { supabase } = useAuth();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => users);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = async (values: User) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MRT_TableOptions<User>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        //?send/receive api updates here, then refetch or update local table data for re-render

        const error = await updateUser(values);

        if(error) { 
          console.log(error)
        }

        tableData[row.index] = values;
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const openModal = (row: MRT_Row<User>) => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          are you sure you want to delete {row.getValue("role")}{" "}
          {row.getValue("first_name")}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => handleDeleteRow(row),
    });
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<User>) => {
      const error = await deleteUser(row.getValue("user_id"));

      if (error) {
        console.log(error);
        return; //! preform error notification here
      }

      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const getCommonEditTextInputProps = useCallback(
    (
      cell: MRT_Cell<User>
    ): MRT_ColumnDef<User>["mantineEditTextInputProps"] => {
      return {
        error: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "user_email"
              ? validateEmail(event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "user_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableClickToCopy: false,
        size: 4,
      },

      {
        accessorKey: "first_name",
        header: "First Name",
        // size: 140,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        // size: 140,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: "user_email",
        header: "Email",
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "role",
        header: "Role",
        enableEditing: false,
        GroupedCell: ({ cell, row }) => (
          <Box sx={{ color: "teal" }}>
            <strong>{cell.getValue<string>()}s </strong> ({row.subRows?.length})
          </Box>
        ),
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
        enableGrouping={true}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => {
          const menuDropDown = [
            {
              label: "Edit",
              icon: <IconEdit />,
              onclick: () => {
                table.setEditingRow(row);
              },
            },
            {
              label: "Delete",
              icon: <IconTrash color="red" />,
              onclick: () => {
                openModal(row);
              },
            },
          ];
          return (
            <Box sx={{ display: "flex", gap: "16px" }}>
              <ButtonMenu ButtonLabel={"menu"} DropDown={menuDropDown} />
            </Box>
          );
        }}
        renderTopToolbarCustomActions={() => (
          <Box>
            <Button onClick={() => setCreateModalOpen(true)} variant="light">
              Create New Account
            </Button>
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
  columns: MRT_ColumnDef<User>[];
  onClose: () => void;
  onSubmit: (values: User) => void;
  open: boolean;
}

//example of creating a mantine dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: Props) => {
  const inputs = columns.filter((column) => column.accessorKey !== "user_id");

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
      <Title ta="center">Create New Account</Title>
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

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
