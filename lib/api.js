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

// Event Functions

export async function getAllEvents() {
    const response = await fetch(`/api/event/readAllEvent`, {
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

export async function getAllUsers() {
    const response = await fetch(`/api/user/readAllUsers`, {
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

export async function getEventById(id) {
    const response = await fetch(`/api/event/read/${id}`, {
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

export async function createEvent(event) {
    const response = await fetch(`/api/event/createEvent`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(event)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deleteEvent(id) {
    const response = await fetch(`/api/event/delete/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}

// Ticket Functions

export async function getAllTicketsByUserId(id) {
    const response = await fetch(`/api/ticket/read/${id}`, {
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

export async function createTicket(ticket) {
    const response = await fetch(`/api/ticket/createTicket`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(ticket)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

// User Functions

export async function getUserById(id) {
    const response = await fetch(`/api/user/read/${id}`, {
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

export async function createUser(user) {
    const response = await fetch(`/api/user/createUser`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deleteUser(id) {
    const response = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}

export async function updateUser(user) {
    const response = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}