const express = require("express"); 
const router = require("../server/routes/router"); // Import file we are testing
const request = require("supertest"); // "supertest" is a framework that allows to easily test web APIs
const app = express(); // An instance of an express app, that is a 'fake' express app

app.use("/", router); // Routes

jest.setTimeout(30000);

describe("testing-server-routes", () => {
    it("GET /action/mockItem - success", async () => {
        let response = (await request(app).get("/action/mockItem")).text;
        expect(response).toBeTruthy();
    })

    it("GET /action/mockPayment - success", async () => {
        let response = (await request(app).get("/action/mockPayment")).text;
        expect(response).toBeTruthy();
    })
    
    it("GET /action/mockUser - success", async () => {
        let response = (await request(app).get("/action/mockUser")).text;
        expect(response).toBeTruthy();
    })
})