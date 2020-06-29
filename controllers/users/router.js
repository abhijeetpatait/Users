let Router = require('router');
let router = new Router();
let user = require('./User');

router.get('/', async function(req, res){
    let response = await user.all();
    if(response.error){
        response = { 
            data: response, 
            code: 301
        }
    }else{
        response = { 
            data: response, 
            code: 200
        }
    }
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(response));
});

router.post('/create', async function(req, res){
    
    // return console.log('I\'m Batman!');
    let response = await user.create(req.body);
    
    if(response.error){
        response={
            data: response,
            code:301
        }
    }else{
        response={
            data: response,
            code: 200
        }
    }
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(response));
});

router.post('/login', async function(req, res){
    
    // return console.log('I\'m Batman!');
    let response = await user.login(req.body);
    
    if(response.error){
        response={
            data: response,
            code:301
        }
    }else{
        response={
            data: response,
            code: 200
        }
    }
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(response));
});


router.get('/user/:userId', async function(req,res){
    let response = await user.fetchID(req.params.userId);
    if(response.error){
        response={
            data: response,
            code:301
        }
    }else{
        response={
            data: response,
            code: 200
        }
    }
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(response));
});

module.exports = router;
