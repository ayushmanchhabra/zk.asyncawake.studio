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

    it("renders hello world text", () => {
        expect(screen.getByTestId("textarea")).toBeInTheDocument();
    });

    afterEach(() => {
        unMount();
    });

});
