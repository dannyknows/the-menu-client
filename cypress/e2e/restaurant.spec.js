import { userBuilder, restaurantBuilder } from "../support/generate";

describe("when making a new restaurant", () => {
  beforeEach(() => {
      const user = userBuilder();
      cy.visit("/");
      cy.findByText(/Sign Up/i).click();
      cy.findByLabelText(/Email/).type(user.email);
      cy.findByLabelText(/Password/).type(user.password);
      cy.findByLabelText(/Full Name/).type(user.full_name);
      cy.findByText(/Submit/).click();
  });

  it("should be able to submit the form", () => {
    const restaurant = restaurantBuilder();
    cy.wait(500);
    cy.findByTestId(/name/i).type(restaurant.name);
    cy.get("form").submit();
    cy.findByTestId(/title/).type("test").should("contain.value", "test");
  });

  after(() => {
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("auth");
  });
});
