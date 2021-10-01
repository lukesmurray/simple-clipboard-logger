/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
Cypress.Commands.add("mockIndex", (fixturePath, as) => {
  return cy.readFile(`cypress/fixtures/${fixturePath}`, "utf8").then((stubResponse) => {
    cy.intercept("index.js", (req) => {
      req.reply(stubResponse);
    }).as(as === undefined ? "mockIndex" : "as");
  });
});

before(() => {
  // spy on the console
  Cypress.on("window:before:load", (win) => {
    cy.spy(win.console, "log");
  });
});

beforeEach(() => {
  // disable the network cache
  Cypress.automation("remote:debugger:protocol", {
    command: "Network.clearBrowserCache",
  });
});

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    mockIndex(fixturePath: string, as?: string): Chainable;
  }
}
