##建议接口

1

* url：/advice
* 方式：POST
* 说明：提交用户意见
* 参数：@id 	用户id
	@advice 建议内容
* 返回值：string（ok或者error，表示提交结果）
* 返回值样例：ok

##书籍接口

1

* url：/books/search
* 方式：POST
* 说明：搜索图书
* 参数：@bookName 	搜索的关键字
	@fromUniversity 搜索学校范围
* 返回值：携带book信息的json数组
* 返回值样例：[{"id":1,"bookName":"工科数学","category":"课本","subject":"*","occupation":"*","fromUniversity":"哈尔滨工业大学","count":20889688,"downloadNumber":0,"uploader":"王祎","uid":"13115511080","money":0,"pic":null}]

2

* url：/books/booklist
* 方式：POST
* 说明：查询某一科目的所有图书
* 参数：@subject	查询图书的学科
	@fromUniversity	查询学校范围
	@category	查询图书的类型
	@start		查询起始条数
* 返回值：携带book信息的json数组
* 返回值样例：[{"id":1,"bookName":"工科数学","category":"课本","subject":"*","occupation":"*","fromUniversity":"哈尔滨工业大学","count":20889688,"downloadNumber":0,"uploader":"王祎","uid":"13115511080","money":0,"pic":null}]

3

* url：/books/download
* 方式：POST
* 说明：下载图书，获取所下图书的真实相对路径
* 参数：@id	所下图书id
	@uid	用户id
* 返回值：string（所下载图书真实的相对路径）
* 返回值样例：/public/res/books/code.pdf

4

* url：/books/userbooks
* 方式：POST
* 说明：查询用户上传的图书
* 参数：@uid	用户id
* 返回值：携带book信息的json数组
* 返回值样例：[{"id":1,"bookName":"工科数学","category":"课本","subject":"*","occupation":"*","fromUniversity":"哈尔滨工业大学","count":20889688,"downloadNumber":0,"uploader":"王祎","uid":"13115511080","money":0,"pic":null}]

5

* url：/books/watch
* 方式：POST
* 说明：查询图书真实路径
* 参数：@id	查询图书id
* 返回值：string（所下载图书真实的相对路径）
* 返回值样例：/public/res/books/code.pdf

6

* url：/books/upload
* 方式：POST
* 说明：上传图书
* 参数：@bookName	图书名称
	@occupation	图书专业
	@fromUniversity	图书所在学校
	@book		图书文件

-------------------------------------
> 说明
	整体参数的格式是mutipart表单格式，其中@bookNam,@occupation，@fromUniversity是字符串，book是二进制文件。
---------------------------------------

* 返回值：string（ok或者error，表示提交结果）
* 返回值样例：ok

##用户接口

1

* url：/users/userbaseinfo
* 方式：GET
* 说明：获取用户基本信息
* 参数：null
* 返回值：用户信息的json序列
* 返回值样例：{"id":"12511325826","passWords":null,"userName":"王希民","university":"吉林艺术学院","faculty":"工业设计","grade":"本三","Class":"1437104","picture":""}

2

* url：/users/usersbyorder
* 方式：GET
* 说明：获取大神榜所有用户信息
* 参数：null
* 返回值：携带用户信息的json数组
* 返回值样例：[{"rank":1,"userName":"王祎","downloadNum":20,"university":"哈尔滨工业大学","url":"/res/user/13115511080/","id":"13115511080"}]

3

* url：/users/userelseinfo
* 方式：GET
* 说明：获取用户附加信息
* 参数：null
* 返回值：用户附加信息的json序列
* 返回值样例：{"id":"12511325826","money":2,"downloadNum":2,"isMonitor":"FALSE"}

4

* url：/users/getrank
* 方式：GET
* 说明：获取用户排名
* 参数：null
* 返回值：int（排名）
* 返回值样例：2

5

* url：/users/register
* 方式：POST
* 说明：注册
* 参数：@userInfo	用户信息
	@file		用户头像
	
-------------------------------------
> 说明
	userInfo是一个json序列，序列中有如下内容
	@id		用户id
	@passWords	密码
	@userName	用户名
	@faculty	专业
	@grade		年级
	@Class		班级
	@picture	是否有头像
	样例：{
            id               : "42589545368",
            passWords        : 'qwe123',
            userName         : 'name',
            university       : 'university',
            faculty          : 'faculty',
            grade            : '2015级',
            Class            : '1437104',
            picture          : 'false'
        }
	整体参数的格式是mutipart表单格式。
---------------------------------------
	
* 返回值：string（ok或者error，表示提交结果）
* 返回值样例：ok

6

* url：/users/login
* 方式：POST
* 说明：登陆
* 参数：@id		用户id
	@passWords	密码
* 返回值：string（ok或者error，表示登陆结果）
* 返回值样例：ok

7

* url：/users/modify
* 方式：POST
* 说明：修改用户信息
* 参数：和注册接口参数一样，只是userInfo的json序列中没有passWords一项。
* 返回值：string（ok或者error，表示登陆结果）
* 返回值样例：ok

8

* url：/users/modify/password
* 方式：POST
* 说明：修改用户密码
* 参数：@ckn 		token
	@id		用户id
	@passWords	新密码
* 返回值：boolean（true或者false，表示修改结果）
* 返回值样例：true

9

* url：/users/userexists
* 方式：POST
* 说明：检查用户是否存在
* 参数：@id	用户id
* 返回值：boolean（true或者false，表示结果）
* 返回值样例：true
##作业接口

1

* url：/homework/send
* 方式：POST
* 说明：发送作业
* 参数：@homework	作业信息
	@file		作业模板
	
-------------------------------------
> 说明
	homework是一个json序列，序列中有如下内容
	@uid		用户id
	@message	作业内容
	@sdate		起始日期
	@fdate		结束日期
	@courseNo	课程id
	@picUrl		是否有作业模板
	样例：{
	  "uid":"13115511080",
	  "message":"testhomework",
	  "sdate":"2016-5-10",
	  "fdate":"2016-6-28",
	  "courseNo":"1",
	  "picUrl":"false"
	}
	整体参数的格式是mutipart表单格式。
---------------------------------------

* 返回值：string（ok或者error，表示结果）
* 返回值样例：ok

2

* url：/homework/getHomework
* 方式：POST
* 说明：获取作业
* 参数：@id	用户id
* 返回值：携带作业信息的json序列
* 返回值样例：[{
	  "uname":"王祎",
	  "message":"testhomework",
	  "sdate":"2016-5-10",
	  "fdate":"2016-6-28",
	  "is":"1",
	  "course":"工科数学",
	  "picUrl":"/homework/name.jpg"
	}]
##消息接口

1

* url：/message/send
* 方式：POST
* 说明：发送作业
* 参数：@message	消息信息
	@file		消息图片
	
-------------------------------------
> 说明
	message是一个json序列，序列中有如下内容
	@uid		用户id
	@message	消息内容
	@date		消息日期
	@category	消息类型
	@picUrl		是否有照片
	样例：{
	  uid         : '13115511080',
          message     : 'test message',
          date        : '2016-5-10',
          category    : 'class_change',
          picUrl      : 'false'
	}
	整体参数的格式是mutipart表单格式。
---------------------------------------

* 返回值：string（ok或者error，表示结果）
* 返回值样例：ok

2

* url：/message/getMessage
* 方式：POST
* 说明：获取消息
* 参数：@id	用户id
	@date	查询消息的起始日期
* 返回值：携带消息信息的json数组
* 返回值样例：[{
	  "id":"341341",
	  "uname":"王祎",
	  "message":"testmessage",
	  "date":"2016-5-10",
	  "category":"教室变更",
	  "picUrl":"/message/name.jpg"
	}]
##基本信息接口

1

* url：/base/university
* 方式：GET
* 说明：获取学校列表
* 参数：null
* 返回值：携带学校信息的json数组
* 返回值样例：[{"name":"吉林艺术学院"},{"name":"哈尔滨工业大学"}]

2

* url：/base/class
* 方式：POST
* 说明：获取班级列表
* 参数：@fromUniversity	查询大学
	@faculty	查询院系
* 返回值：携带班级信息的json数组
* 返回值样例：[{"name":"1143710403"}]

3

* url：/base/faculty
* 方式：POST
* 说明：获取院系列表
* 参数：@fromUniversity	查询大学
* 返回值：携带院系信息的json数组
* 返回值样例：[{"name":"软件工程"}]

4

* url：/base/sms
* 方式：POST
* 说明：发送短信
* 参数：@mob	手机号
* 返回值：string(验证码)
* 返回值样例：427451
