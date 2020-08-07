const express = require('express');
const router = express.Router();
const query = require('../db/index');
const jwt = require('jsonwebtoken')
const {PWD} = require('../config/index')
const utils = require('../utils/index')
// 登录功能
router.post('/login', async (req, res) => {
  // 获取客户端传递过来的数据
  const {username,password} = req.body
  // 验证数据
  if(username.length<=3||username.length>=12) {
    return res.send({status:0,msg:'用户名长度必须在3-12之间'})
  }
  if(password.length<=3||username.length>=12) {
    return res.send({status:0,msg:'密码长度必须在3-12之间'})
  }
  const token = jwt.sign({username,password}, PWD, { expiresIn: '7day' })
  const user = await query(`select * from admin where username="${username}" and password="${password}"`)
  if(user.length>0) {
    const upUser = await query(`update admin set token="${token}" where username="${username}" and password="${password}"`)
    if(!upUser)  res.send({status:0,msg:'用户名或密码错误'})
    res.send({user:user[0],token,status:1,mag:'登录成功'})
  }else {
    res.send({msg:'用户名或密码错误!',status:0})
  }
});

// 自动登录
router.post('/autoLogin', async (req, res) => {
  const {token} = req.body
  jwt.verify(token, PWD, async (error, decoded) => {
    if (error) {
      res.send({status:0,msg:'token已失效!'}) 
      return
    }
    const {username,password} = decoded
    const user = await query(`select * from admin where username="${username}" and password="${password}"`)
    if(user.length>0) {
      res.send({user:user[0],token,status:1,mag:'登录成功'})
    }else {
      res.send({msg:'用户名或密码错误!',status:0})
    }
  })
  // res.send({status:0,token})
});

// 获取所有管理员
router.post('/list',async (req,res)=>{
  const page = req.body.page || 1
  const pageSize = req.body.pageSize || 5
  let start = (page-1)*pageSize
  const total = await query(`select count(*) total from admin`)
  const list = await query(`SELECT a1.*,a2.username AS auth_name FROM admin a1 LEFT JOIN admin a2 ON a1.auth_id=a2.id limit ${start},${pageSize}`)
  if(!list||list.length<=0) {
    return res.send({status:0,data:null,msg:'暂无数据!',pageInfo:{total,page,pageSize}})
  }
  res.send({status:1,data:list,msg:'获取角色成功',pageInfo:{total:total[0].total,page,pageSize}})
})

// 获取所有管理员
router.post('/add',async (req,res)=>{
  const username = req.body.username
  const auth_id = req.body.auth_id
  if(!username) {
    return res.send({status:0,data:null,msg:'请输入角色名称!'})
  }
  const add_time = utils.getDate(new Date())
  const role = await query(`select * from admin where username="${username}"`)
  if(role.length>0) {
    return res.send({status:0,data:null,msg:'该角色已存在!'})
  }
  const list = await query(`insert into admin(username,auth_id,add_time) values("${username}","${auth_id}","${add_time}")`)
  if(!list) {
    return res.send({status:0,data:null,msg:'添加角色失败!'})
  }
  res.send({status:1,data:list,msg:'添加角色成功'})
})

// 添加权限
router.post('/setRoles',async (req,res)=>{
  const id = req.body.id
  const auth_id = req.body.auth_id
  const roles = req.body.roles
  const list = await query(`update admin set roles="${roles}",auth_id=${auth_id} where id=${id}`)
  if(!list) {
    return res.send({status:0,data:null,msg:'设置权限失败!'})
  }
  res.send({status:1,data:list,msg:'设置权限成功'})
})

module.exports = router; 