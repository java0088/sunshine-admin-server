const express = require('express');
const router = express.Router();
const query = require('../db/index');

// 获取分类列表
router.get('/list',async (req,res)=>{
  const searchName = req.query.searchName||''
  // if(searchName&&searchName.trim().length>0) {

  // }
  const list = await query(`select * from category where title like "%${searchName}%"`)
  if(!list||list.length<=0) {
    return res.send({status:0,data:null,msg:'暂无数据!'})
  }
  res.send({status:1,data:list,msg:'获取分类成功'})
})

// 添加和修改分类
router.post('/edit',async (req,res)=>{
  const {id,title} = req.body
  if(id) {
    const cate = await query(`update category set title="${title}" where id=${id}`)
    if(cate) {
      return res.send({status:1,msg:'修改成功'})
    }else {
      return res.send({status:0,msg:'修改失败!'})
    }
  }else {
    const cate = await query(`insert into category(title) values("${title}")`)
    if(cate) {
      return res.send({status:1,msg:'添加成功'})
    }else {
      return res.send({status:0,msg:'添加失败!'})
    }  
  }
})

// 删除分类
router.delete('/delete',async (req,res)=>{
  const {id} = req.query
  if(!id) return  res.send({status:0,msg:'删除失败!'})

  const cate = await query(`delete from category where id=${id}`)
  if(cate) {
    return res.send({status:1,msg:'删除成功'})
  }else {
    return res.send({status:0,msg:'删除失败!'})
  }  
  
})

module.exports = router
