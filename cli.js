#!/usr/bin/env node
var minimist = require('minimist')
var request = require('request')
var _ = require('underscore')
var args = minimist(process.argv.slice(2))

var login = args._[0]
var password = args._[1]

request({
  method: 'POST',
  uri: 'http://www.qiushibaike.com/session.js',
  form: {
    'login': login,
    'password': password
  },
  json: true
}, function(err, res, obj){
  if (err) {
    return console.log('请求失败:', err)
  }
  if (obj['error']) {
    return console.log('登录失败:', obj['error'])
  }
  var cookieArr = res.headers['set-cookie']
  var item = _.find(cookieArr, function(str){
    return /session=/.test(str)
  })
  if (!item) {
    return console.log('未获取token:', cookieArr)
  }
  var token = /session=([^;]+)/.exec(item)[1]
  console.log('token:', token)
})