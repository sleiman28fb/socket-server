import { Router,Request,Response} from 'express';
import{mapa} from '../sockets/socket'
import Server from '../clases/server';
import { Socket } from 'socket.io';
import { usuariosconectados } from '../sockets/socket';



const router= Router();



//mapa

router.get('/label',(req:Request,res:Response)=>{

    res.json(mapa.getLabelParadas());

});

router.get('/mapa',(req:Request,res:Response)=>{

    res.json(mapa.getMarcadores());

});

router.get('/rutas',(req:Request,res:Response)=>{

    res.json(mapa.getRoutes());

});

router.get('/paradas',(req:Request,res:Response)=>{

    res.json(mapa.getParadas());

});


router.get('/mensajes',(req:Request,res:Response)=>{

    res.json({
        ok:true,
        mensaje:'Todo esta bien'

    });


});


router.post('/mensajes',(req:Request,res:Response)=>{

    const cuerpo=req.body.cuerpo;
    const de=req.body.de;

    const payload = {
        de,cuerpo
    }

    const server = Server.instance;

    server.io.emit('mensaje-nuevo',payload);




    res.json({
        ok:true,
        cuerpo,
        de

    });


});

router.post('/mensajes/:id',(req:Request,res:Response)=>{

    const cuerpo=req.body.cuerpo;
    const de=req.body.de;
    const id = req.params.id;

    const payload = {
        de,cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',payload);

    res.json({
        ok:true,
        cuerpo, 
        de,
        id

    });


});

router.get('/usuarios',(req:Request,res:Response)=>{

    const server = Server.instance;

server.io.clients((err:any,clientes:string)=>{
    if(err){
        return res.json({
            ok:false,
            err
        })
    }


    res.json({
        ok:true,
        clientes

    });

});
});

///obtener usuarios y sus nombres
router.get('/usuarios/detalle',(req:Request,res:Response)=>{

    


    res.json({
        
        ok:true,
        clientes:usuariosconectados.getLista()

    }); 


});

export default router;