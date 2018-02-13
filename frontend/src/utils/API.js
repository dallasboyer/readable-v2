const api_baseURL = "http://localhost:3001"

let token = localStorage.token
if (!token)
    token = 'gratitudeAbundantProsperity'

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const fetchPost = id =>
    fetch(`${api_baseURL}/posts/${id}`, { headers })
        .then(res => res.json())

export const fetchPosts = () =>
    fetch(`${api_baseURL}/posts`, { headers })
        .then(res => res.json())

export const fetchCategoryPosts = category =>
    fetch(`${api_baseURL}/${category}/posts`, { headers })
        .then(res => res.json())

export const deletePost = post =>
    fetch(`${api_baseURL}/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())

export const createPost = post =>
    fetch(`${api_baseURL}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...post })
    }).then(res => res.json())

export const fetchCategories = () =>
    fetch(`${api_baseURL}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const vote = (itemType, id, option) =>
    fetch(`${api_baseURL}/${ itemType === "post" ? "post" : "comment" }s/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    }).then(res => res.json())