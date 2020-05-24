import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Mapa } from '../clases/mapa';
import { Marcador } from '../clases/marcador';
import { Usuariolista } from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuarios';


export const mapa = new Mapa();
export const usuariosconectados = new Usuariolista();

export const conectarCliente = (cliente:Socket)=>{
    const usuario = new Usuario(cliente.id);
    usuariosconectados.agregar(usuario);
}

export const desconectar = (cliente:Socket)=>{

cliente.on('disconnect', ()=>{
    console.log('cliente desconectado');
    usuariosconectados.borrarUsuario(cliente.id);
});

}

// escuchar mensajes 
export const mensaje = (cliente: Socket,io:socketIO.Server)=>{

    cliente.on('mensaje', (payload:{de:string,cuerpo:string})=>{
    console.log('mensaje recibido', payload);

    io.emit('mensaje-nuevo', payload);
});
}

export const usuario = (cliente: Socket,io:socketIO.Server)=>{

    cliente.on('configurar-usuario', (payload:{nombre:string},callback:Function)=>{
    console.log('configurar-usuario', payload.nombre);

    usuariosconectados.actualizarNombre(cliente.id,payload.nombre)
    callback({
        ok:true,
        mensaje:`usuario ${payload.nombre}, configurado`
    });

  //  io.emit('mensaje-nuevo', payload);
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