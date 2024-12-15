import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role: { 
        type: String, 
        enum: ['learner', 'educator'],
        required: true 
    },
    img: {type: String}
})

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.models.User || mongoose.model("User",userSchema)

const validate = (data) => {
    const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        role: Joi.string().valid('learner', 'educator').required().label('Role'),
		img: Joi.string().required().label("Img")
	});
  return schema.validate(data);
};

export {User,validate};