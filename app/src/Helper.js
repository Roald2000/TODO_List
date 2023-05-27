let baseUrl = "http://localhost:3309";

let MakeRequest = {
    fetchData: (route) => {
        return new Promise((resolve, reject) => {
            try {
                const data = fetch(`${baseUrl}${route}`, {
                    method: 'GET'
                }).then(response => response.json());
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    },

    deleteData: (route) => {
        return new Promise((resolve, reject) => {
            try {
                const data = fetch(`${baseUrl}${route}`, {
                    method: 'DELETE'
                }).then(response => response.json());

                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    },

    insertData: (route, payload) => {
        return new Promise((resolve, reject) => {
            try {
                const data = fetch(`${baseUrl}${route}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).then(response => response.json());

                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    },

    updateData: (route, payload) => {
        return new Promise((resolve, reject) => {
            try {
                const data = fetch(`${baseUrl}${route}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).then(response => response.json());
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    },

}


// Modal Show/Hide Functions
const openModal = (id) => {
    const modal_id = document.getElementById(id);
    modal_id.showModal();
}

const closeModal = (id) => {
    const modal_id = document.getElementById(id);
    modal_id.close();

}

export {
    MakeRequest,
    openModal,
    closeModal
};