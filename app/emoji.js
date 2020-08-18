module.exports = function(app) {
    var names = Object.keys(require('node-emoji/lib/emoji.json'))
    app.get('emoji',function(req,res) {
        res.json(names.filter(app => { return app.search(req.params) >= 0 }));
    });
}
