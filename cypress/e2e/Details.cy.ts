import "@testing-library/cypress/";

describe("Details page", () => {
  it("Should contain the details of pokemon", () => {
    cy.visit("/detalhes/pikachu");

    const name = cy.findByTestId("details_name");
    const image = cy.findByTestId("details_img");
    const stats = cy.findByTestId("details_stats");
    const statsAdvanced = cy.findByTestId("details_stats_advanced");
    const evolutionsList = cy.findByTestId("details_evolutions");

    name.should("be.visible");
    image.should("be.visible");
    stats.should("be.visible");
    evolutionsList.should("be.visible");

    image.click();
    statsAdvanced.should("be.visible");
  });

  it("Should contain an alert", () => {
    cy.visit("/detalhes/maikaodev");

    const name = cy.findByTestId("details_name");
    const image = cy.findByTestId("details_img");
    const stats = cy.findByTestId("details_stats");
    const statsAdvanced = cy.findByTestId("details_stats_advanced");
    const evolutionsList = cy.findByTestId("details_evolutions");

    name.should("not.be.visible");
    image.should("not.be.visible");
    stats.should("not.be.visible");
    statsAdvanced.should("not.be.visible");
    evolutionsList.should("not.be.visible");

    const alert = cy.findByTestId("alert");
    const message = cy.findByTestId("alert_message");
    const routerLink = cy.findByTestId("alert_link");

    alert.should("exist").and("be.visible");
    message.contains("Desculpe, nada foi encontrado...");
    routerLink.contains("Página Inicial");
  });

  it("Should go back to home", () => {
    cy.visit("/detalhes/maikaodev");
    const routerLink = cy.findByTestId("alert_link");

    routerLink.click();

    cy.url().should("eq", "http://localhost:5173/");
  });
});

export { };

