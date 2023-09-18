import { User } from "@/app/users-accounts/page";

type Props = {
    values: User;
    tableData: User[];
    setTableData: React.Dispatch<React.SetStateAction<User[]>>
}

export const handleCreateNewRow = async ({ values, tableData, setTableData }: Props) => {
    tableData.push(values);
    setTableData([...tableData]);
};