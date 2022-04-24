import { useInvoiceApi } from "@/services/InvoiceApi";
import { Sheet } from "@/services/SheetApi";
import { Table } from "antd";
import { ReactElement } from "react";
import { useQuery } from "react-query";
import * as classes from "./InvoicesList.css";
import { useColumns } from "./InvoicesList.utils";

type Props = {
  sheet: Sheet;
};

export const InvoicesList = ({ sheet }: Props): ReactElement => {
  const invoiceApi = useInvoiceApi();

  const { data, isLoading } = useQuery(
    invoiceApi.listKey(sheet.sheet_id),
    invoiceApi.list,
    { refetchOnWindowFocus: false }
  );

  const columns = useColumns({ sheet });

  return (
    <Table
      bordered
      rowKey={(invoice) => invoice.name}
      className={classes.table}
      columns={columns}
      dataSource={data}
      loading={isLoading}
      size="small"
    />
  );
};
