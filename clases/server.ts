 import express from 'express';
import { SERVER_PORT } from '../global/environment';
import soketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';


 
 export default class Server{

    private static _instance:Server;


    public app:express.Application;
    public port:number;
    public io:soketIO.Server;
    private httpServer:http.Server;

    private constructor(){
        this.app=express();
        this.port=SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = soketIO( this.httpServer);
        this.escucharSockets();


    }
    public static get instance(){

        return this._instance || (this._instance= new this());
    }


    private escucharSockets(){

        console.log('escuchando coneciones');
        this.io.on('connection',cliente=>{
          // conectar cliente 

          socket.conectarCliente(cliente);


            // login- configurar usuario 

         socket.usuario(cliente,this.io);

        ///configuracion de mapas

         socket.mapaSockets(cliente,this.io);
         console.log('cliente conectado');
         console.log(cliente.id);

         // descnectar 

         socket.desconectar(cliente);

         // mensajes 

         socket.mensaje(cliente,this.io);

    

        
});

    }

    start(callback:any){
this.httpServer.listen(this.port, callback );

    }

}