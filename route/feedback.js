const express = require('express');
const router = express.Router();
const query = require('../db/index');

// 获取分类列表
router.post('/list',async (req,res)=>{
  
  const page = req.body.page || 1
  const pageSize = req.body.pageSize || 5
  const nickname = req.body.nickname || ''
  const mobile = req.body.mobile || ''
  let start = (page-1)*pageSize
  const total = await query(`select count(*) total from feedback`)
  const list = await query(`select 
      f.id,f.type,f.content,f.img,f.content,f.add_time,u.nickname,u.mobile
      from feedback f left join user u on f.user_id=u.id having  u.nickname like "%${nickname}%" and u.mobile like "${mobile}%" limit ${start},${pageSize}`)
  if(!list||list.length<=0) {
    return res.send({status:0,data:null,msg:'暂无数据!',pageInfo:{total,page,pageSize}})
  }
  res.send({status:1,data:list,msg:'获取分类成功',pageInfo:{total:total[0].total,page,pageSize}})
})


// 删除反馈
router.delete('/delete',async (req,res)=>{
  const {id} = req.query
  if(!id) return  res.send({status:0,msg:'删除失败!'})

  const cate = await query(`delete from feedback where id=${id}`)
  if(cate) {
    return res.send({status:1,msg:'删除成功'})
  }else {
    return res.send({status:0,msg:'删除失败!'})
  }  
  
})

module.exports = router
