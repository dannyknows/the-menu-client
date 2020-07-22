import { userBuilder } from "../support/generate";

describe("when clicking on login from the homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.findByTestId(/login/).click();
    cy.findByText(/Login/i).click();
  });

  it("should be able to type into email and password inputs", () => {
    const { email, password } = userBuilder()
    cy.findByLabelText(/email/i).type(email).should("contain.value", email)
    cy.findByLabelText(/password/i).type(password).should("contain.value", password)
  })

  it("should be redirected to /dashboard and have a JWT in local storage", () => {
    cy.url().should("eq", "http://localhost:8080/dashboard");
    cy.window().its("localStorage.token").should("be.a", "string");
  })
});