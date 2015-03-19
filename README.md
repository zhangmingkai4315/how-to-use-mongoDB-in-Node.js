
启动mongoDB
C:\Program Files\MongoDB 2.6 Standard\bin
执行：.\mongod.exe --dbpath="d:\Mongodb\data"  --logpath="d:\Mongodb\log\mongodb.log

Mongo提供了JavaScript 的BSON对象存储比较高翔适合高并发写操作

写入的数据会保存在内存中，插入数据为非阻塞模式，针对子记录和母记录可保持在一个记录中而不用像其他的数据库通过表关联进行读取

npm install mongodb

