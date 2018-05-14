var detectCaller = (req, res, next=>{
    var myng = req.header('myNg');
    if(myng === 'fromAngularApp'){
        next();
    }else{
        res.status(403).send();
    }
});
module.exports = { detectCaller };