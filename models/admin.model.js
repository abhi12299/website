const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;
