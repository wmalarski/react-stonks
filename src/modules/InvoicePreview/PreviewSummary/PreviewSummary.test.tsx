import { mockInvoice } from "@/tests/mocks";
import { PropsWithTestWrapper, TestWrapper } from "@/tests/TestWrapper";
import i18n from "@/utils/i18next";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { PreviewSummary } from "./PreviewSummary";

type Props = ComponentProps<typeof PreviewSummary>;

const renderComponent = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Partial<Props>> = {}) => {
  const defaultProps: Props = {
    invoice: mockInvoice(),
  };

  return render(
    <TestWrapper {...wrapperProps}>
      <PreviewSummary {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe("<PreviewSummary />", () => {
  it("should render", async () => {
    expect.hasAssertions();

    renderComponent();

    const header = i18n.t<string>("PreviewSummary", { ns: "common" });
    await expect(screen.findByText(header)).resolves.toBeInTheDocument();
  });
});