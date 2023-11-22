const express    = require('express');
const path       = require('path');
const config     = require(path.join(__dirname,"../config/global.json"));
const public_path    = path.join(__dirname,"../"+config.Proxy.settings.public_path);
const port       = config.Proxy.settings.port;
const app        = express();


app.use(express.static(path.join(__dirname,"../"+config.Proxy.settings.public_path)));

app.get('/stream', function (req, res) {
    res.sendFile(path.join(public_path+'/stream.html'));
});

app.get('/view', function (req, res) {
    res.sendFile(path.join(public_path+'/view.html'));
});


app.get('/', function (req, res) {
    res.sendFile(path.join(public_path+'/index.html'));
});

app.listen(port, () => console.log(
`
    [+] Proxy Server   : http://localhost:${port}
    [+] Storage Path   : ${public_path}
    [~] Running Proxy Server...

`));