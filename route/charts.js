const express = require('express');
const router = express.Router();
const query = require('../db/index');
const Mock = require('mockjs')
// 类型
let types = [{
  id: 0,
  title: '生活',
  opt: '',
},
{
  id: 1,
  title: '文艺',
  opt: '',
},
{
  id: 2,
  title: '旅行',
  opt: '',
},
{
  id: 3,
  title: '职场',
  opt: '',
},
{
  id: 4,
  title: '时尚',
  opt: '',
},
{
  id: 5,
  title: '理财消费',
  opt: '',
},
{
  id: 6,
  title: '新知',
  opt: '',
},
{
  id: 7,
  title: '英语学习',
  opt: '',
},
{
  id: 8,
  title: '趣味',
  opt: '',
},
];
  // 获取柱状图数据
router.get('/getBarList', (req, res) => {
   // 数据
  let data = Mock.mock({
    status: 1, // 设置返回status
    'data|9': [{
      // 设置返回status
      id: '@integer(1,3000)',
      'num':'@integer(100,1000)'
    }, ],
  });
 
  res.send({
    status: 1,
    data: {types,data:data.data},
  });
});

// 获取饼图数据
router.get('/getPieList', (req, res) => {
    // 数据
  let data = Mock.mock({
    status: 1, // 设置返回status
    'data': [
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'生活'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'文艺'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'旅行'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'职场'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'时尚'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'理财消费'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'新知'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'英语学习'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'value':'@integer(100,1000)',
        name:'趣味'
      }, 
    ],
  });
  
  res.send({
    status: 1,
    data: {types,data:data.data},
  });
});

// 获取折线图数据
router.get('/getLineList', (req, res) => {
  // 数据
  let data = Mock.mock({
    status: 1, // 设置返回status
    'data': [
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'values|7':['@integer(100,1000)'],
        name:'生活'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'values|7':['@integer(100,1000)'],
        name:'英语学习'
      }, 
      {
        // 设置返回status
        id: '@integer(1,3000)',
        'values|7':['@integer(100,1000)'],
        name:'趣味'
      }, 
    ],
  });

  res.send({
    status: 1,
    data: {types,data:data.data},
  });
});

// 删除反馈
router.delete('/delete',async (req,res)=>{

  
})

module.exports = router
