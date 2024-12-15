// import bcrypt from "bcrypt";
// import Joi from "joi";
// import {User} from "@/models/user";
// import connection from "@/lib/mongoose";
// import { NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";

// export async function POST(req) {
//   try {
//     await connection(); // Ensure your database is connected

//     const { error } = validateSignin(req.body);
//     if (error) {
//       return res.status(400).send({ message: error.details[0].message });
//     }

//     const user = await User.findOne({ email: req.body.email });
//     console.log("HEHE AYA CHHU");
    
//     if (!user) {
//       return res.status(401).send({ message: "Invalid email or password" });
//     }

//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) {
//       return res.status(401).send({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { _id: user._id, role: user.role },
//       process.env.JWTPRIVATEKEY, // Use an environment variable for the secret key
//       { expiresIn: "1h" } // Adjust token expiry as needed
//     );

//     res.status(200).send({
//       data: token,
//       message: "logged in successfully",
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       img: user.img,
//     });
//   } catch (error) {
//     console.error("Error during sign-in:", error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// }

// const validateSignin = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required().label("Email"),
//     password: Joi.string().required().label("Password"),
//   });
//   return schema.validate(data);
// };




import bcrypt from "bcrypt";
import Joi from "joi";
import { User } from "@/models/user"; 
import connection from "@/lib/mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await connection();

    // Parse the request body
    const body = await req.json();

    // Validate the input
    const { error } = validateSignin(body);
    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify the password
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate the JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWTPRIVATEKEY, // Ensure this key is defined in your `.env.local` file
      { expiresIn: "1h" }
    );

    // Return the response
    return NextResponse.json(
      {
        data: token,
        message: "logged in successfully",
        name: user.name,
        email: user.email,
        role: user.role,
        img: user.img,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Validation schema for sign-in
const validateSignin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
