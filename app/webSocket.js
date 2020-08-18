var emoji = require('node-emoji');
module.exports = function(app, wsInstance) {

    var Chat = require('./models/chat');

    var logKeys = function(name,obj) {
        console.log(name,Object.keys(obj).join(","));
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }


    var broadcast = function(instanceName,data)
    {
        var clients = wsInstance.getWss(instanceName).clients;
        clients.forEach(function(client) {
            client.send(data);
        });
    }

    app.ws('/chat', function(ws, req) {
        if(req.isAuthenticated())
        {
            var user = req.user.local.username;
            broadcast("/chat",JSON.stringify({user: "System", message: user.capitalize() + " has joined",added_date: new Date()}));
            ws.on('message', function (message) {
                if(message.charAt(0) == '{')
                {
                    var action = JSON.parse(message).action;
                    if(action == "get")
                    {
                        var cutoff = new Date();
                        cutoff.setDate(cutoff.getDate()-2);
                        Chat.find({added_date: {$gt:cutoff}}, function(err, chats) {
                            if(err)
                                console.log(err);
                            if(chats)
                            {
                                chats.forEach(chat => {
                                    ws.send(JSON.stringify(chat));
                                });
                            }
                        });
                    }
                } else
                {
                    message = emoji.emojify(message,null,null);
                    var chat = new Chat();
                    chat.user = user;
                    chat.message = message;
                    chat.save(function(err) {
                        if (err)
                            console.log(err);
                    });

                    broadcast("/chat",JSON.stringify({"user":user,'message':message,added_date: new Date()}));
                }
            })
        }
    });
}
