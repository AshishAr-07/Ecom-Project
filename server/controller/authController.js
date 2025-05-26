import usernSchema from "../modal/usernSchema.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import orderSchema from "../modal/orderSchema.js";

export const registerController = async (req, res) => {
  const { username, email, password, phone, address, answer } = req.body;
  if (!username || !email || !password || !phone || !address || !answer) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const userExist = await usernSchema.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = new usernSchema({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    const userregister = await user.save();
    if (userregister) {
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // check user
    const user = await usernSchema.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }
    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);

    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in login " });
  }
};

export const testController = async (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, password, answer } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    //check user
    const user = await usernSchema.findOne({ email, answer });

    //validation
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or answer",
      });
    }
    const hashed = await hashPassword(password);
    await usernSchema.findByIdAndUpdate(user._id, { password: hashed });
    res
      .status(200)
      .send({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Update Profile Controller
export const updateProfileCOntroller = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await usernSchema.findById(req.user._id);
    //validation
    if (password && password.length < 6) {
      return res.json({ error: "Password should be 6 characters long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updateUser = await usernSchema.findByIdAndUpdate(
      req.user._id,
      {
        username: name || user.username,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating",
      error,
    });
  }
};

// Get Single Orders Controller
export const getOrderController = async (req, res) => {
  try {
    const order = await orderSchema
      .find({ buyer: req.user._id })
      .populate("products", "-photo");
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// Get All Orders Controller
export const getAllordersController = async (req, res) => {
  try {
    const orders = await orderSchema
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// Order Status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderSchema.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};
