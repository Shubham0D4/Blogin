const askdb = require('./dbhost');
const func = require('../function')

const showdb = async () => {
  return new Promise((resolve, reject) => {
    askdb.query('show databases;', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const recoverdb = async (id) => {
  return new Promise((resolve, reject) => {
    askdb.query('select * from user where id = ?;', id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result ? true : false);
      }
    });
  });
};

const insertuser = async (id, user) => {
  return new Promise((resolve, reject) => {
    askdb.query('insert into user values(?, ?, ?, ?, ?, ?);', [id, user.fname, user.mname, user.lname, user.email, func.encrypt(user.password)], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(false);
      }
    });
  });
};

const addincre = async () => {
  return new Promise((resolve, reject) => {
    askdb.query('update incre set inc = inc+1;', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const incre = async () => {
  return new Promise((resolve, reject) => {
    askdb.query('select * from incre;', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.inc);
      }
    });
  });
};

const checkuser = async(user)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('select * from user where (id = ? or mail = ?) and password = ?',[user.id, user.mail, func.encrypt(user.pass)], (err, result)=>{
      if(err){
        reject(err)
      }else{
        resolve(result? result:false);
      }
    });
  });
};

const getwarticle = async(user)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('select * from writtenArticle where userid = ?', [user], (err, result)=>{
      if(err){
        reject(err)
      }else{
        resolve(result?result:false);
      }
    });
  });
}
const setwarticle = async(uid, data, aid)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('insert into writtenArticle values (?, ?, ?, ?, ?, ?)', [uid, aid, data.title, data.summary, data.content, data.ispublic], (err, result)=>{
      if(err){
        reject(err)
      }else{
        resolve(result);
      }
    });
  });
}
const deleteuser = async(id)=>{
  return new Promise((resolve, reject)=>{
    askdb.query("delete from user where id = ?", [id], (err, result)=>{
      if(err){
        reject(err)
      }else{
        resolve(result);
      }
    });
  });
}
const getarticle = async(id)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('select * from writtenArticle where articleId = ?', [id], (err, result)=>{
      if(err){
        reject(err)
      }
      else{
        resolve(result?result:false);
      }
    })
  })
}
const getAllArticles = async(id)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('select * from writtenArticle where userid <> ? and ispublic = 1', [id], (err,result)=>{
      if(err){
        reject(err)
      } else {
        resolve(result?result:false);
      }

    })
  })
}
const getUser = async(id)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('select * from user where id = ?', [id], (err, result)=>{
      if(err){
        reject(err);
      } else {
        resolve(result?result:false);
      }
    })
  })
}
const deletearticle = async(id)=>{
  var inc = Math.floor(100 + Math.random() * 900).toString();
  return new Promise((resolve, reject)=>{
    askdb.query('delete from writtenArticle where articleId = ?', [id], (err, result)=>{
      if(err){
        reject(err)
      } else {
        resolve(result?result:false);
      }
    });
  });
}
const userbyartid = async(aid)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('select * from user where id = (select userid from writtenArticle where articleId = ?)', [aid], (err, result)=>{
      if(err){
        reject(err);
      } else {
        resolve(result?result:false);
      }
    });
  });
}
const upaccess = async(aid)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('update writtenArticle set ispublic = case when ispublic = 1 then 0 else 1 end where articleId = ?', [aid], (err, result)=>{
      if(err){
        reject(err);
      } else {
        resolve(result?result:false);
      }
    });
  })
}
const allusers = async(uid)=>{
  return new Promise((resolve, reject)=>{
    askdb.query('select * from user where id <> ?', [uid], (err, result)=>{
      if(err){
        reject(err);
      } else {
        resolve(result?result:false);
      }
    });
  });
}


module.exports = {
  showdb,
  recoverdb,
  insertuser,
  incre,
  addincre,
  checkuser,
  getwarticle,
  setwarticle,
  deleteuser,
  getarticle,
  getAllArticles,
  getUser,
  deletearticle,
  userbyartid,
  upaccess,
  allusers
};