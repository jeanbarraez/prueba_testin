import request from "supertest";
//import { deletecontroller } from "../../src/controllers/cafesController.js";
import app from "../../server.js";

import { faker } from "@faker-js/faker";

describe("Operaciones CRUD de cafes", () => {
  it("should return a status code 200 and an array with at least one object", async () => {
    const response = await request(app).get("/cafes").send(); //utiliza la función request de Supertest para realizar una solicitud GET a la ruta /cafes
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); //verifica si el valor proporcionado es un arreglo. Si el valor es un arreglo,
    //la función devuelve true; de lo contrario, devuelve false
    expect(response.body.length).toBeGreaterThanOrEqual(1); //toBeGreaterThanOrEqual compara lo recido >= esperado para valores numericos y que tenga 1 objeto
    //la prueba está verificando que la respuesta de la solicitud a la ruta /cafes contenga al menos un objeto en forma de arreglo.
    //Si la longitud del arreglo en la respuesta es 1 o más, la prueba pasará; de lo contrario, fallará
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
