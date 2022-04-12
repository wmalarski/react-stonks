import { Router } from "@/navigation/Router";
import { DocApiContext, DocApiService } from "@/services/DocApi";
import {
  SpreadSheetApiContext,
  SpreadSheetApiService,
} from "@/services/SpreadSheetApi";
import i18next from "@/utils/i18next";
import { ReactElement, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { mockDocApi, mockSpreadSheetApi } from "./mocks";

export type TestWrapperProps = {
  children?: ReactNode;
  docApi?: DocApiService;
  spreadSheetApi?: SpreadSheetApiService;
};

export type PropsWithTestWrapper<T = unknown> = T & {
  wrapperProps?: Omit<TestWrapperProps, "children">;
};

export const TestWrapper = ({
  children,
  docApi,
  spreadSheetApi,
}: TestWrapperProps): ReactElement => {
  return (
    <DocApiContext.Provider
      value={{ isInitialized: true, api: docApi ?? mockDocApi() }}
    >
      <SpreadSheetApiContext.Provider
        value={{
          isInitialized: true,
          api: spreadSheetApi ?? mockSpreadSheetApi(),
        }}
      >
        <Router>
          <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
        </Router>
      </SpreadSheetApiContext.Provider>
    </DocApiContext.Provider>
  );
};
