import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator';
//create schema:

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"UserName is required"]
    },
    mobile:{
        type:String,
        required:[true,"Mobile No is required"],
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required"],
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format',
          },
    },
    password:{
        type:String,
required:[true,"Password is required"],
unique:true,
minlength:[6,"Password must be at least 6 characters"]

    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,

    },
    image: { 
        type: String,
        default:"https://www.shutterstock.com/image-illustration/3d-render-attractive-cartoon-character-260nw-1933348058.jpg"
    },
},
{
    timestamps:true
}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  //intance method for Compare Password:
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

//create model:

const User = mongoose.model('user', userSchema);

export default User;
