import { render, screen } from "@testing-library/react";
import Pets from "../Pets";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import catsMocks from "../../../mocks/cats.json";

const server = setupServer();
http.get("http://localhost:4000/cats", () => {
    return HttpResponse.json(catsMocks);
});
describe("Pets", () => {
    beforeEach(() => {
        server.listen();
        render(<Pets />);
    });
    afterEach(() => server.restoreHandlers());
    afterAll(() => {
        server.close();
    });

    it("should render 5 cards", async () => {
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toBe(5);
    });
});
