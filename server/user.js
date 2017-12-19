const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

const _filter = {'pwd': 0, '__v': 0}

function getMD5Pwd (pwd) {
  const salt = 'chat'
  return utils.md5(utils.md5(pwd + salt))
}

Router.get('/list', function (req, res) {
  // User.remove({}, function name(err, doc) {})
  User.find({}, function (err, doc) {
    if (err) return res.json({ code: 1, errMsg: '后端报错'})
    return res.json(doc)
  })
})

Router.post('/login', function (req, res) {
  const {user, pwd} = req.body
  User.findOne({ user: user, pwd: getMD5Pwd(pwd) }, _filter, function(
    err,
    doc
  ) {
    if (!doc) {
      return res.json({ code: 1, errMsg: "用户名或密码错误", data: doc });
    }
    res.cookie("userId", doc._id);
    return res.json({ code: 0, data: doc });
  });
})

Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body
  console.log('req.body', req.body)
  User.findOne({user: user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, errMsg: '用户名重复'})
    }
    const currentUser = new User({ user, pwd: getMD5Pwd(pwd), type })
    currentUser.save(function (err, doc) {
      if (err) {
        return res.json({code: 1, errMsg: '后端报错了'})
      }
      const {user, type, _id} = doc
      res.cookie('userId', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})

Router.get('/info', function (req, res) {
  const {userId} = req.cookies
  if (!userId) {
    return res.json({code: 1})    
  }
  User.findOne({_id: userId}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, errMsg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

module.exports = Router