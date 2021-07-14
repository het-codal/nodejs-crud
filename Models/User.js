const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name:String,
        email: String
    }
)
UserSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = mongoose.model('users', UserSchema)