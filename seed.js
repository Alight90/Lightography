const mongoose = require('mongoose')

const Model=require('./models/model')

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

const seedModel =[
    {
        model:'Sedona',
        bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, perferendis. Quidem officiis iste repellat delectus, expedita explicabo, aperiam harum ea maiores natus molestiae ut qui deleniti ex doloremque, facilis doloru",
        photo:'edited/DSC08218.jpg',
        age:27,
        height:"5ft 1in",
        eyecolor:"Brown",
        location:"Jacksonville, FL"
  },
  {
    model:'Tokyo',
    bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, perferendis. Quidem officiis iste repellat delectus, expedita explicabo, aperiam harum ea maiores natus molestiae ut qui deleniti ex doloremque, facilis doloru",
    photo:'edited/mynewalpaper-10.jpg',
    age:27,
    height:"5ft 1in",
    eyecolor:"Brown",
    location:"Jacksonville, FL"
},
{
    model:'Cait',
    bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, perferendis. Quidem officiis iste repellat delectus, expedita explicabo, aperiam harum ea maiores natus molestiae ut qui deleniti ex doloremque, facilis doloru",
    photo:'edited/DSC07490_websize.jpg',
    age:27,
    height:"5ft 1in",
    eyecolor:"Brown",
    location:"Jacksonville, FL"
},
{
    model:'Kali',
    bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, perferendis. Quidem officiis iste repellat delectus, expedita explicabo, aperiam harum ea maiores natus molestiae ut qui deleniti ex doloremque, facilis doloru",
    photo:'edited/deathtomy20-12.jpg',
    age:27,
    height:"5ft 1in",
    eyecolor:"Brown",
    location:"Jacksonville, FL"
},
]
Model.insertMany(seedModel)
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})