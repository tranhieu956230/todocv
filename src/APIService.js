
export const getList = () => {
    const url = 'https://todo11235.herokuapp.com/todo';
    const request = new Request(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    });
    return fetch(request)
        .then(response => response.json())
}

export const createTodo = (text) => {
    const url = 'https://todo11235.herokuapp.com/todo';
    const request = new Request(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            todo: text,
           
        })
    });
    console.log('create todo')
    return fetch(request)
        .then(response => response.json())

}
export const deleteTodo = (id) => {
    const url = 'https://todo11235.herokuapp.com/todo/' + id;
    const request = new Request(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });

    return fetch(request)
        .then(response => response.json())

}
export const complete = (id) => {
    const url = 'https://uetcc-todo-app.herokuapp.com/draft/' + id + "/toggle";
    console.log(url);
    const request = new Request(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',

    });

    return fetch(request)
        .then(response => response.json())

}