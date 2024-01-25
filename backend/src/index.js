const fs = require('fs/promises')
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const app = express()


app.use(bodyParser.json()) // надо скачать body parser или console.log(req.body) будет давать undefinded

app.get('/tasks', async (req, res) => {
    try {
        const data = await fs.readFile('./tasks.json')
        const content = data.toString('utf-8')

        res.setHeader('Access-Control-Allow-Origin', '*' /* или localhost:8080 вместо '*' */)
        res.send(content)
    } catch (error) {
        res.send(error)
    }
})

app.options('/tasks', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.send()
})

app.post('/tasks', (req, res) => {
    const id = crypto.randomBytes(16).toString('hex')
    const task = {...req.body, id} // распаковываем и добавляем поле id аналогично task.id = id

    fs.readFile('./tasks.json')
        .then((data) => {
            const taskList = JSON.parse(data.toString('utf-8'))

            taskList.push(task)

            fs.writeFile('./tasks.json', JSON.stringify(taskList))
                .then(() => {
                    res.setHeader('Access-Control-Allow-Origin', '*')
                    res.status(201)
                    res.send(task)
                })
                .catch(() => {
                    res.status(403)
                    res.send()
                })
        })
        .catch((err) => {
            res.send(err)
        })
})

app.listen(3000)