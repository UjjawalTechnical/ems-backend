import Designation from "../models/Designation.js";

const getDesignations = async (req, res) => {
    try {
        const designations = await Designation.find();
        if (!designations || designations.length === 0) {
            return res.status(404).json({ success: false, message: 'No designations found' })
        }
        const pageIndex = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;
        const startIndex = (pageIndex - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedDesignations = designations.slice(startIndex, endIndex);
        res.status(200).json({ success: true, data: paginatedDesignations });
    } catch (error) {
        console.error('Error fetching designations:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getDesignationById = async (req, res) => {
    try {
        const { id } = req.params;
        const designation = await Designation.findById(id);
        if (!designation) {
            return res.status(404).json({ success: false, message: 'Designation not found' });
        }   
        res.status(200).json({ success: true, data: designation });
    } catch (error) {
        console.error('Error fetching designation:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }   
};

const addDesignation = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ success: false, message: 'Name and description are required' });
        }
        const existingDesignation = await Designation.findOne({ name });
        if (existingDesignation) {
            return res.status(400).json({ success: false, message: 'Designation already exists' });
        }   
        const designation = await new Designation({ name, description }).save();
        res.status(201).json({ success: true, message: 'Designation added successfully', data: designation });
    } catch (error) {
        console.error('Error adding designation:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateDesignation = async (req, res) => { 
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ success: false, message: 'Name and description are required' });
        }
        const existingDesignation = await Designation.findOne({ name });
        if (existingDesignation && existingDesignation._id.toString() !== id) {
            return res.status(400).json({ success: false, message: 'Designation already exists' });
        }
        const designation = await Designation.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!designation) {
            return res.status(404).json({ success: false, message: 'Designation not found' });
        }
        res.status(200).json({ success: true, message: 'Designation updated successfully', data: designation });
    } catch (error) {
        console.error('Error updating designation:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteDesignation = async (req, res) => {
    try {
        const { id } = req.params;
        const designation = await Designation.findByIdAndDelete(id);    
        if (!designation) {
            return res.status(404).json({ success: false, message: 'Designation not found' });
        }
        res.status(200).json({ success: true, message: 'Designation deleted successfully' });
        } catch (error) {
            console.error('Error deleting designation:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
};

export { getDesignations, getDesignationById, addDesignation, updateDesignation, deleteDesignation };