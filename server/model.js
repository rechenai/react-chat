// C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe

const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/chat'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    'avatar': {type: String},
    'desc': {type: String},
    'title': {type: String},
    'company': {type: String},
    'money': {type: String}
  },
  chat: {
    'chatId': {type: String, require: true},
    'read': {type: Boolean, require: true},
    'from': {type: String, require: true},
    'to': {type: String, require: true},
    'msg': {type: String, require: true, default: ''},
    'createTime': {type: Number, default: new Date().getTime()}
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}