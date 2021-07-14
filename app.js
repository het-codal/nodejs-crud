const express = require('express')
const app = express();
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require('./swagger.json');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const cors = require('cors');
/**Router*/
const userRouter = require('./Route/user.routes')
const authRouter = require('./Route/auth.routes')

app.use(express.json())
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerDocument)));

app.use(jwt());
app.use('/api/users', userRouter)
app.use('/api/login', authRouter)

app.use(errorHandler);
const PORT = 8000

app.listen(
    PORT, 
    console.log('Port is running:'+`${PORT}`)
);

mongoose.connect(
    'mongodb://localhost:27017/usermanagement',
    {useNewUrlParser: true,  useUnifiedTopology: true}
).catch(err => console.log(err))