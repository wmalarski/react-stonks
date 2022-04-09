import { Loading } from "@/components/Loading/Loading";
import { EditSheet } from "@/modules/EditSheet/EditSheet";
import { RemoveSheet } from "@/modules/RemoveSheet/RemoveSheet";
import { LocationGenerics } from "@/navigation/location";
import { paths } from "@/navigation/paths";
import { useSheetApi } from "@/services/SheetApi";
import { Button, PageHeader, Result } from "antd";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useMatch, useNavigate } from "react-location";
import { useQuery } from "react-query";

export const Sheet = (): ReactElement => {
  const { t } = useTranslation("common");

  const navigate = useNavigate();
  const { params } = useMatch<LocationGenerics>();
  const sheetId = Number(params.sheetId);

  const sheetApi = useSheetApi();
  const { data, refetch, isError, isLoading } = useQuery(
    sheetApi.key(sheetId),
    sheetApi.get
  );

  const handleRefreshClick = () => {
    refetch();
  };

  const handleRemoveSuccess = () => {
    navigate({ to: paths.home });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return (
      <Result
        status="error"
        title={t("sheetErrorMessage")}
        extra={
          <Button type="primary" key="back" onClick={handleRefreshClick}>
            {t("sheetReload")}
          </Button>
        }
      />
    );
  }

  return (
    <PageHeader
      extra={[
        <EditSheet sheet={data} />,
        <RemoveSheet sheet={data} onSuccess={handleRemoveSuccess} />,
      ]}
      ghost={false}
      subTitle={t("sheetSubtitle")}
      title={data.name}
    >
      <Link<LocationGenerics> to={paths.settings(sheetId)}>Settings</Link>
      <Link<LocationGenerics> to={paths.invoice(sheetId, "1")}>Invoice</Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Outlet />
    </PageHeader>
  );
};
