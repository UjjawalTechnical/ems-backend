import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Designation = mongoose.model('Designation', designationSchema)
export default Designation;
