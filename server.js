const http = require('http')
const fs = require ('fs')
const path=require('path')
let mes =''

http
    .createServer(function (req, res){
        if(req.url==='/'){
            fs.readFile('index.html', function(err, data){
                if(err){
                    res.end(err)
                } else {
                    res.writeHead(200, {"content-Type":"text/html"})
                    res.write(data)
                    return res.end()
                }
            })
        }

        if(req.url==='/create-directory'){
            let body = ""
            req.on("data", function (data) {
                body += data.toString();
            });
            
            req.on("end", function () {
                fs.mkdir('/Users/nskvak/Documents/code-immersives/Term-2/Week-1/node-fs-hw/some-folder', function (err){
                    if(err){
                        res.end(err)
                    } else {
                        res.end('content folder created')
                    }
                });
            })
        }


        if (req.url==='/create-text' && req.method==="POST"){
            let body = ""
            req.on("data", function (data) {
                body += data.toString();
            });
            
            req.on("end", function () {
                fs.writeFile('randomText.txt','random text file is created 1', function(err){
                    if(err){
                        res.end(err)
                    } else{
                        
                        res.end(`randomText.txt is created ${mes}`)
                    }
                })
                
            })
            
        }
        if (req.url==='/new-folder-and-file' && req.method === "POST"){
            fs.readFile('randomText.txt', function(err, data){
                if(err){
                    res.end(err)
                } else {
                    res.writeHead(200, {"content-Type":"text/html"})
                    mes = data
                    fs.writeFile('some-folder/verbage.txt',mes, function(err){
                        if(err){
                            res.end(err)
                        } else{
                            res.end(`verbage.txt is created ${mes}`)
                        }
                    })
                }
            })
            setTimeout(function(){
                fs.unlinkSync('some-folder/verbage.txt')
                fs.rmdir('/Users/nskvak/Documents/code-immersives/Term-2/Week-1/node-fs-hw/some-folder', {recursive:true}, function(err){
                    if(err){
                        return err
                    } else{
                        console.log('directory successfully removed')
                    }
                })
            }, 7000)
        }
    })
    .listen(3000, function(){
        console.log('Server started')
    })

