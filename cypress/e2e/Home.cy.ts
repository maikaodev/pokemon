import "@testing-library/cypress/";

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should have a menu navigation", () => {
    const menu = cy.findByTestId("menu_navigation");
    const icon = cy.findByTestId("menu_navigation_icon");
    const itemInList = cy.findByTestId("menu_navigation_item");

    const menuNavigation = [menu, icon, itemInList];

    menuNavigation.forEach((item) => {
      item.should("exist").and("be.visible");
    });
  });

  it("Should have a form", () => {
    const form = cy.findByTestId("form");
    const input = cy.findByPlaceholderText("Encontre seu pokémon");
    const button = cy.findByTestId("form_button");

    const menuNavigation = [form, input, button];

    menuNavigation.forEach((item) => {
      item.should("exist").and("be.visible");
    });

    button.should("be.enabled").and("have.prop", "type", "submit");
  });

  it("Should have a card", () => {
    const button = cy.findByTestId("form_button");
    const input = cy.findByTestId("form_input");

    const card = cy.findByTestId("card");
    const image = cy.findByTestId("card_img");
    const name = cy.findByTestId("card_pokename");

    input.type("pikachu");
    button.click();
    const type = cy.findByTestId("card_poketype");

    card.should("exist").and("be.visible");
    image.should("exist").and("be.visible");

    name.contains("Pikachu");
    type.contains("electric");
  });

  it("Should have a message:'Desculpe, nada foi encontrado...'", () => {
    const button = cy.findByTestId("form_button");
    const input = cy.findByTestId("form_input");

    input.type("123456789");
    button.click();

    const alert = cy.findByTestId("alert");
    const message = cy.findByTestId("alert_message");

    alert.should("exist").and("be.visible");
    message
      .should("exist")
      .and("be.visible")
      .contains("Desculpe, nada foi encontrado...");
  });

  it("Going to details page", () => {
    const button = cy.findByTestId("form_button");
    const input = cy.findByTestId("form_input");

    input.type("pikachu");
    button.click();

    const card = cy.findByTestId("card");

    card.click();

    cy.url().should("eq", "http://localhost:5173/detalhes/pikachu");
  });
});

export {};
