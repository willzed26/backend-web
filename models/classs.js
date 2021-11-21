const mongoose = require ('mongoose');

const kelasSchema = mongoose.Schema ({
    classname: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    codeclass: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("Kelas", kelasSchema, 'daftarkelas');
