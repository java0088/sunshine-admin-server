const express = require('express');
const router = express.Router();
const query = require('../db/index');

// 获取分类列表
router.post('/list',async (req,res)=>{
  const page = req.body.page || 1
  const pageSize = req.body.pageSize || 5
  const searchName = req.query.searchName||''
  let start = (page-1)*pageSize
  // if(searchName&&searchName.trim().length>0) {

  // }
  const total = await query(`select count(*) total from videos`)
  const list = await query(`select 
      v.id,v.user_id,v.poster_url,v.add_time,v.content,v.description,v.love_num,u.nickname,u.mobile 
      from videos v left join user u on v.user_id=u.id having  u.nickname like "%${searchName}%" limit ${start},${pageSize}`)
  if(!list||list.length<=0) {
    return res.send({status:0,data:null,msg:'暂无数据!',pageInfo:{total,page,pageSize}})
  }
  res.send({status:1,data:list,msg:'获取分类成功',pageInfo:{total:total[0].total,page,pageSize}})
})


// 删除分类
router.delete('/delete',async (req,res)=>{
  const {id} = req.query
  if(!id) return  res.send({status:0,msg:'删除失败!'})

  const cate = await query(`delete from videos where id=${id}`)
  if(cate) {
    return res.send({status:1,msg:'删除成功'})
  }else {
    return res.send({status:0,msg:'删除失败!'})
  }  
  
})

module.exports = router
