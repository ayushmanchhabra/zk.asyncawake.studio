import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import Zettel from "./Zettel";

describe("Zettel", () => {

    let unMount: () => void = () => { };

    beforeEach(() => {
        const { unmount } = render(<Router><Zettel /></Router>);

        unMount = unmount;
    });

    it("renders the required components", () => {
        expect(screen.getByTestId("content")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
        expect(screen.getByTestId("save")).toBeInTheDocument();
        expect(screen.getByTestId("qr")).toBeInTheDocument();
        expect(screen.getByTestId("overlay")).toBeInTheDocument();
    });

    afterEach(() => {
        unMount();
    });

});
