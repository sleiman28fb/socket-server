import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Mapa } from '../clases/mapa';
import { Marcador } from '../clases/marcador';

export const mapa = new Mapa();


export const desconectar = (cliente:Socket)=>{

cliente.on('disconnect', ()=>{
    console.log('cliente desconectado');
});

}

// escuchar mensajes 
export const mensaje = (cliente: Socket,io:socketIO.Server)=>{
cliente.on('mensaje', (payload:{de:string,cuerpo:string})=>{
    console.log('mensje recibido', payload);

    io.emit('mensaje-nuevo', payload);
});
}

/////Eventos Mapas 

export const mapaSockets=(cliente:Socket,io:socketIO.Server)=>{

    cliente.on('marcador-nuevo', (marcador:Marcador)=>{

        mapa.agregarMarcador(marcador);

        cliente.broadcast.emit('marcador-nuevo', marcador);

    });


    cliente.on('marcador-borrar', (id:string)=>{

        mapa.borrarmarcador(id);

        cliente.broadcast.emit('marcador-borrar', id);

    });

    cliente.on('marcador-mover', (marcador)=>{

        mapa.moverMarcador(marcador);

        cliente.broadcast.emit('marcador-mover', marcador);

    });
}