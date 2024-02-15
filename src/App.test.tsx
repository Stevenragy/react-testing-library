/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";

type FormInputs = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};
const typeIntoForm = async ({ email, password, confirmPassword }: FormInputs) => {
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

    if (email) {
        await userEvent.type(emailInputElement, email);
    }
    if (password) {
        await userEvent.type(passwordInputElement, password);
    }
    if (confirmPassword) {
        await userEvent.type(confirmPasswordInputElement, confirmPassword);
    }

    return { emailInputElement, passwordInputElement, confirmPasswordInputElement };
};

const submitButtonClick = async () => {
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitBtn);
};
describe("APP", () => {
    beforeEach(async () => {
        render(<App />);
    });
    test("input should be initially empty", () => {
        const emailInputElement = screen.getByRole("textbox");
        const passwordInputElement = screen.getByLabelText("Password");
        const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

        expect(emailInputElement).toHaveValue("");
        expect(passwordInputElement).toHaveValue("");
        expect(confirmPasswordInputElement).toHaveValue("");
    });

    test("Should be able to type an email", async () => {
        const { emailInputElement } = await typeIntoForm({ email: "selena@gmail.com" });
        expect(emailInputElement).toHaveValue("selena@gmail.com");
    });

    test("Should be able to type a password", async () => {
        const { passwordInputElement } = await typeIntoForm({ password: "1234" });
        expect(passwordInputElement).toHaveValue("1234");
    });

    test("Should be able to type a confirm password", async () => {
        const { confirmPasswordInputElement } = await typeIntoForm({ confirmPassword: "1234" });
        expect(confirmPasswordInputElement).toHaveValue("1234");
    });
    describe("Error handling", () => {
        beforeEach(() => {
            console.log("before each error handling");
        });
        test("should show email error message on invalid email", async () => {
            expect(screen.queryByText("The email you input is invalid.")).not.toBeInTheDocument();

            await typeIntoForm({ email: "selenagmail.com" });
            await submitButtonClick();

            expect(screen.queryByText("The email you input is invalid.")).toBeInTheDocument();
        });

        test("should show password error message on invalid password", async () => {
            expect(screen.queryByText("The password you entered should contain 5 or more characters.")).not.toBeInTheDocument();

            await typeIntoForm({ email: "selena@gmail.com", password: "12" });
            await submitButtonClick();

            expect(screen.queryByText("The password you entered should contain 5 or more characters.")).toBeInTheDocument();
        });

        test("should show confirm password error message on invalid confirm password", async () => {
            expect(screen.queryByText("The passwords don't match. Try again.")).not.toBeInTheDocument();

            await typeIntoForm({ email: "selena@gmail.com", password: "123456", confirmPassword: "1234567aaa" });
            await submitButtonClick();

            expect(screen.queryByText("The passwords don't match. Try again.")).toBeInTheDocument();
        });

        test("No errors in case of valid inputs", async () => {
            await typeIntoForm({ email: "selena@gmail.com", password: "123456", confirmPassword: "123456" });
            await submitButtonClick();

            expect(screen.queryByText("The passwords don't match. Try again.")).not.toBeInTheDocument();
            expect(screen.queryByText("The email you input is invalid.")).not.toBeInTheDocument();
            expect(screen.queryByText("The password you entered should contain 5 or more characters.")).not.toBeInTheDocument();
        });
    });
});
