const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';

module.exports = function (req, res, next) {
   const key = req.headers['x-api-key']; 
   if(key){
    const keys = require('fs').readFileSync(VALID_KEYS_PATH, 'utf-8').split('\n').filter(Boolean);
    console.log(keys);
    if(keys && Array.isArray(keys) && keys.length > 0){
        const isAllowed = keys.includes(key);
        console.log(isAllowed);
        if(isAllowed){
            next();
        } else {
            res.status(401).json({message: 'unauthorized'});
        }
    } else {
        res.status(401).json({message: 'unauthorized'});
    }
   } else {
    res.status(401).json({message: 'unauthorized'});
   }
};
