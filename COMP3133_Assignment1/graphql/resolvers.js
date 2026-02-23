const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../config/cloudinary');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const resolvers = {
    Query: {
        login: async (_, { usernameOrEmail, password }) => {
            const user = await User.findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
            });

            if (!user) {
                throw new Error('Invalid Credentials');
            }

            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                throw new Error('Invalid Credentials');
            }

            return {
                token: generateToken(user._id),
                user
            };
        },

        getAllEmployees: async () => {
            return await Employee.find();
        },

        getEmployeeById: async (_, { eid }) => {
            const employee = await Employee.findById(eid);
            if (!employee) {
                throw new Error('Employee not found');
            }
            return employee;
        },

        searchEmployee: async (_, { designation, department }) => {
            const filter = {};
            if (designation) filter.designation = designation;
            if (department) filter.department = department;
            return await Employee.find(filter);
        }
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            const userExists = await User.findOne({ $or: [{ username }, { email }] });
            if (userExists) {
                throw new Error('User already exists');
            }

            const user = await User.create({
                username,
                email,
                password
            });

            return user;
        },

        addEmployee: async (_, args) => {
            const { employee_photo, ...details } = args;

            let imageUrl = '';
            if (employee_photo && employee_photo.startsWith('data:image')) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(employee_photo, {
                        folder: 'employee_management'
                    });
                    imageUrl = uploadResponse.secure_url;
                } catch (error) {
                    console.error('Cloudinary upload error:', error);
                    throw new Error('Failed to upload image');
                }
            } else if (employee_photo) {
                imageUrl = employee_photo; // Assume it's already a URL if not Base64
            }

            const employee = await Employee.create({
                ...details,
                employee_photo: imageUrl
            });

            return employee;
        },

        updateEmployee: async (_, { eid, ...updateFields }) => {
            const employee = await Employee.findById(eid);
            if (!employee) {
                throw new Error('Employee not found');
            }

            // If a new photo is provided as base64, upload it
            if (updateFields.employee_photo && updateFields.employee_photo.startsWith('data:image')) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(updateFields.employee_photo, {
                        folder: 'employee_management'
                    });
                    updateFields.employee_photo = uploadResponse.secure_url;
                } catch (error) {
                    console.error('Cloudinary upload error:', error);
                    throw new Error('Failed to upload image');
                }
            }

            const updatedEmployee = await Employee.findByIdAndUpdate(
                eid,
                { $set: updateFields },
                { new: true, runValidators: true }
            );

            return updatedEmployee;
        },

        deleteEmployee: async (_, { eid }) => {
            const employee = await Employee.findById(eid);
            if (!employee) {
                throw new Error('Employee not found');
            }
            await Employee.findByIdAndDelete(eid);
            return 'Employee deleted successfully';
        }
    }
};

module.exports = resolvers;
