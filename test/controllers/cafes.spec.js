import request from "supertest";
//import { deletecontroller } from "../../src/controllers/cafesController.js";
import app from "../../server.js";

import { faker } from "@faker-js/faker";

describe("Operaciones CRUD de cafes", () => {
  it("should return a status code 200 and an array with at least one object", async () => {
    const response = await request(app).get("/cafes").send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
  describe("DELETE /cafes/:id", () => {
    it("should return a 404 status when trying to update a non-existent product", async () => {
      const nonExistentId = faker.string.uuid();
      //generar un token falso
      const token = faker.string.alphanumeric();
      const deletedProduct = {
        id: nonExistentId, // Utiliza el ID no existente
        token: token,
      };
      const response = await request(app)
        .delete("/cafes:id")
        .send(deletedProduct);
      expect(response.status).toBe(404);
    });
  });
  //////////////////////////////////////////////////////////////////////////////////////

  /*  it('Deleting non-existent coffee should return status 404', () => {
      const req = {
        header: () => 'token', // Simular token presente
        params: { id: 'id_invalido' } // Simular ID inválido
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      deletecontroller(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "No se encontró ningún cafe con ese id" });
    }); */

  describe("POST /cafes", () => {
    it("devuelve estado 201 al agregar un nuevo café", async () => {
      const newCafe = {
        id: faker.string.uuid(),
        name: faker.string.username,
      };

      const response = await request(app).post("/cafes").send(newCafe);

      expect(response.status).toBe(201);
    });
  });

  describe("PUT /cafes", () => {
    it("should return a 400 status when trying to update a non-existent product", async () => {
      const nonExistentId = faker.string.uuid();
      // Genera un ID único con Faker
      const updatedProduct = {
        id: nonExistentId, // Utiliza el ID no existente
        name: "espresso",
      };
      const response = await request(app).put("/cafes").send(updatedProduct);
      expect(response.status).toBe(400);
    });
  });
});
