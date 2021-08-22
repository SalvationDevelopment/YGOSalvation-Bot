const express = require('express');
const app = express();
const BOT_WEBHOOK_PORT = process.env.BOT_WEBHOOK_PORT;
const BOT_JUDGECALL_TIMEOUT_RATE = process.env.BOT_JUDGECALL_TIMEOUT_RATE;
const callTimeOut = {};

app.use(express.json());

function bounce(username) {
    if (!callTimeOut.username) {
        callTimeOut.username = new Date();
        return false;
    }

    if (callTimeOut.username.getTime() + BOT_JUDGECALL_TIMEOUT_RATE < new Date().getTime()) {
        return true;
    }

    callTimeOut.username = new Date();
    return false;
}

app.post('/judge/call', function (request, response) {
    const call = req.body;
    
    if (bounce(call.username)) {
        response.json({called : false})
        response.end();
    }
    
    process.emit('judge', call);
    response.json({called : true})
    response.end();
})

app.get('/judge/count', function (request, response) {
    res.json({
        activeJudges : process.activeJudges
    });

});

app.listen(BOT_WEBHOOK_PORT);