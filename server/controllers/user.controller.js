import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
    try {
        const { email, password, name, } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All input is required", success: false });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists!", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ email, password:hashedPassword , name });
        return res.status(201).json({ message: "User created successfully!", success: true });  
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to register" , success: false 

        });
    }
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All input is required", success: false });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }
        generateToken(user, res , `Login successfully! ${user.name}`);

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to login" , success: false 

        });

    }
};