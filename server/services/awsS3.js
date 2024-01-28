const AWS = require('aws-sdk')

exports.uploadToS3 = async (fileName,data)=>{
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
    const ACCESS_KEY = process.env.AWS_ACCESS_KEY;


      const s3 = new AWS.S3({
          accessKeyId:ACCESS_KEY,
          secretAccessKey:SECRET_ACCESS_KEY,
      })

          var params = {
              Bucket:BUCKET_NAME,
              Key:fileName,
              Body : data,
              ACL:'public-read'
          }
          return new Promise((resolve,reject)=>{
              s3.upload(params,(err, s3response)=>{
                  if(err){
                      reject(err)
                  }
                  else{
                      resolve(s3response.Location);
                  }
              })
          })
}