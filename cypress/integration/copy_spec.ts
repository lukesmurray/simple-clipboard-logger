// spy on the console

describe("Home Page", () => {
  it("Successfully loads", () => {
    cy.visit("/");
  });

  it("Successfully Mocks the Simple Logger Script", () => {
    // mock the index script
    cy.mockIndex("mockIndexTest.js");
    cy.visit("/");
    cy.window().then((win) => {
      expect(win.console.log).to.be.calledWith("foo");
    });
  });

  it("Successfully Logs to the Console", () => {
    // mock the index script
    cy.mockIndex("mockClipboardConsole.js");
    cy.visit("/");
    cy.window().then((win) => {
      expect(win.console.log).to.be.calledWith("foo");
    });
  });
});
