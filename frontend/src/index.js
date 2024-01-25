const tasksList = document.querySelector('.tasks-list')

function createTask(task) {
    const template = document.querySelector('#task').content.cloneNode(true)

    template.querySelector('.task__title').textContent = task.name

    return template
}

fetch('http://localhost:3000/tasks')
    .then((data) => data.json())
    .then((tasks) => {
        tasks.forEach(task => {
            const taskTemplate = createTask(task)

            tasksList.append(taskTemplate)
        });
    })
    .catch((err) => {
        console.log(err);
    })

const form = document.querySelector('.form')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputValue = event.target.querySelector('.form__input').value
    const task = {
        name: inputValue,
        compeleted: false,
    }

    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then((data) => data.json())
    .then((task) => {
        const taskTemplate = createTask(task)

        tasksList.append(taskTemplate)
    })
})