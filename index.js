const express = require('express')
const cors = require ('cors')
const app = express()
const port = 3000

app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))// for parsing application/x-www-form-urlencoded

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//     app.options('*', (req, res) => {
//         res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
//         res.send();
//     });
// });
//


const testdata = [
    {
        id: '1',
        name: 'leadit bot',
        description: 'leadit you',
        image: {},
        preview: {},
        date: 'Date Sat Oct 31 2020 19:38:00 GMT+0200 (Eastern European Standard Time)',
    },
    {
        id: '2',
        name: 'cnn bot',
        description: 'cnn',
        image: {},
        preview: {},
        date: 'Date Sat Oct 31 2020 19:38:00 GMT+0200 (Eastern European Standard Time)',
    },
    {
        id: '3',
        name: 'news bot',
        description: 'news you',
        image: {},
        preview: {},
        date: 'Date Sat Oct 31 2020 19:38:00 GMT+0200 (Eastern European Standard Time)',
    },
];

app
    .get('/botslist', (req, res) => {
        try {
            res.send(JSON.stringify(testdata))
        } catch (e) {
            res.status(400).send(e)
        }
    })
    .post('/newbot', (req, res) => {
        console.log(res.json(req.body))
        try {
            testdata.push(res.json(req.body))
        } catch (e) {
            res.status(400).send(e)
        }
    })
    .put('/changebot', (req, res) => {
        console.log(res.json(req.body))
        try {
            const bot = res.json(req.body)
            const index = testdata.findIndex(item => item.id === bot.id)
            testdata.splice(index, 1, bot)
        } catch (e) {
            res.status(400).send(e)
        }
    })
    .delete('/delete', (req, res) => {
        try {
            const data = res.json(req.body)
            const index = testdata.findIndex(item => item.id === data)
            testdata.splice(index, 1)
        } catch (e) {
            res.send(e)
        }
    })


app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
})