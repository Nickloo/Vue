用户注册
 /api/register POST username password

获取用户信息
 /api/getUser GET userId

用户登陆 
/api/login POST username password

用户关注
 /api/follows POST userId（当前用户id）fav_id（被关注用户id）

取消关注 
/api/delFav POST userId（当前用户id）fav_id（被关注用户id）

获取全部答人信息 
/api/getDarenMsg GET 

修改用户信息 
/api/setUser POST userId

创建问题 
/api/createQue POST 
title 问题标题      
content 问题内容
que_date 问题时间
user_id 提问者用户id
type(可以为空) 问题的类型 study学习 life生活。。。
is_private（问题是否全体可见）0公共问题全体可见 1私人问题被提问者可见

获取所有问题
/api/getQuestion GET 

获取单个指定问题
/api/getQuestion/queCon GET   que_id 问题id

<!--获取个人请求问题-->
<!--/api/getQuestion/person GET   user_id 用户id-->

提交问题答案 
/api/answer POST text_con  que_id  user_id  is_voice  voice_src

设置最佳答案
/api/setbest
取消最佳答案
/api/delbest

