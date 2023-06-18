export async function getAllTasks() {
    const response = await fetch(`/api/getTask`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
    const data = await response.json()
    return data
}

export async function createTask(task) {
    const response = await fetch(`/api/setTask`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(task)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}