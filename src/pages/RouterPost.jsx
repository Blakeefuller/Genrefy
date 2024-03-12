import { useState } from 'react'
import { Form, useActionData } from 'react-router-dom'

const userId = 1234

export async function action({ request, params }) {
    const data = Object.fromEntries(await request.formData())
    console.log("== action was called, data:", data)
    return fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
    )
}

export default function Post() {
    const response = useActionData()
    console.log("== response:", response)
    return (
        <Form method="POST">
            <input type="hidden" name="userId" value={userId} />
            <div>
                <input placeholder="Title" name="title" />
            </div>
            <div>
                <textarea placeholder="Body" name="body" />
            </div>
            <div>
                <button>Submit</button>
            </div>
        </Form>
    )
}
