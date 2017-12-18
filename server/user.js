const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function (req, res) {
  console.log('list')
  User.find({}, function (err, doc) {
    if (err) return res.json({ code: 1, errMsg: '后端报错'})
    return res.json(doc)
  })
})

Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body
  console.log('req.body', req.body)
  User.findOne({user: user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, errMsg: '用户名重复'})
    }
    User.create({user, pwd, type}, function (err, doc) {
      if (err) return res.json({code: 1, errMsg: '后端出错了'})
      return res.json({code: 0})
    })
  })
})

Router.get('/info', function (req, res) {
  return res.json({code: 1})
})

module.exports = Router