import { userBuilder } from "../support/generate";

describe("when signing up user", () => {
  it("should be redirected to /restaurant/new and have a JWT in local storage", () => {
    const user = userBuilder();
    cy.visit("/");
    cy.findByText(/Sign Up/i).click();
    cy.findByLabelText(/Email/).type(user.email);
    cy.findByLabelText(/Password/).type(user.password);
    cy.findByLabelText(/Full Name/).type(user.full_name);
    cy.findByText(/Submit/).click();
    cy.url().should("eq", "http://localhost:8080/dashboard/new");
    cy.window().its("localStorage.token").should("be.a", "string");
  });
});