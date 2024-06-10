import { userSchema } from "../models/userModels";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// cost factor which determines how much time is needed to calculate a single bcrypt hash
const saltRounds = 10;

/**
 * @param {*} req --> '{*}' tells req can be of any type
 * @param {*} res
 * @returns String
 */

// functi0n to create new user

export const createUser = async (req, res) => {
  // destructure the keys from request body
  const { username, email, password } = req.body;

  // check if required field are filled
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter the required fields",
    });
  }

  try {
    // get the user with the email
    const existingUser = await userSchema.findUnique({
      where: {
        user_email: email,
      },
    });

    // check if the user with the given email already exists
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: `User with the email ${email} already exists`,
      });
    }

    // hash the password
    const hashedPassword = hashPassword(password);

    // store the user
    await userSchema.create({
      data: {
        user_name: username,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "The user has been created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal Server Error",
    });
  }
};

/**
 *
 * @param {*} plainTextPassword
 * @param {*} salt
 * @returns hash
 */

// function to hash the password

const hashPassword = (plainTextPassword) => {
  const hashedPassword = bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(plainTextPassword, salt, function (err, hash) {});
  });
  return hashedPassword;
};

/**
 * @param {*} req --> '{*}' tells req can be of any type
 * @param {*} res
 * @returns String
 */

// function to read all users

export const getUsers = async (req, res) => {
  try {
    const users = await userSchema.findMany();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal Server Error",
    });
  }
};
