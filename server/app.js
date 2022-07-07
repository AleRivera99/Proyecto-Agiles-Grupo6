const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const{API_VERSION} = require('./config');

// Load routings
const authRoutes = require('./routers/auth');
const userRoutes = require("./routers/user");
const dietasRoutes = require("./routers/dieta");
const recetaRoutes = require("./routers/receta");
const ejercicioRoutes = require("./routers/ejercicio");
const path = require("path")
//swagger - documentacion
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Documentacion de API de Sistema de nutricion",
            version: "1.0.0"
        },
        servers:[
            {
                url: "http://localhost:3977"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        }, 
        security: [{
            bearerAuth: [],
        }],
    },
    apis:[`${path.join(__dirname, "./routers/*.js")}`]
}

// middleware documentacion
app.use(express.json())
app.use("/api",dietasRoutes )
app.use("/api",userRoutes )
app.use("/api",recetaRoutes )
app.use("/api-doc",swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
    });

// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, dietasRoutes);
app.use(`/api/${API_VERSION}`, recetaRoutes);
app.use(`/api/${API_VERSION}`, ejercicioRoutes);


module.exports = app;