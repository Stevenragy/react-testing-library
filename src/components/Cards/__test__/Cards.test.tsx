import { render, screen } from "@testing-library/react";
import Cards from "../Cards";
import cats from "../../../mocks/cats.json";

describe("cards", () => {
    beforeEach(() => {
        render(<Cards cats={cats} />);
    });

    it("should render 5 cards", () => {
        expect(screen.getAllByRole("article").length).toBe(5);
    });
});
