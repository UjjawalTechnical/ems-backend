import Department from "../models/Deparment.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        if (!departments || departments.length === 0) {
            return res.status(404).json({ success: false, message: 'No departments found' })
        }
        return res.status(200).json({ success: true, departments })
    } catch (error) {
        console.error('Error fetching departments:', error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'Name and description are required'
            })
        }
        const existingDepartment = await Department.findOne({ name })
        if (existingDepartment) {
            return res.status(400).json({ success: false, message: 'Department already exists' })
        }
        const department = await new Department({ name, description }).save()
        return res.status(201).json({ success: true, message: 'Department added successfully', department })
    } catch (error) {
        console.error('Error adding department:', error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const department = await Department.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!department) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }
        return res.status(200).json({ success: true, message: 'Department updated successfully', department });
    } catch (error) {
        console.error('Error updating department:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }
        return res.status(200).json({ success: true, message: 'Department deleted successfully' });
    } catch (error) {
        console.error('Error deleting department:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export { addDepartment, getDepartments, updateDepartment, deleteDepartment }