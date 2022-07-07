const express = require("express")

const dietaController = require("../controllers/dieta")
const multipart = require("connect-multiparty");

const md_auth = require('../middlewares/authenticated')
const md_upload_dieta = multipart({uploadDir: "./uploads/dieta"})
const api = express.Router();

// create Dieta
/**
 * @swagger
 *  components:
 *      schemas:
 *          Dieta:
 *              type: object
 *              properties:
 *                  Name:
 *                      type: String
 *                      description: the dieta name
 *                  desayuno:
 *                      type: String
 *                      description: the dieta desayuno
 *                  almuerzo:
 *                      type: String
 *                      description: the dieta almuerzo
 *                  cena:
 *                      type: String
 *                      description: the dieta cena
 *                  bebida:
 *                      type: String
 *                      description: the dieta bebida
 *                  tiempo:
 *                      type: String
 *                      description: the dieta tiempo
 *                  calorias:
 *                      type: String
 *                      description: the dieta calorias
 *              required:
 *                  - name
 *                  - descripcion
 *                  - desayuno
 *                  - almuerzo
 *                  - cena
 *                  - bebida
 *                  - tiempo
 *                  - calorias
 *              example:
 *                  name: dieta
 *                  descripcion: descripcion
 *                  desayuno: desayuno
 *                  almuerzo: almuerzo
 *                  cena: cena
 *                  bebida: rbebidaole
 *                  tiempo: tiempo
 *                  calorias: calorias
 * 
 */
/**
 * @swagger
 * /api/crear-dieta:
 *     post:
 *         summary: Nueva dieta creada!
 *         tags: [Dieta]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                       type: object
 *                       $ref: '#/components/schemas/Dieta'
 *         responses:
 *             200:
 *                 description: Nueva dieta creada!
 */
/**
 * @swagger
 * /api/dietas:
 *     get:
 *         summary: Obtener todas las dietas!
 *         tags: [Dieta]
 *         security:
 *              - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Obtener todas las dietas!
 *                 content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Dieta'
 *                  
 */
/**
 * @swagger
 * /api/update-dieta/:id:
 *     put:
 *         summary: Actualizar la dieta!
 *         tags: [Dieta]
 *         parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: El id de la dieta
 *         security:
 *              - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Actualizar la dieta!
 *                 content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Dieta'
 *                  
 */
/**
 * @swagger
 * /api/delete-dieta/:id:
 *     delete:
 *         summary: Borrar la dieta!
 *         tags: [Dieta]
 *         parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: El id de la dieta
 *         security:
 *              - bearerAuth: []
 *         responses:
 *             200:
 *                 description: Borrar la dieta!
 *                 content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Dieta'
 *                  
 */
api.post("/crear-dieta",[md_auth.ensureAuth], dietaController.createDieta);
api.get("/dietas", dietaController.getDietas);
api.delete("/delete-dieta/:id", [md_auth.ensureAuth], dietaController.deleteDieta)
api.put("/upload-avatar-dieta/:id",[md_auth.ensureAuth, md_upload_dieta], dietaController.uploadDieta);
api.get("/get-avatar-dieta/:avatarName", dietaController.getAvatarDieta);
api.put("/update-dieta/:id", [md_auth.ensureAuth], dietaController.updateDieta);

module.exports = api;