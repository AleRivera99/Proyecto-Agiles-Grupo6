const express = require("express")

const recetaController = require("../controllers/receta")
const multipart = require("connect-multiparty");

const md_auth = require('../middlewares/authenticated')
const md_upload_dieta = multipart({uploadDir: "./uploads/receta"})
const api = express.Router();
// create Recetas
/**
 * @swagger
 *  components:
 *      schemas:
 *          Recetas:
 *              type: object
 *              properties:
 *                  name:
 *                      type: String
 *                      description: the receta Recetas
 *                  descripcion:
 *                      type: String
 *                      description: the receta descripcion
 *                  desayuno:
 *                      type: String
 *                      description: the receta desayuno
 *                  almuerzo:
 *                      type: String
 *                      description: the receta almuerzo
 *                  cena:
 *                      type: String
 *                      description: the receta cena
 *                  bebida:
 *                      type: String
 *                      description: the receta bebida
 *                  tiempo:
 *                      type: String
 *                      description: the receta tiempo
 *              required:
 *                  - name
 *                  - descripcion
 *                  - desayuno
 *                  - almuerzo
 *                  - cena
 *                  - bebida
 *                  - tiempo
 *              example:
 *                  name: name
 *                  descripcion: descripcion
 *                  desayuno: desdesayunoayuno
 *                  almuerzo: almuerzo
 *                  cena: cena
 *                  bebida: bebida
 *                  tiempo: tiempo
 * 
 */
/**
 * @swagger
 * /api/crear-receta:
 *     post:
 *         summary: Nueva receta creada!
 *         tags: [Recetas]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                       type: object
 *                       $ref: '#/components/schemas/Recetas'
 *         responses:
 *             200:
 *                 description: Nueva receta creada!
 */
/**
 * @swagger
 * /api/recetas:
 *     get:
 *         summary: Obtener todas las recetas!
 *         tags: [Recetas]
 *         security:
 *              - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Obtener todas las recetas!
 *                 content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Recetas'
 *                  
 */
/**
 * @swagger
 * /api/update-receta/:id:
 *     put:
 *         summary: Actualizar la receta!
 *         tags: [Recetas]
 *         parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: El id de la receta
 *         security:
 *              - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Actualizar la receta!
 *                 content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Recetas'
 *                  
 */
/**
 * @swagger
 * /api/delete-receta/:id:
 *     delete:
 *         summary: Borrar la receta!
 *         tags: [Recetas]
 *         parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: El id de la receta
 *         security:
 *              - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Borrar la receta!
 *                 content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Recetas'
 *                  
 */

api.post("/crear-receta",[md_auth.ensureAuth], recetaController.createReceta);
api.get("/recetas", recetaController.getRecetas);
api.delete("/delete-receta/:id", [md_auth.ensureAuth], recetaController.deleteReceta)
api.put("/upload-avatar-receta/:id",[md_auth.ensureAuth, md_upload_dieta], recetaController.uploadReceta);
api.get("/get-avatar-receta/:avatarName", recetaController.getAvatarReceta);
api.put("/update-receta/:id", [md_auth.ensureAuth], recetaController.updateReceta);

module.exports = api;