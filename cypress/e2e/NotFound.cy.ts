import "@testing-library/cypress/";

describe("Not found page", () => {
  it("Should go from home to not found", () => {
    cy.visit("/asddikachu");

    const alert = cy.findByTestId("alert");
    const message = cy.findByTestId("alert_message");

    alert.should("exist").and("be.visible");
    message.should("exist").and("be.visible").contains("Página não encontrada");
  });

  it("Should go from details to not found", () => {
    cy.visit("/detalhes/pikachu/anything");

    const alert = cy.findByTestId("alert");
    const message = cy.findByTestId("alert_message");

    alert.should("exist").and("be.visible");
    message.should("exist").and("be.visible").contains("Página não encontrada");
  });
});

export {};
