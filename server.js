import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Farmer from './models/Farmer';
import Enterprise from './models/Enterprise';
import FarmerREQ from './models/FarmerREQ';
import EnterpriseREQ from './models/EnterpriseREQ';
import Admin from './models/Admin';
import Nursery from './models/Nursery';
import Seedling from './models/Seedling';
import Product from './models/Product';
import Warning from './models/Warning';
import Offer from './models/Offers';
import Order from './models/Order';
import Comment from './models/Comment';
import Business from './models/Business';

const app = express();
const router = express.Router();

var nodemailer = require('nodemailer');


app.use(cors());
app.use(bodyParser.json());

setInterval( () => {
    Nursery.find({ flag:`1` }, (err, nurse) => {
        if (err)
            console.log(err);
        else{
            nurse.forEach(element => {
                element.water = element.water - 1;
                element.temperature = element.temperature - 0.5; //SKLONITI KOMENTARE NA KRAJU

                Seedling.find( {OwnerUsername:element.username , NurseryName: element.name} , (err,seedling)=>{
                    if(err)
                        console.log(err);
                    else{
                        seedling.forEach(seed =>{
                            seed.progress = seed.progress + 1;

                            seed.save()
                                .then(seed => {
                                    // bravo
                                })
                                .catch(err => {
                                    console.log(err);
                            });
                        })
                    }
                    
                });

                console.log(element.temperature);
                if(element.temperature <= 12 || element.water<=200){ //treba 200 za vodu i 12 za temperaturu

                    Farmer.findOne({ username: element.username }, (err, farmer) => {
                        if (err)
                            console.log(err);
                        else{

                            let warning = new Warning({
                                nursery: element.name,
                                username: farmer.username,
                                text: "Nursery "+element.name+" needs help!",
                                better: 0
                            });
                            
                            warning.save()
                                .then(warning => {
                                    console.log("YAY");
                                })
                                .catch(err => {
                                    console.log(err);
                            });

                            let transporter = nodemailer.createTransport({
        
                                service: 'gmail', 
                                auth:{
                                    user: 'probaproba383838@gmail.com',
                                    pass: 'zelenasalata3'
                                },
                                tls: {
                                    rejectUnauthorized: false
                                }
                            });
                        
                            let mailOptions = {
                                from: 'probaproba383838@gmail.com',
                                to: farmer.mail,
                                subject: 'WARNING !!!',
                                text: 'You need to take care of your nursery - ' + element.name + ' right away!'
                            };

                            transporter.sendMail(mailOptions, (err,info)=>{
                                if(err){
                                    return console.log(err);
                                }
                                else{
                                    console.log(`SENT! ${info.response}`);
                                }
                            });
                        
                        }
                            
                    });
                }

                element.save().then(element => {
                    
                }).catch(err => {
                    console.log("ERROR!");
                });
            });
        }
    });

}, 3600000);

mongoose.connect('mongodb://localhost:27017');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route("/farmers").get( (req,res)=>{
    Farmer.find( (err, farmers) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(farmers);
        }
    });
});

router.route("/farmersREQ").get( (req,res)=>{
    FarmerREQ.find( (err, farmers) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(farmers);
        }
    });
});

router.route("/enterprises").get( (req,res)=>{
    Enterprise.find( (err, enterprise) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(enterprise);
        }
    });
});

router.route("/enterprisesREQ").get( (req,res)=>{
    EnterpriseREQ.find( (err, enterprise) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(enterprise);
        }
    });
});

router.route('/admin/:username').get((req, res) => {
    Admin.findOne({ username: `${req.params.username}` }, (err, admin) => {
        if (err)
            console.log(err);
        else
            res.json(admin);
    });
});

router.route('/farmers/:username').get((req, res) => {
    Farmer.findOne({ username: `${req.params.username}` }, (err, farmer) => {
        if (err)
            console.log(err);
        else
            res.json(farmer);
    });
});

router.route('/farmersREQ/:username').get((req, res) => {
    FarmerREQ.findOne({ username: `${req.params.username}` }, (err, farmer) => {
        if (err)
            console.log(err);
        else
            res.json(farmer);
    });
});

router.route('/enterprises/:username').get((req, res) => {
    Enterprise.findOne({ username: `${req.params.username}` }, (err, enterprise) => {
        if (err)
            console.log(err);
        else
            res.json(enterprise);
    });
});

router.route('/enterprisesREQ/:username').get((req, res) => {
    EnterpriseREQ.findOne({ username: `${req.params.username}` }, (err, enterprise) => {
        if (err){
            console.log(err);
        }
        else{
            res.json(enterprise);
        }
    });
});

router.route('/farmers/add').post((req, res) => {
    let farmer = new Farmer(req.body);
    farmer.save()
        .then(farmer => {
            res.status(200).json({'farmer': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/farmersREQ/add').post((req, res) => {
    let farmer = new FarmerREQ(req.body);
    farmer.save()
        .then(farmer => {
            res.status(200).json({'farmer': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/enterprises/add').post((req, res) => {
    let enterprise = new Enterprise(req.body);
    enterprise.save()
        .then(enterprise => {
            res.status(200).json({'enterprise': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/enterprisesREQ/add').post((req, res) => {
    let enterprise = new EnterpriseREQ(req.body);
    enterprise.save()
        .then(enterprise => {
            res.status(200).json({'enterprise': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/farmersREQ/delete/:username').get((req, res) => {
    FarmerREQ.deleteOne({username: req.params.username}, (err, farmer) => {
        if (err)
            res.json(err);
        else{
            res.json('Remove successfully');
        }
    });
});

router.route('/farmers/delete/:username').get((req, res) => {
    Farmer.deleteOne({username: req.params.username}, (err, farmer) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

router.route('/enterprisesREQ/delete/:username').get((req, res) => {
    EnterpriseREQ.deleteOne({username: req.params.username}, (err, enterprise) => {
        if (err)
            res.json(err);
        else{
            res.json('Remove successfully');
        }
    });
});

router.route('/enterprises/delete/:username').get((req, res) => {
    Enterprise.deleteOne({username: req.params.username}, (err, enterprise) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

router.route('/farmers/update/:username').post((req, res) => {
    Farmer.findOne( { username: `${req.params.username}` }, (err, farmer) => {
        if (!farmer){
            console.log(err);
        }
        else {
            farmer.first_name = req.body.first_name;
            farmer.last_name = req.body.last_name;
            farmer.username = req.body.username;
            farmer.password = req.body.password;
            farmer.confirm_password = req.body.confirm_password;
            farmer.mobile = req.body.mobile;
            farmer.mail = req.body.mail;
            farmer.save().then(farmer => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/enterprises/update/:username').post((req, res) => {
    Enterprise.findOne( { username: `${req.params.username}` }, (err, enterprise) => {
        if (!enterprise){
            console.log(err);
        }
        else {
            enterprise.name = req.body.name;
            enterprise.abb = req.body.username;
            enterprise.username = req.body.username;
            enterprise.password = req.body.password;
            enterprise.confirm_password = req.body.confirm_password;
            enterprise.mail = req.body.mail;
            enterprise.place = req.body.place;
            enterprise.save().then(enterprise => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// NURSERIES FROM HERE DOWN 

router.route("/nurseries/:username").get( (req,res)=>{
    Nursery.find({ username: `${req.params.username}` }, (err, nurse) => {
        if (err)
            console.log(err);
        else
            res.json(nurse);
    });
});

router.route("/nurseries/adjust").get( (req,res)=>{
    Nursery.find({ flag:"1" }, (err, nurse) => {
        if (err)
            console.log(err);
        else
            res.json(nurse);
    });
});

router.route("/nurseries/:username/:name").get( (req,res)=>{
    Nursery.findOne( {username:`${req.params.username}` , name: `${req.params.name}`} , (err,nurse)=>{
        if(err)
            console.log(err);
        else   
            res.json(nurse);
    });
});

router.route('/nurseries/add').post((req, res) => {
    let nursery = new Nursery(req.body);
    nursery.save()
        .then(nursery => {
            res.status(200).json({'nursery': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/nurseries/update/:username/:name').post((req, res) => {
    Nursery.findOne( {username:`${req.params.username}` , name: `${req.params.name}`}, (err, nurse) => {
        if (!nurse){
            console.log(err);
        }
        else {
            nurse.water = req.body.water;
            nurse.temperature = req.body.temperature;
            nurse.save().then(nurse => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/nurseries/update/:username/:name/num').post((req, res) => {
    Nursery.findOne( {username:`${req.params.username}` , name: `${req.params.name}`}, (err, nurse) => {
        if (!nurse){
            console.log(err);
        }
        else {
            nurse.placeTaken = nurse.placeTaken + 1;
            nurse.save().then(nurse => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});
// SEEDLINGS FROM HERE DOWN 

router.route("/seedlings/:username/:name").get( (req,res)=>{
    Seedling.find( {OwnerUsername:`${req.params.username}` , NurseryName: `${req.params.name}`} , (err,seedling)=>{
        if(err)
            console.log(err);
        else   
            res.json(seedling);
    });
});

router.route('/seedlings/add').post((req, res) => {
    let seedling = new Seedling(req.body);
    seedling.save()
        .then(seedling => {
            res.status(200).json({'seedling': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/seedlings/update/:username/:name/:nurseryName').post((req, res) => {
    Seedling.findOne( {OwnerUsername:`${req.params.username}` , NurseryName: `${req.params.nurseryName}` , name: `${req.params.name}`}, (err, seed) => {
        if (!seed){
            console.log(err);
        }
        else {
            
            seed.progress = req.body.progress;

            seed.save().then(seed => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/seedlings/delete/:nursery/:x/:y/:user').get((req, res) => {
    setTimeout( () => {
        Seedling.findOne({NurseryName: req.params.nursery, x: req.params.x, y: req.params.y}, (err, seed) => {
            if (err)
                console.log(err);

                Seedling.deleteOne({NurseryName: req.params.nursery, x: req.params.x, y: req.params.y}, (err, ss) => {
                    if (err)
                        console.log(err);

                        Nursery.findOne( {username:req.params.user , name: req.params.nursery}, (err, nurse) => {
                            if (!nurse){
                                console.log(err);
                            }
                            else {
                                nurse.placeTaken = nurse.placeTaken - 1;
                                nurse.save().then(nurse => {
                                    res.json('Update done');
                                }).catch(err => {
                                    res.status(400).send('Update failed');
                                });
                            }
                        });

                    });
            });
    },10000/*86400000*/);
});
// WARNINGS FROM HERE DOWN

router.route('/warnings/:username').get((req, res) => {
    Warning.find({ username: `${req.params.username}` }, (err, w) => {
        if (err)
            console.log(err);
        else
            res.json(w);
    });
});

router.route('/warnings/:username/:nurs').get((req, res) => {
    Warning.findOne({ username: `${req.params.username}` , NurseryName: `${req.params.nurs}` }, (err, w) => {
        if (err)
            console.log(err);
        else
            res.json(w);
    });
});


router.route('/warnings/add').post((req, res) => {
    let warning = new Warning(req.body);
    warning.save()
        .then(warning => {
            res.status(200).json({'warning': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/warnings/delete/:username/:name').get((req, res) => {
    Warning.deleteMany({username: req.params.username, nursery: req.params.name}, (err, w) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

// PRODUCTS FROM HERE DOWN

router.route('/products/:username').get((req, res) => {
    Product.find({ ownerUsername: `${req.params.username}` }, (err, prod) => {
        if (err)
            console.log(err);
        else
            res.json(prod);
    });
});

router.route('/products/:username/:name').get((req, res) => {
    Product.findOne({ ownerUsername: `${req.params.username}` , name: `${req.params.name}` }, (err, prod) => {
        if (err)
            console.log(err);
        else
            res.json(prod);
    });
});

router.route('/products/:username/:enterprise/:name').get((req, res) => {
    Product.find({ ownerUsername: `${req.params.username}` , name: `${req.params.name}` , enterprise: `${req.params.enterprise}` }, (err, prod) => {
        if (err)
            console.log(err);
        else
            res.json(prod);
    });
});

router.route('/product/:username/:enterprise/:name').get((req, res) => {
    Product.findOne({ ownerUsername: `${req.params.username}` , name: `${req.params.name}` , enterprise: `${req.params.enterprise}` }, (err, prod) => {
        if (err)
            console.log(err);
        else
            res.json(prod);
    });
});

router.route('/products/add').post((req, res) => {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/products/update/:username/:name/:stor/:broj').post((req, res) => {
    Product.findOne( {ownerUsername:`${req.params.username}` , name: `${req.params.name}` , storage: `${req.params.stor}`}, (err, product) => {
        if (!product){
            console.log(err);
        }
        else {

            product.qHave = product.qHave - 1;

            product.save().then(product => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/products/comments/comments/:username/:name/:storage').post((req, res) => {
    Product.findOne( {ownerUsername:`${req.params.username}` , name: `${req.params.name}`, storage:`${req.params.storage}`}, (err, product) => {
        if (!product){
        }
        else {

            product.given = 1;

            product.save().then(product => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/products/updateee/:username/:name/:quantity/:stor').post((req, res) => {
    Product.findOne( {ownerUsername:`${req.params.username}` , name: `${req.params.name}` , storage:`${req.params.stor}`}, (err, product) => {
        if (!product){
            console.log(err);
        }
        else {
            
            product.qHave += parseInt(req.params.quantity);

            product.save().then(product => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/products/delete/:username/:name').get((req, res) => {
    Product.deleteOne({ownerUsername: req.params.username, name: req.params.name}, (err, product) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

// OFFERS FROM HERE DOWN

router.route('/offers').get((req, res) => {
    Offer.find({flag:true}, (err, prod) => {
        if (err)
            console.log(err);
        else
            res.json(prod);
    });
});

router.route('/offers/add').post((req, res) => {
    let offer = new Offer(req.body);
    offer.save()
        .then(offer => {
            res.status(200).json({'offer': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/offers/:enterprise').get((req, res) => {
    Offer.find({enterprise: `${req.params.enterprise}`}, (err, prod) => {
        if (err)
            console.log(err);
        else
            res.json(prod);
    });
});

router.route('/offers/update/:enterprise/:name/:num').post((req, res) => {
    Offer.findOne( {enterprise:`${req.params.enterprise}` , name: `${req.params.name}`}, (err, o) => {
        if (!o){
            console.log(err);
        }
        else {
            o.qAvailable -= req.params.num;

            o.save().then(o => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/offers/update/:enterprise/:name/:num/1').post((req, res) => {
    Offer.findOne( {enterprise:`${req.params.enterprise}` , name: `${req.params.name}`}, (err, o) => {
        if (!o){
            console.log(err);
        }
        else {
            
            let a = parseInt(req.params.num);

            o.grade += a;
            o.numOfGrades +=1;

            o.save().then(o => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/offers/delete/:name').get((req, res) => {
    Offer.deleteOne({name: req.params.name}, (err, o) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});


//ORDERS FROM HERE DOWN

router.route('/orders/:username').get((req, res) => {
    Order.find({ username: `${req.params.username}` }, (err, o) => {
        if (err)
            console.log(err);
        else
            res.json(o);
    });
});

router.route('/orders/add').post((req, res) => {
    let o = new Order(req.body);
    o.save()
        .then(o => {
            res.status(200).json({'order': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/orders/delete/:time/:amount').get((req, res) => {
    Order.deleteOne({time: req.params.time, amount: req.params.amount}, (err, o) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

router.route('/orders/update/:time/:enterprise').post((req, res) => {
    Order.findOne( {time: req.params.time}, (err, o) => {
        if (!o){
            console.log(err);
        }
        else {
            
            o.flag = 2;
            o.save().then(o => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/orders/update/:time/:enterprise/1').post((req, res) => {
    Order.findOne( {time: req.params.time}, (err, o) => {
        if (!o){
            console.log(err);
        }
        else {
            
            o.flag = 3;

            o.save().then(o => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/orders/:username/1').get((req, res) => {
    let aaa = "ORDER-" + `${req.params.username}`;
    Order.find({ name: aaa }, (err, o) => {
        if (err)
            console.log(err);
        else
            res.json(o);
    });
});

router.route('/orders/delete/:username/:amount/1').get((req, res) => {
    let aaa = "ORDER-" + `${req.params.username}`;
    Order.deleteOne({name: aaa, amount: req.params.amount}, (err, o) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

router.route('/orders/delete/:username/:time/1/1').get((req, res) => {
    let aaa = "ORDER-" + `${req.params.username}`;
    Order.deleteOne({name: aaa, time: req.params.time}, (err, o) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

// COMMENTS FROM HERE DOWN
router.route('/comments/:name/:enterprise').get((req, res) => {
    Comment.find({ name: `${req.params.name}`, enterprise: `${req.params.enterprise}` }, (err, com) => {
        if (err)
            console.log(err);
        else
            res.json(com);
    });
});

router.route('/comments/add').post((req, res) => {
    let com = new Comment(req.body);
    com.save()
        .then(com => {
            res.status(200).json({'comment': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

// POSTMAN FROM HERE DOWN

router.route('/postman/update/:username/:postman/:time/:date').post((req, res) => {
    console.log("KAMION KRENUO!");
    let a ="ORDER-" + `${req.params.username}`;
    Enterprise.findOne( {username: `${req.params.username}`}, (err, enter) => {
        if (!enter){
            console.log(err);
        }
        else {

            enter.postman = enter.postman+1;
            enter.save().then(enter => {}).catch(err => {console.log(err);});

            setTimeout( () => {
                Order.findOne( {time: `${req.params.date}`, name:a}, (err, o) => {
                    if (!o){
                        console.log(err);
                    }
                    else {
                        o.flag = 4;
                         console.log("KAMION STIGAO TAMO");
                        o.save().then(o => {
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                });

            }, 30000 /*req.params.time*1000*60*/);

            setTimeout( () => {
                Enterprise.findOne( {username: `${req.params.username}`}, (err, enter) => {
                    if (!enter){
                        console.log(err);
                    }
                    else {
                enter.postman = enter.postman - 1;
                if(enter.postman<0) enter.postman=0;

                console.log("KAMION VRACEN");

                enter.save().then(enter => {
                }).catch(err => {
                    console.log(err);
                });

            }});
            }, 45000 /*(2*req.params.time)*1000*60)*/);
        }
    });
});

// BUSINESS FROM HERE DOWN

router.route('/business/add').post((req, res) => {
    //console.log(req.body);
    let b = new Business(req.body);
    b.save()
        .then(b => {
            res.status(200).json({'b': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/business/:enterprise').get((req, res) => {
    Business.find({ enterprise: `${req.params.enterprise}`}, (err, com) => {
        if (err)
            console.log(err);
        else
            res.json(com);
    });
});



app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));