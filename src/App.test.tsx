/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("input should be initially empty", () => {
    render(<App />);
    const emailInputElement = screen.getByRole("textbox");
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

    expect(emailInputElement).toHaveValue("");
    expect(passwordInputElement).toHaveValue("");
    expect(confirmPasswordInputElement).toHaveValue("");
});

test("Should be able to type an email", async () => {
    render(<App />);
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    await userEvent.type(emailInputElement, "selena@gmail.com");
    expect(emailInputElement).toHaveValue("selena@gmail.com");
});

test("Should be able to type a password", async () => {
    render(<App />);
    const passwordInputElement = screen.getByLabelText("Password");
    await userEvent.type(passwordInputElement, "1234");
    expect(passwordInputElement).toHaveValue("1234");
});

test("Should be able to type a confirm password", async () => {
    render(<App />);
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
    await userEvent.type(confirmPasswordInputElement, "1234");
    expect(confirmPasswordInputElement).toHaveValue("1234");
});

test("should show email error message on invalid email", async () => {
    render(<App />);
    const emailErrorElement = screen.queryByText("The email you input is invalid.");
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    expect(emailErrorElement).not.toBeInTheDocument();

    await userEvent.type(emailInputElement, "selena.com");
    await userEvent.click(submitBtn);

    expect(screen.queryByText("The email you input is invalid.")).toBeInTheDocument();
});

test("should show password error message on invalid password", async () => {
    render(<App />);
    const passwordErrorElement = screen.queryByText("The password you entered should contain 5 or more characters.");
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const passwordInputElement = screen.getByLabelText("Password");
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    expect(passwordErrorElement).not.toBeInTheDocument();
    await userEvent.type(emailInputElement, "selena@hotmail.com");
    await userEvent.type(passwordInputElement, "12");
    await userEvent.click(submitBtn);

    expect(screen.queryByText("The password you entered should contain 5 or more characters.")).toBeInTheDocument();
});

test("should show confirm password error message on invalid confirm password", async () => {
    render(<App />);
    const confirmPasswordErrorElement = screen.queryByText("The passwords don't match. Try again.");
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
    await userEvent.type(emailInputElement, "selena@hotmail.com");
    await userEvent.type(passwordInputElement, "123456");
    await userEvent.type(confirmPasswordInputElement, "123456a");
    await userEvent.click(submitBtn);

    expect(screen.queryByText("The passwords don't match. Try again.")).toBeInTheDocument();
});

test("No errors in case of valid inputs", async () => {
    render(<App />);
    const confirmPasswordErrorElement = screen.queryByText("The passwords don't match. Try again.");
    const emailErrorElement = screen.queryByText("The email you input is invalid.");
    const passwordErrorElement = screen.queryByText("The password you entered should contain 5 or more characters.");
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(emailInputElement, "selena@hotmail.com");
    await userEvent.type(passwordInputElement, "123456");
    await userEvent.type(confirmPasswordInputElement, "123456");
    await userEvent.click(submitBtn);

    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
    expect(emailErrorElement).not.toBeInTheDocument();
    expect(passwordErrorElement).not.toBeInTheDocument();
});
