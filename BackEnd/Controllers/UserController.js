import user from "../Models/UserModel.js";
import expressAsyncHandler from "express-async-handler";
import generateAccessToken from "../utiles/GenerateAccessToken.js";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
// import OpenAI from "openai";
import run from "../utiles/Geminiapi.js"
import dotenv from "dotenv";


dotenv.config();

// create new user
export const createUser = expressAsyncHandler(async (req, res) => {
  // console.log(req.body)
  const { name, email, password } = req.body;

  // check the input fields
  if (!name) {
    res.status(400);
    throw new Error("please enter your name");
  } else if (!email) {
    res.status(400);
    throw new Error("please enter your email");
  } else if (!password) {
    res.status(400);
    throw new Error("please enter your password");
  }

  // check password length
  if (password.length < 8) {
    res.status(400);
    throw new Error("password must be atleast 8 characters");
  }

  //email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("please enter valid email address");
  }

  // check email exists
  const userExists = await user.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("email is already exists");
  }

  const newUser = user({
    name,
    email,
    password,
  });

  if (newUser) {
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  }
});

// save the user & plan details in datebase

export const createUserPlan = expressAsyncHandler(async (req, res) => {
  const { name, email, password, plan } = req.body;
  console.log("create",plan);
  const payTime = new Date(); //user payment date and time
  let expiryTime;

  if (plan) {
    switch (plan) {
      case "Free":
        expiryTime = 1;
        break;

      case "Pro":
        expiryTime = 10;
        break;

      case "Advanced":
        expiryTime = 30;
        break;

      default:
        console.log("plan not available");
    }
  } else {
    res.status(400);
    throw new Error("Please select the plan");
  }
  const expiryDate = payTime.getTime() + expiryTime * 24 * 60 * 60 * 1000; //calculate the expiry date

  try {
    const userFullDetail = await user.create({
      name,
      email,
      password,
      plan,
      payTime,
      expiryDate,
    });
    console.log(`created succuessfully`);
    if (userFullDetail) {
      generateAccessToken(res, user._id);
      res.status(201).json({
        name: userFullDetail.name,
        email: userFullDetail.email,
        plan: userFullDetail.plan,
        payTime: userFullDetail.payTime,
        expiryDate: userFullDetail.expiryDate,
      });
    }
    console.log({
      name: userFullDetail.name,
      email: userFullDetail.email,
      plan: userFullDetail.plan,
      payTime: userFullDetail.payTime,
      expiryDate: userFullDetail.expiryDate,
    })
  } catch (error) {
    console.log(error.message);
  }
  // await user.save();
});


//user login route - controller
export const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check the email
  const findUser = await user.findOne({ email });
  if (!findUser) {
    res.status(400);
    throw new Error("invalid email address");
  }

  //check the plan expiry
  const currentTime = new Date();
  const expiryTime = findUser.expiryDate;

  if (currentTime > expiryTime) {
    res.status(400);
    throw new Error("Your plan is expired,please upgrade!..");
  }

  //generate the token
  if (findUser && (await findUser.checkPassword(password))) {
   const accessToken =  generateAccessToken(res, findUser._id);
    res.status(201).json({
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      message: "Logged in successfully",
      token : accessToken
    });
  } else {
    res.status(400);
    throw new Error("invalid email and password");
  }
});


//user logout route-controller
export const userLogout = expressAsyncHandler((req, res) => {
  res.clearCookie("AccessToken");
  res.status(200).json({
    message: "logout succussfully...",
  });
});


//protected route-controller
export const protectedRoute = expressAsyncHandler((req, res) => {
  const token = req.cookies.token;
  if(!token){
    res.status(400)
    throw new Error("Unauthorized")
  }
  res
    .status(200)
    .json({ message: "welcome to protected route", user: req.user });
    
});

//gemini api route-controller
export const chatpot = expressAsyncHandler(async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const response = await run(prompt)
    res.status(200).json({message:response.response.text()})
  } catch (error) {
    console.log(error)
  }

});

// stripe payment route
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const paymentRoute = expressAsyncHandler(async (req, res) => {
  // console.log(req.body);
  const { plan } = req.body;
  // console.log(plan);
  const price = {
    Pro: 999,
    Advanced: 3499,
  };

  try {
    console.log(`plan ${plan}`);
    console.log(`price ${price[plan]}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Plan - ${plan}`, // Include the plan name
            },
            unit_amount: Math.round(price[plan] * 100), //convert cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/create`,
    });

    // console.log(session);
    res.json({ url: session.url, success: true });
  } catch (error) {
    console.log(error);
  }
});


