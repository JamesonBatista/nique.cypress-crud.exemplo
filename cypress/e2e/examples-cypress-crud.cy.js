
import { faker, clone, crudStorage } from "../support/e2e";
describe("First test whit cypress-crud", () => {
  /*
The tests below can be carried out using JSONs,
just create them in the fixtures folder
or within subfolders of the fixtures folder
*/
  it("Test simple /get", () => {
    cy.crud({ get: "https://reqres.in/api/users/2" });
  });
  it("Test simple /get whit description", () => {
    cy.crud({ text: "/get user 2", get: "https://reqres.in/api/users/2" });
  });
  it("Test simple /get whit description validation", () => {
    cy.crud({
      text: "/get user 2",
      get: "https://reqres.in/api/users/2",
      expect: "email",
    });
  });
  it("Test simple /get whit description several validation", () => {
    cy.crud({
      text: "/get user 2",
      get: "https://reqres.in/api/users/2",
      expect: "email, first_name",
    });
  });
  it("Test equal", () => {
    cy.crud({
      text: "/get user 2",
      get: "https://reqres.in/api/users/2",
      expect: "first_name === Janet",
    });
    cy.crud({
      text: "/get user 2",
      get: "https://reqres.in/api/users/2",
      expect: "id === 2",
    });
  });
  it("get variable cypress.env.json", () => {
    cy.crud({ get: "reqres_all" });

    cy.crud({ get: "reqres_all/7" });
    cy.crud({
      get: "reqres_all/7",
      schema: {
        $schema: "http://json-schema.org/draft-04/schema#",
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              email: {
                type: "string",
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              avatar: {
                type: "string",
              },
            },
            required: ["id", "email", "first_name", "last_name", "avatar"],
          },
          support: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
              text: {
                type: "string",
              },
            },
            required: ["url", "text"],
          },
        },
        required: ["data", "support"],
      },
    });
  });
  it("/POST tips", () => {
    // visit https://jamesonbatista.github.io/doc.cypress.crud/examplesTest.html to learn how to use it this way
    cy.crud({
      t: "testamdp",
      p: "reqres_all",
      b: {
        name: "faker.name",
        job: "faker.professional",
        email: "faker.email",
      },
      e: "id, name, job, email",
      s: "id",
    });
  });
  it('/GET tips easy', () => {
      cy.crud({g:"reqres"})
      
  });
    it("complete crud tips cypress-crud", () => {
    /*
    format crud
    POST = create =  c
    GET = read =     r
    PUT = uptade =   u
    DELETE = delete= d
    */
    cy.crud([
      // GET read
      {
        r: "https://fakestoreapi.com/products",
      },
      // POST created
      {
        c: "{url}", // {url} use the previous url https://fakestoreapi.com/products
        b: {
          title: "faker.name",
          price: 13.5,
          description: "faker.text",
          image: "https://i.pravatar.cc",
          category: "faker.professional",
        },
        st: 200,
        s: "id",
      },
      // GET read id
      { r: "{url}/{id}" },
      // PUT update
      {
        u: "{url}", // {url} use the previous url https://fakestoreapi.com/products/21
        b: {
          title: "faker.name",
        },
      },
      // DELETE delete
      { d: "{url}" },
    ]);
  });
});

