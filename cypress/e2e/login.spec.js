describe("with the correct login credentials user", () => {
  before(() => {
    cy.fixture("user.json").then((user) => {
      cy.visit("/login")
      cy.findByLabelText(/email/i).type(user.email)
      cy.findByLabelText(/password/i).type(user.password)
    })
  });
      
  it("should be able to click on submit and be navigated to /bookmarks", () => {
    cy.get("form").submit()
    cy.url().should('eql', "http://localhost:8080/dashboard")
  });
      
  after(() => {
    // we need to clean up after we run the tests
    window.localStorage.removeItem("token")
    window.sessionStorage.removeItem("auth")
  })
});
