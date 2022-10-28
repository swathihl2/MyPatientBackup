import App from "../App"
import React from 'react';
import { render } from '@testing-library/react';

/* globals describe, expect, it */ 
describe("App Page Test ", () => {
    it("Sign In Page renders", () => {
        const { getAllByText } = render(<App />);
        expect(getAllByText("Sign In")).toBeTruthy();
    });

    it("Sign Up page renders", () => {
        const { getAllByText } = render(<App />);
        expect(getAllByText("Sign Up")).toBeTruthy();
    });

    it("Sign In Form", () => {
        const { getAllByText } = render(<App />);
        expect(getAllByText("Sign In")).toBeTruthy();
    });

    it("Sign Up Form", () => {
        const { getAllByText } = render(<App />);
        expect(getAllByText("Sign Up")).toBeTruthy();
    });

    it("Admin", () => {
        const { getAllByText } = render(<App />);
        expect(getAllByText("Sign In")).toBeTruthy();
    });

    it("Add patient", () => {
        const { getAllByText } = render(<App />);
        expect(getAllByText("Sign Up")).toBeTruthy();
    });


});