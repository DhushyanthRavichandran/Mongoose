const mongoose=require('mongoose');
const User=require('./models/userModel');
const { getMaxListeners } = require('events');

mongoose.connect('mongodb://127.0.0.1:27017/role').then(()=>{
    console.log('connected');
}).catch(()=>{
    console.log('connection error')
})



// const user= new User({
//     name:'dhushyanth',
//     age:28
// })

// async function run(){
//    newuser=await user.save();
//    console.log(newuser);
// }

// async function run(){
//     try {
//         const newUser=await User.create({
//             name:'dhushyanth',
//             age:12,
//             email:'dhushyanth@gmail.com',
//             hobbies:['sports','music'],
//             address:{
//                 street:"2nd street",
//                 city:'mulanur'
//             }
//         })
//         console.log(newUser);
//     }
//      catch (error) {
//         console.log(error);
//         // console.log(error.errors); to see more about the errors
//     }
    
// }



async function run(){
    try {
    //    const user=await User.findOne({name:'logesh'});
    // const user=await User.exists({name:'dhushyanth'});
    const user=await User.where('name').equals('dhushyanth');
    const use=await User.where('age').limit(1).gt(30);
    const findbyname=User.findByname('dhushyanth');
    const by=User.find().byName('dhushyanth')
    //to use virtual the db needs that key. if there is key
    //then we can acccess it only by
    console.log(user.nameWithEmail);
    await user.save();
    user.sayHello();
    console.log(user);
   
    }
   
     catch (error) {
        console.log(error);
        // console.log(error.errors); to see more about the errors
    }
    
}
run();