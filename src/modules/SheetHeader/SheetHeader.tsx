import { paths } from "@/navigation/paths";
import { Invoice } from "@/services/InvoiceApi";
import { Sheet } from "@/services/SheetApi";
import { PageHeader } from "antd";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EditSheet } from "../EditSheet/EditSheet";
import { RemoveSheet } from "../RemoveSheet/RemoveSheet";
import { CreateInvoice } from "./CreateInvoice/CreateInvoice";

type Props = {
  sheet: Sheet;
};

export const SheetHeader = ({ sheet }: Props): ReactElement => {
  const { t } = useTranslation("common", { keyPrefix: "sheet" });

  const navigate = useNavigate();

  const handleRemoveSuccess = () => {
    navigate(paths.home);
  };

  const handleBackClick = () => {
    navigate(paths.home);
  };

  const handleCreateSuccess = (invoice: Invoice) => {
    navigate(paths.invoice(sheet.id, invoice.index));
  };

  return (
    <PageHeader
      extra={[
        <CreateInvoice
          key="create"
          onSuccess={handleCreateSuccess}
          sheet={sheet}
        />,
        <EditSheet key="edit" sheet={sheet} />,
        <RemoveSheet
          key="remove"
          onSuccess={handleRemoveSuccess}
          sheet={sheet}
        />,
      ]}
      ghost={false}
      onBack={handleBackClick}
      subTitle={t("subtitle")}
      title={sheet.name}
    />
  );
};
