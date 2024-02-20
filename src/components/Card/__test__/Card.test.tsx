/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../Card";
import userEvent from "@testing-library/user-event";
import { CardProps } from "../types";

const cardProps: CardProps = {
    name: "Sydney",
    phone: "11-111-1111",
    email: "steven@gmail.com",
    image: {
        url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8fDB8fHww",
        alt: "Boss Cat",
    },
    favoured: false,
    index: 0,
    color: "black",
    gender: "female",
};
describe("Card", () => {
    beforeEach(() => {
        render(<Card {...cardProps} />);
    });
    test("should show cat name", () => {
        expect(screen.getByRole("heading", { name: cardProps.name })).toBeInTheDocument();
    });

    it("should show phone number", () => {
        expect(screen.getByText(cardProps.phone)).toBeInTheDocument();
    });

    it("should show email", () => {
        expect(screen.getByText(cardProps.email)).toBeInTheDocument();
    });

    it("should show image", () => {
        expect(screen.getByAltText(cardProps.image.alt)).toHaveAttribute("src", cardProps.image.url);
    });

    it("should show outlined heart button", () => {
        expect(screen.getByAltText("outlined heart")).toBeInTheDocument();
    });

    it("should show filled heart button", async () => {
        await userEvent.click(screen.getByRole("button"));
        expect(screen.queryByAltText("outlined heart")).not.toBeInTheDocument();
        expect(screen.getByAltText("filled heart")).toBeInTheDocument();
    });

    it("should toggle heart status", async () => {
        await userEvent.click(screen.getByRole("button"));
        expect(screen.queryByAltText("outlined heart")).not.toBeInTheDocument();
        expect(screen.getByAltText("filled heart")).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button"));
        expect(screen.getByAltText("outlined heart")).toBeInTheDocument();
        expect(screen.queryByAltText("filled heart")).not.toBeInTheDocument();
    });
});
