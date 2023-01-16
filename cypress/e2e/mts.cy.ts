describe("Site-uri MTS", () => {
  it("www.aut.upt.ro", () => {
    cy.visit("https://www.aut.upt.ro/");
    cy.get("#menu").contains("Despre noi").should("exist");
    cy.get("#menu a")
      .last()
      .then(($a) => {
        cy.wrap($a).should("have.attr", "href").and("equal", "contact.php");
        cy.wrap($a).click();
      });
    cy.contains("Secretariat Departament").should("exist");
    cy.get(".search_input").type("IS");
    cy.get(".search_button").click(); // this will fail because the site is not configured properly
  });
  it("https://www.cs.upt.ro/", () => {
    cy.visit("https://www.cs.upt.ro/");
    cy.get(".site-name > a").then(($a) => {
      cy.wrap($a).should("have.attr", "title").and("equal", "Home");
      cy.wrap($a).and(
        "contain.text",
        "Department of Computer and Information Technology"
      );
    });
    cy.get(".menu > li > a").first().click();
    cy.url().should("include", "/about");
    cy.get(".site-name > a").click();
    cy.url().should("equal", "https://www.cs.upt.ro/");
  });
  it("http://williamshakespeare.ro/", () => {
    cy.visit("http://williamshakespeare.ro/");
    cy.get(".main-title a")
      .should("have.attr", "href")
      .and("equal", "http://williamshakespeare.ro/");
    cy.get("#menu-item-109")
      .trigger("mouseover")
      .find("ul > li")
      .first()
      .click();
    cy.url().should("include", "/istoric");
    cy.get(".main-title a").click();
    cy.url().should("equal", "http://williamshakespeare.ro/");
    const keyword = "Admitere";
    cy.get(".search-field")
      .eq(1)
      .type(keyword + "{enter}");
    cy.get(".page-header").find("h1").should("include.text", keyword);
    cy.get(".entry-title").should("include.text", "Înscriere Gimnaziu");
  });
  it("https://drept.uvt.ro/", () => {
    cy.visit("https://drept.uvt.ro/");
    cy.get(".navbar-nav > li")
      .first()
      .then(($li) => {
        cy.wrap($li).trigger("mouseover");
        cy.wrap($li).find(".menu > li").first().click();
      });
    cy.url().should("include", "/prezentare-facultate.html");
    cy.get(".page-title").should("include.text", "Prezentare facultate");
    cy.get(".logo").find("a").click();
    cy.url().should("equal", "https://drept.uvt.ro/");
  });
});
