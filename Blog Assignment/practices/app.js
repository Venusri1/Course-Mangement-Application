const  express = require('express');
const path=require('path');
const bodyParser=require('body-parser');
const { default: mongoose } = require('mongoose');
const session=require('express-session');
const port=process.env.PORT || 3200;
const flash=require('connect-flash')

// const Credentials=require('./Credentials/Credentials');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//path for public folder for css and images
const public=path.join(__dirname,'/public');

app.use(express.static("uploads"));

// setting mongodb  connection
mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://venusri:venusri220@cluster0.ghwj0mp.mongodb.net/Blog",()=>{
    console.log('db was sync');
});


//path for views folder
app.set('view engine','ejs');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(express.static(public));

app.use(session({
    secret: 'my key',
    resave: false,
    saveUninitialized: true,
  
  }));
  
app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
  })
  app.use(flash())



//routes 
app.use('',require('./routes/Pagesroutes'));
app.use('',require('./routes/Categories'));
app.use('',require('./routes/Blogs'))


// app.use((req,res,next)=>{
//   // res.header('Access-Control-Allow-Origin','*');
//   req.headers(
//       'Access-Control-Allow-Origin',
//       'Origin,X-Requested-With,Content-Type,Accept,Authorization'
//   );
//   if(req.method === 'OPTION'){
//       res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,GET,DELETE') 
//       return res.status(200).json({});
//   }
//   next();
// });



app.listen(port);