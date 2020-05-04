import { Router,Request,Response} from 'express';
import{mapa} from '../sockets/socket'
import Server from '../clases/server';



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


    res.json({
        ok:true,
        cuerpo, 
        de,
        id

    });


});

export default router;