// Purpose: Handles authentication for users.

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

const prisma = new PrismaClient();

//
//
//
//
//
//
// handle Signin for user
async function handleSigninUSER(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(200)
        .json({ message: "Please enter all fields", status: 400 });
    }
    await prisma.user
      .findUnique({ where: { email, password } })
      .then((data) => {
        if (!data) {
          return res
            .status(200)
            .json({ message: "Invalid Credentials", status: 400 });
        }
        const token = jwt.sign(
          { email, name: data.name },
          process.env.JWT_SECRET as string
        );
        return res
          .status(200)
          .json({ message: "Login Successful", token, status: 200 });
      })
      .catch((error) => {
        console.log("Error on login", error);
        return res
          .status(200)
          .json({ message: "Invalid Credentials", status: 400 });
      });
  } catch (error) {
    console.log("Error on login", error);
    return res.status(200).json({ message: "Error on login", status: 400 });
  }
}

//
//
//
//
//
//
// handle verify user and return decoded value of the token
function handleVerifyUser(req: Request, res: Response) {
  try {
    const token = req.headers.authtoken as string;
    if (!token) {
      return res
        .status(200)
        .json({ message: "No token provided", status: 400 });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(200).json({ message: "Invalid Token", status: 400 });
      }
      return res
        .status(200)
        .json({ message: "Token is valid", decoded, status: 200 });
    });
  } catch (error) {
    console.log("Error on verify token", error);
    return res
      .status(200)
      .json({ message: "Error on verify token", status: 400 });
  }
}

//
//
//
//
//
//
// handle signup for user
async function handleSignupUSER(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(200)
        .json({ message: "Please enter all fields", status: 400 });
    }
    await prisma.user
      .create({
        data: {
          email,
          password,
          name,
        },
      })
      .then((data) => {
        return res
          .status(200)
          .json({ message: "User created successfully", data, status: 200 });
      })
      .catch((error) => {
        return res
          .status(200)
          .json({ message: "Error in creating user", status: 400 });
      });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "Error in creating user", status: 400 });
  }
}

export { handleSigninUSER, handleVerifyUser, handleSignupUSER };
