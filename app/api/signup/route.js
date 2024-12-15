// import connection from "@/lib/mongoose";
// import User from "@/models/user";
// import { NextResponse } from "next/server";
// const bcrypt = require("bcrypt");
// const Joi = require("joi");

// export async function POST (req) {
//     // try{
//     //     await connection()
//     //     const data = await request.json()
//     //     const newUser = new User(data)
//     //     const result = await newUser.save() 
//     //     return NextResponse.json(result,{status: 201})
//     //     // return NextResponse.json(newUser,{status: 201})
//     // }
//     // catch(error){
//     //     console.log(error)
//     // }


    
// }



import connection from "@/lib/mongoose";
import {User,validate} from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(req) {
  try {
    // Connect to the database
    await connection();

    // Parse the request body
    const body = await req.json();

    // Validate the input data
    const { error } = validate(body);
    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with given email already exists!" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
    const hashPassword = await bcrypt.hash(body.password, salt);

    // Create and save the user
    const newUser = new User({ ...body, password: hashPassword });
    const result = await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
