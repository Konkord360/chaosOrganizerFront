/// <reference types="cypress" />

// import Chance from 'chance';
// const change = new Chance;

describe("chaosOrganizer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("has a title", () => {
    cy.contains("Chaos Organizer");
  });

  it("can cancel add action", () => {
    cy.get("thead > tr > :nth-child(1) > .btn").click();
    cy.should("contain", "Add payment");

    cy.get("button[name='cancel']").click();
    
    cy.get(".addNewPaymentWindow").should('not.exist');
  });

  it("can cancel modification action", () => {
    cy.get(":nth-child(1) > [name='test']").click();
    cy.contains("Modify payment");


    cy.get("button[name='cancel']").click();

    cy.get(".addNewPaymentWindow").should('not.exist');
  });

  it("can add payment", () => {
    cy.get("thead > tr > :nth-child(1) > .btn").click();
    cy.should("contain", "Add payment");

    cy.get("input[name=paymentName]").clear().type("ADDNAME");
    cy.get("input[name=paymentAmount]").clear().type(1000);
    cy.get("input[name=whole]").clear().type(100000);
    cy.get("input[name=deadline]").clear().type("2025-12-23");
    cy.get("input[name=receiverIBAN]").clear().type("ADDRECEIVERIBAN");
    cy.get("input[name=receiverName]").clear().type("ADDRECEIVERNAME");
    cy.get("input[name=senderIBAN]").clear().type("ADDSENDERIBAN");
    cy.get("input[name=payedByNow]").clear().type(10000);

    cy.get("button[type=submit]").click();

    cy.get(':nth-child(3) > [name="test"]').should("contain", "ADDNAME");
  });

  it("can modify payment", () => {
    cy.get(":nth-child(3) > :nth-child(1) > .btn").click();
    cy.contains("Modify payment");

    cy.get("input[name=paymentName]").clear().type("CYPRESSTESTNAME");
    cy.get("input[name=paymentAmount]").clear().type(1000);
    cy.get("input[name=whole]").clear().type(100000);
    cy.get("input[name=deadline]").clear().type("2025-12-23");
    cy.get("input[name=receiverIBAN]").clear().type("CYPRESSTESTRECEIVERIBAN");
    cy.get("input[name=receiverName]").clear().type("CYPRESSTESTRECEIVERNAME");
    cy.get("input[name=senderIBAN]").clear().type("CYPRESSTESTSENDERIBAN");
    cy.get("input[name=payedByNow]").clear().type(10000);

    cy.get("button[type=submit]").click();
    cy.get(':nth-child(3) > [name="test"]').should(
      "contain",
      "CYPRESSTESTNAME"
    );
  });

  it("can delete payment", () => {
    cy.get(":nth-child(3) > :nth-child(1) > .btn").click();
    cy.contains("Modify payment");

    cy.get("button[name=delete]").click();
    cy.get(':nth-child(3) > [name="test"]').should("not.exist");
  });
});
