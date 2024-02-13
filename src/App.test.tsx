/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("input should be initially empty", () => {
    render(<App />);
    const emailInnutElement = screen.getByRole("textbox");
    const passwordInnutElement = screen.getByLabelText("Password");
    const confirmPasswordInnutElement = screen.getByLabelText("Confirm Password");

    expect(emailInnutElement).toHaveValue("");
    expect(passwordInnutElement).toHaveValue("");
    expect(confirmPasswordInnutElement).toHaveValue("");
});
