import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {

    let unMount: () => void = () => { };

    beforeEach(() => {
        const { unmount } = render(<Router><App /></Router>);

        unMount = unmount;
    });

    it("renders the required components", () => {
        expect(screen.getByTestId("title")).toBeInTheDocument();
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
