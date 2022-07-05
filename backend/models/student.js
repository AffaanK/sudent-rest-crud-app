const mongoose = require('mongoose')

const Student = mongoose.Schema(
  {
    name: {
			type:String,
      required: [true, 'Please add a valid name'],
    },
    address: {
      type: String,
      required: [true, 'Please add valid address'],
    },
    phone: {
      type: Number,
      required: [true, 'Please add a valid Phone number'],
    },
    age: {
      type: Number,
      required: [true, 'Please add a valid age'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Student', Student)