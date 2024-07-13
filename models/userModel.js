const mongoose = require('mongoose');

const addressScema=new mongoose.Schema({
    
        city:String,
        street:String
    
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // uppercase:true,
        lowercase:true

    },
    age: {
        type: Number,
        required: true,
        min:10,
        max:30,
        validate:{
            validate: v=>v%2==0,
            message:props=>`$(props.value} is not even number`
        }

    },
    email: String,
    createAt:{
       type: Date,
       default:()=>Date.now()
    },
    bestFriend:mongoose.SchemaTypes.ObjectId,
    hobbies:[String],
    address:addressScema
});
userSchema.methods.sayHello=function(){
    console.log(`my name is ${this.name}`);
}

userSchema.static.findByname=function(findname){
   return this.where({name:findname})
}

userSchema.query.byName=function(name){
    return this.where({name:name})
}

userSchema.virtual('nameWithEmail').get(function(){
    return `${this.name} <${this.email}>`
})



//using middleware

//when ever the db is saved the middleware function will be saved
//and doo the action
userSchema.pre('save',(next)=>{
    this.name=`mr. ${this.name}`
    next()
})

//we cant use this. because at this time of execution 
//that will not be identified so all the details will be 
//stored in doc
//post will only run after we hitting save because we used save here
//if we someother the function will run after someother is called
userSchema.post('save',(doc,next)=>{
    doc.name=` ${doc.name} modified`
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;
