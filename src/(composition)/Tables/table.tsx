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
  Dialog,
  Flex,
  Title,
  ActionIcon,
  Stack,
  TextInput,
  Tooltip,
  Modal,
  Text,
} from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { Student } from "@/app/table-example/page";
import { useAuth } from "@/components/Auth/AuthProvider";
import { modals } from "@mantine/modals";

type TableProps = {
  students: Student[];
};

export default function StudentTable({ students }: TableProps) {
  const { supabase } = useAuth();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => students);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = async (values: Student) => {
    const { data: new_user, error: error1 } = await supabase.auth.signUp({
      email: values.email,
      password: "default password",
      //!! change it later with strong password auto generated user will invited by email to access and change password
    });

    if (error1) return;

    const { error: error2 } = await supabase.from("users").insert({
      id: new_user.user?.id,
      first_name: values.first_name,
      last_name: values.last_name,
      user_email: values.email,
    });

    if (error2) return;

    const { error: error3 } = await supabase
      .from("students")
      .insert({ id: new_user.user?.id, student_code: values.code });

    if (error3) return;

    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MRT_TableOptions<Student>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        //?send/receive api updates here, then refetch or update local table data for re-render

        // TODO ------ create supabase function handle update of student to avoid multi request -----
        const { error: error1 } = await supabase
          .from("users")
          .update({
            first_name: values.first_name,
            last_name: values.last_name,
            user_email: values.email,
          })
          .eq("id", row.getValue("student_id"))
          .select();

        const { error: error2 } = await supabase
          .from("students")
          .update({ student_code: values.code })
          .eq("id", row.getValue("student_id"));

        if (error1 || error2) return;

        tableData[row.index] = values;
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const openModal = (row: MRT_Row<Student>) => {
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
    (row: MRT_Row<Student>) => {
      const deleteRow = async () => {
        const { error, statusText } = await supabase
          .from("users")
          .delete()
          .eq("id", row.getValue("student_id"));
      };
      deleteRow();
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const getCommonEditTextInputProps = useCallback(
    (
      cell: MRT_Cell<Student>
    ): MRT_ColumnDef<Student>["mantineEditTextInputProps"] => {
      return {
        error: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
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

  const columns = useMemo<MRT_ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: "student_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        enableClickToCopy: false,
        size: 1,
        columnDefType: "data",
      },
      {
        accessorKey: "code",
        header: "code",
        //   enableColumnOrdering: false,
        //   enableEditing: false, //disable editing on this column
        //   enableSorting: false,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
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
        accessorKey: "email",
        header: "Email",
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: "email",
        }),
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
            <Tooltip position="left" label="Edit">
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip position="right" label="Delete">
              <ActionIcon
                color="red"
                onClick={() => {
                  openModal(row);
                }}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button onClick={() => setCreateModalOpen(true)} variant="light">
            Create New Account
          </Button>
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
  columns: MRT_ColumnDef<Student>[];
  onClose: () => void;
  onSubmit: (values: Student) => void;
  open: boolean;
}

//example of creating a mantine dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: Props) => {
  const inputs = columns.filter(
    (column) => column.accessorKey !== "student_id"
  );

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
const validateAge = (age: number) => age >= 18 && age <= 50;
