import Server from './clases/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors'

const server = Server.instance;



//body parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//cors
server.app.use(cors({origin: true, credentials:true}) );

//Rutas de servicios
server.app.use('/',router);

server.start(()=>{
   console.log(`Servidor esta corriendo en el puerto ${server.port}`);
});