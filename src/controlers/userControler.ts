import { Request, Response } from "express";
import user from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser {
  username: string;
  password: string;
}

interface Iproduct {
  id: string;
  name: string;
  price: number;
  amount: number;
}

interface Iregister extends IUser {
  email: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const { username, email }: Iregister = req.body;
  const password = await bcrypt.hash(req.body.password, 8);

  const checkUsername = await user.findOne({ username: username });
  const checkEmail = await user.findOne({ email: email });

  if (checkUsername || checkEmail) {
    res
      .status(400)
      .json({ status: "error", massage: "username or email is already used" });
    return;
  }

  const newUser = new user({
    username,
    email,
    password,
  });

  await newUser.save();
  res
    .status(201)
    .json({ status: "success", data: { message: "user have been created" } });
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password }: IUser = req.body;
  let ckeckUser;

  if (!username || !password) {
    res
      .status(400)
      .json({ status: "error", massage: "username and password are required" });
    return;
  }

  if (username.includes("@") && username.includes(".")) {
    ckeckUser = await user.findOne({ email: username });
  } else {
    ckeckUser = await user.findOne({ username: username });
  }

  if (!ckeckUser) {
    res.status(400).json({
      status: "error",
      massage: "username or password not valid try again",
    });
    return;
  }

  const matchedPassword = await bcrypt.compare(password, ckeckUser.password);

  if (ckeckUser && matchedPassword) {
    const accesstoken = jwt.sign(
      { id: ckeckUser._id, username: ckeckUser.username },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { id: ckeckUser._id, username: ckeckUser.username },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );
    const setrefreshToken = await user.updateOne(
      { username: username },
      { $set: { refreshToken } }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.json({ status: "success", data: { accesstoken } });
  } else {
    res.status(400).json({
      status: "error",
      massage: "username or password not valid try again",
    });
    return;
  }
};

export const getProductsCart = async (req, res) => {
  const userData = req?.user;
  const products = await user.findOne(
    { _id: userData.id },
    { cart: 1, _id: 0 }
  );
  res.json({
    status: "success",
    data: products?.cart,
    newToken: res?.locals?.authenticated,
  });
};

export const setProductCart = async (req, res) => {
  const userData = req?.user;
  const product: Iproduct = req.body;

  const data = await user.findOne({ _id: userData.id }, { cart: 1, _id: 0 });
  const check: Iproduct = data.cart.find((ele) => ele.id === product.id);
  if (!check && product) {
    data.cart.push(product);
    await user.updateOne({ _id: userData.id }, { $set: { cart: data.cart } });
  } else if (check && product) {
    for (let i = 0; i < data.cart.length; i++) {
      if (data.cart[i].id === product.id) {
        data.cart[i].price += product.price;
        data.cart[i].amount += product.amount;
      }
    }

    await user.updateOne({ _id: userData.id }, { $set: { cart: data.cart } });
  }
  res.status(200).json({
    status: "success",
    data: data?.cart,
    newToken: res?.locals?.authenticated,
  });
};

export const deleteProductCart = async (req, res) => {
  const userData = req?.user;
  const productId = req.params.id;

  const { cart }: { cart: Iproduct[] } = await user.findOne(
    { _id: userData.id },
    { cart: 1, _id: 0 }
  );

  const filtered = cart.filter((item) => item?.id !== productId);
  await user.updateOne({ _id: userData.id }, { $set: { cart: filtered } });
  res.status(200).json({
    status: "success",
    data: filtered,
    newToken: res?.locals?.authenticated,
  });
};

export const profile = async (req, res) => {
  const userData = req?.user;
  const user_info = await user.findOne(
    { _id: userData.id },
    { _id: 0, username: true, email: true }
  );
  res.json({
    status: "success",
    data: user_info,
    newToken: res?.locals?.authenticated,
  });
};

export const deleteUser = async (req, res) => {
  const userData = req?.user;
  await user.deleteOne({ _id: userData.id });
  res.json({
    status: "success",
    data: { message: "user have been deleted" },
  });
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken", { path: "/" });
  res.json({ status: "success", data: { message: "user logged out" } });
};
