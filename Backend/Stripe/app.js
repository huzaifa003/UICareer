const express = require('express');
const stripe = require('stripe')('sk_test_51NzCbJCEAatbUnpu2tvuuXqlFDDVZrdryokBcPLqUC9jmO2lqYRD5uBthLHE22GsyHEeHKSUCM0R2muAlrEBWheX001k1JtwUJ')
const bodyParser = require('body-parser')
const cors = require('cors')
app = express()
const port = 3003;


// Middleware to parse JSON requests
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
    origin: '*'
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.get("/customers", async(req, res)=>{
//     const customers = await stripe.customers.list();

//     res.json(customers);
// })

app.get("/customers/:email", async(req,res)=>{
    const search = 'email : \' ' +  req.params.email +' \''
    const customers = await stripe.customers.search({
        
        query: search
      });

      console.log(customers)

    console.log(req.params.email)

    if (customers['data'].length > 0){
        res.send({"payment": 1})
        return;
    }
    else{
        res.send({"payment": 0});
        return;
    }
    


})
