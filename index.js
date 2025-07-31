const express = require('express');
const app = express();
const path =require('path');
const joi= require('joi')
const mongoose = require('mongoose')
const methodOverride =require('method-override')
const ExpressError = require('./utili/expressError.js')
const CatchAsync = require('./utili/catchAsync.js')
const {modelSchema} = require('./schemas.js')
const Photo=require('./models/photo')
const Model=require('./models/model')
const session=require('express-session')
const flash =require('connect-flash')

const sessionOptions ={secret:'parastroika',resave:false,saveUninitialized:false }

mongoose.connect('mongodb://127.0.0.1:27017/photoApp')
.then(()=>{
    const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('Connected to Mongo'));
})
.catch(err=>{
console.log('Mongo error connecting')
console.log(err)
})

const validateModel =(req,res,next) =>{
  const {error} = modelSchema.validate(req.body)
  if(error){
      const msg = error.details.map(el=>el.message).join(',')
      throw new ExpressError(msg,400)
  } else{
      next()
  }
}

app.use(express.static(path.join(__dirname,'/public')))
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(session(sessionOptions))
app.use(flash())
app.use((req,res,next)=>{
  res.locals.messages=req.flash('info');
  next();
})

app.get('/', async (req,res)=>{
  const photos = await Photo.find({})
  console.log(photos)
    res.render('photos/main',{photos})
})

app.get('/giveaway', async(req,res)=>{
  res.render('photos/giveAway')
})
app.get('/aboutme', async (req,res)=>{
    const photos = await Photo.find({})
    console.log(photos)
      res.render('photos/aboutMe',{photos})
  })
app.get('/packages', async (req,res)=>{
    const photos = await Photo.find({})
    console.log(photos)
      res.render('photos/packages',{photos})
  })
  app.get('/portfolio', async (req,res)=>{
    const photos = await Photo.find({})
    console.log(photos)
      res.render('photos/portfolio',{photos})
  }),

  app.get('/contact', async (req,res)=>{
      res.render('photos/contact')
  }),

  app.get('/models', async (req,res)=>{
    const models = await Model.find({})
    console.log(models)
      res.render('photos/models',{models})
  })
  
  app.get('/models/new',(req,res)=>{
    res.render('photos/newModel')
  })

  app.post('/models', validateModel,CatchAsync (async (req,res,next)=>{
        const model = new Model(req.body.model)
        await model.save()
        req.flash('info','Model Created!')
        res.redirect(`/models/${model._id}`)

}))

  app.get('/models/:id', async (req,res)=>{ 
    const {id} = req.params;
    const models = await Model.findById(id)
    console.log(models)
      res.render(`photos/mod`,{models})
  })
  app.delete('/models/:id', CatchAsync(async (req,res,next) =>{
    const { id } = req.params
    await Model.findByIdAndDelete(id)
    res.redirect('/models')
}))
app.get('/photos/new',(req,res)=>{
    res.render('photos/newModel')
})

app.post('/photos', async (req,res)=>{
   const newPhoto = new Photo(req.body)
   await newPhoto.save()
   console.log(newPhoto)
   res.redirect(`/photos/${newPhoto._id}`)

})
app.get('/photos/:id', async(req,res)=>{
    const {id} = req.params;
    const product = await Photo.findById(id)
    res.render('photos/show',{product})
})

app.get('/photos/:id/edit',async (req,res)=>{
    const {id} = req.params;
    const photo = await Photo.findById(id)
    res.render('photos/edit',{photo})})

app.put('/photos/:id', async (req,res)=> {
    const {id} = req.params;
    const photo =  await Photo.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
   res.redirect(`/products/${photo._id}`)
})

app.all('*',(req,res,next) =>{
  next(new ExpressError('Page Not Found',404))
})

app.use((err,req,res,next)=>{
  res.status()
  const {statusCode = 500} = err;
  if(!err.message) err.message = 'Something Went Wrong'
  res.status(statusCode).render('error',{err})
})

app.listen(3000, ()=>{
    console.log('listening on 3000')
})