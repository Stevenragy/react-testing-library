import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Filter from "../Filter";

describe("Filter", () => {
    beforeEach(() => {
        render(<Filter />);
    });

    it("should be able to change value from favourite select", async () => {
        const select = screen.getByLabelText("Favourite");
        expect(select).toHaveValue("any");
        await UserEvent.selectOptions(select, "favoured");
        expect(select).toHaveValue("favoured");
        await UserEvent.selectOptions(select, "not favoured");
        expect(select).toHaveValue("not favoured");
    });
});
