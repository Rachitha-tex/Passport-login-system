const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
 function initialize(passport,getUserByEmail,getUserId){
 const authenticateUser=async (email,password,done)=>{
   const user=getUserByEmail(email)
   if(user ==null){
       return done(null,false,{message:'No user with that  email'})
   }
   try {
       if(await bcrypt.compare(password,user.password)){
           return done(null,user)
       }else{
           return done(null,false,{message:"Password Incorrect"})
       }
   } catch (error) {
       return done(error);
   }
 }
   passport.use(new LocalStrategy({usernameField:'email'/* no need to define password as it is default */},authenticateUser ))
   passport.serializeUser((user,done)=>done(null,user.id))
   passport.deserializeUser((id,done)=>{
       return done(null,getUserId(id))
   })
} 
module.exports=initialize