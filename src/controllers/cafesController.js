

import cafes from "../../cafes.json"
//console.log(cafes)

export const getAllcontroller = (req, res) => {
    res.status(200).send(cafes)
}

export const getByIdcontroller = (req, res) => {
    const { id } = req.params
    const cafe = cafes.find(p => p.id == id)
    if (cafe) res.status(200).send(cafe)
    else res.status(404).send({ message: "No se encontró ningún producto con ese id" })
}

export const createcontroller = (req, res) => {
    const cafe = req.body
    const { id } = cafe
    const existeUnProductoConEseId = cafes.some(p => p.id == id)
    if (existeUnProductoConEseId) res.status(400).send({ message: "Ya existe un producto con ese id" })
    else {
        cafes.push(cafe)
        //res.send(cafes)
        res.status(201).send(cafe);

    }
}

export const updatecontroller = (req, res) => {
    const cafe = req.body;
    const { id } = req.params;
    if (id!= cafe.id)
        return res
          .status(400)
          .send({
                message: "El id del parámetro no coincide con el id del producto recibido",
            });

            const cafeIndexFound = productos.findIndex((p) => p.id == id);
            if (cafeIndexFound >= 0) {
                cafes[cafeIndexFound] = cafe;
                res.send(cafes);
            } else {
                res
                    .status(404)
                    .send({ message: "No se encontró ningún café con ese id" });
            }
        };

        export const deletecontroller = (req, res) => {
            const jwt = req.header("Authorization")
            if (jwt) {
                const { id } = req.params
                const cafeIndexFound = cafes.findIndex(c => c.id == id)
        
                if (cafeIndexFound >= 0) {
                    cafes.splice(cafeIndexFound, 1)
                    console.log(cafeIndexFound, cafes)
                    res.send(cafes)
                } else {
                    res.status(404).send({ message: "No se encontró ningún cafe con ese id" })
                }
        
            } else res.status(400).send({ message: "No recibió ningún token en las cabeceras" })
        }

        export const notFound = async (req, res) => {
            res.status(404).json({ error: "NOT FOUND" });
          };