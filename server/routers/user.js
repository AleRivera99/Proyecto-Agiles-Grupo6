const express = require("express")

const UserController = require("../controllers/user")
const multipart = require("connect-multiparty");

const md_auth = require('../middlewares/authenticated')
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" })
const api = express.Router();


// create user
/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: String
 *                  description: the email user
 *              password:
 *                  type: String
 *                  description: the password user
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: usuario@correo.com
 *              password: password
 *      User:
 *          type: object
 *          properties:
 *              Name:
 *                  type: String
 *                  description: the user name
 *              lastname:
 *                  type: String
 *                  description: the user lastname
 *              email:
 *                  type: String
 *                  description: the user email
 *              password:
 *                  type: String
 *                  description: the password user
 *              repeatPassword:
 *                  type: String
 *                  description: the password user
 *              role:
 *                  type: String
 *                  description: the role user
 *          required:
 *              - name
 *              - lastname
 *              - email
 *              - password
 *              - role
 *          example:
 *              name: usuario
 *              lastname: usuario
 *              email: usuario@correo.com
 *              password: password
 *              repeatPassword: password
 *              role: role
 */
/**
 * @swagger
 * /api/sign-up:
 *     post:
 *         summary: Nuevo usuario creado!
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                       type: object
 *                       $ref: '#/components/schemas/User'
 *         responses:
 *             200:
 *                 description: Nuevo usuario creado!
 */
/**
 * @swagger
 * /api/users:
 *     get:
 *         summary: Obtener todos los usuarios!
 *         tags: [User]
 *         responses:
 *             200:
 *                 description: Obtener todos los usuarios!
 *                 content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 *                  
 */
/**
 * @swagger
 * /api/update-user/:id:
 *     put:
 *         summary: Actualizar los usuarios!
 *         tags: [User]
 *         parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: El id del usuario
 *         responses:
 *             200:
 *                 description: Actualizar el usuario!
 *                 content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *                  
 */
/**
 * @swagger
 * /api/delete-user/:id:
 *     delete:
 *         summary: Borrar el usuario!
 *         tags: [User]
 *         parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: El id del usuario
 *         responses:
 *             200:
 *                 description: Borrar el usuarios!
 *                 content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *                  
 */
/**
 * @swagger
 * /api/sign-in:
 *     post:
 *         summary: Inicio de sesion exitoso !
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                       type: object
 *                       $ref: '#/components/schemas/Login'
 *         responses:
 *             200:
 *                 description: Inicio de sesion exitoso !
 */
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-public", UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);
api.put("/upload-avatar/:id", [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);
api.get("/get-avatar/:avatarName", UserController.getAvatar);
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.put("/activate-user/:id", [md_auth.ensureAuth], UserController.activateUser);
api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser)
api.post("/sign-up-admin", [md_auth.ensureAuth], UserController.signUpAdmin);

module.exports = api;