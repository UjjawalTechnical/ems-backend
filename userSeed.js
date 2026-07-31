import connectToDB from "./db/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const userRegister = async () => {
    connectToDB()
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "ankurdhamapadhan@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch (error) {
        console.log(error)
    }
}

userRegister();