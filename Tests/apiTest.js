const { describe, it } = require("mocha");
const { expect } = require("chai");

let token;

describe("API Automation Homework", function () {
  
  it("Valid Login", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    const data = await response.json();
    token = data.token; 
    expect(response.status).to.equal(200); 
  });


  it("Verify first username", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data.users[1].username).to.equal("Rafis");

  });


  it("Add user with valid data", async function () {
  const response = await fetch(
    "https://belajar-bareng.onrender.com/api/add-user",
    {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        username: "Misako",
        age: 34,
      }),
    }
  );

  const data = await response.json();

  expect(response.status).to.equal(201);
  expect(data.message).to.equal("User successfully added, Hi Misako!");
});


  it("Add user with empty data", async function () {
  const response = await fetch(
    "https://belajar-bareng.onrender.com/api/add-user",
    {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        username: "",
        age: "",
      }),
    }
  );

  const data = await response.json();

  expect(response.status).to.equal(400);
  expect(data.error).to.equal("Missing username or age");
});

});
