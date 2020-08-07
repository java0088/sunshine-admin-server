// 导入express
const express = require('express');
const Compression = require('compression')
// 导入path
const path = require('path');
// 导入cors
const cors = require('cors');
// 导入body-parser
const bodyParser = require('body-parser');
// 创建服务器
const app = express();
// 管理员路由
const adminRouetr = require('./route/admin')
// 分类路由
const categoryRouetr = require('./route/category')
// 视频路由
const videoRouetr = require('./route/video')
// 反馈路由
const feedbackRouetr = require('./route/feedback')
// 评论路由
const commentRouetr = require('./route/comment')
// mock图表数据
const chartsRouetr = require('./route/charts')
// 用户数据
const userRouetr = require('./route/user')
const {
  BASE_URL
} = require('./config/index')
app.use(Compression())
// 释放静态资源
app.use(express.static(path.join(__dirname, 'public')));
// 解决跨域问题
app.use(cors());
// 解决获取post请求获取参数的问题
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// 使用路由
app.use('/admin', adminRouetr)
app.use('/category', categoryRouetr)
app.use('/video', videoRouetr)
app.use('/feedback', feedbackRouetr)
app.use('/comment', commentRouetr)
app.use('/charts', chartsRouetr)
app.use('/user', userRouetr)

// 监听端口
app.listen(3520, () => {
  console.log('server is running at: ' + BASE_URL);
});