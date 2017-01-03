# ItoneServer
A  server of resource platform by express
本项目是通过express框架构建的一个资源平台服务器

## 项目结构

- bin			express生成的文件夹，存放一些框架初始化的代码，不用管
- common		common文件夹存放的是项目一些需要全局初始化的代码，比如任务和异常
- controllers		controllers文件夹存放的控制器，处理具体的业务逻辑
- interface		interface文件夹是无用的文件夹，本打算是为校园接口设计的模块，暂时没需求就放置了。
- node_modules		node第三方模块文件夹
- proxy			proxy文件夹存放的是代理，用来隔离controller和数据库的交互。
- public		public文件夹存放的是静态文件，比如图书，图片，html，js，css等
- routes		routes文件夹存放的是路由文件，这个文件夹下的文件会被根目录的routes.js文件所调用，所有请求会通过路由被分发到不同的controller执行相应的业务逻辑
- task			task文件夹存放的是任务文件，定时执行一些业务逻辑
- test			test文件夹存放的是测试文件，测试文件在其子文件夹controllers中。
- utils			utils文件夹存放的是一些静态工具文件，包括日期格式化工具，下载工具，短信工具和数据库工具
- views			express生成的文件夹，存放的是模板文件，由于前端人员估计不会jade等node常用模板语言，这个文件夹没什么意义

## 项目架构简述

整个架构基于分层架构，项目大致由4类中间件组成，每一类中间件即是一层，分别是：
* 过滤器，在routes中的中间件，对所有请求进行过滤，可以用来进行权限控制的事务，并对请求进行分发。
* 控制器，在controllers中的中间件，对具体的请求进行业务处理，调用不同的代理执行相应的业务需求。
* 代理，在proxy中的中间件，连接数据库，对数据库进行增删改查的操作，并对上层返回相应数据。
* 底层接口及静态数据，该层是可以被复用的底层服务接口或者静态数据，包括数据库接口，短信对接接口，全局变量等。
**添加一条api的流程
* 在proxy中添加代理，处理该api涉及的数据库访问操作。
* 在controllers中添加控制器，调用此前创建的代理，处理该api涉及的业务逻辑。
* 将api的url分为两部分，即‘host:port/(1)/(2)’，增加的api如果在(1)部分是新的，那么需要在routes文件夹中添加路由，并将这个路由在根目录的routes文件中声明。增加的api如果在(2)部分是新的，那么只需要修改routes文件夹中相应的路由即可。

ps.由此可见，routes文件夹下的各个路由可以看做是项目的api汇总。

## 测试

测试基于mocha框架，可以自动化的测试所有api，test文件夹下有 /controllers，/sup，mocha.opts, test.js。其中test.js是测试入口文件，会调用controllers文件夹下的所有测试文件，/controllers文件夹中是对api的具体测试文件，模拟http请求，并输出返回的结果。模拟http请求的操作我进行了封装，放在了sup文件夹，使用方式参照那些测试用例的使用方式即可。

写好测试用例之后只需要在根目录使用mocha命令即可。

## 部署

部署采用pm2进行管理
* 将config文件中的数据库参数切换至远程服务器的数据库参数（即密码为wangyi601466673的那组参数）。
* 通过git提交到coding
* 通过ssh连接到远程服务器
* 远程先后使用如下命令
1. git pull origin master，如果结果有合并异常，说明有log文件被上传，建议建立.gitignore文件，用来防止log等文件的提交
2. pm2 restart 0
