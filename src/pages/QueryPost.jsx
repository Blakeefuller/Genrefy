import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import Spinner from '../components/Spinner'

const userId = 1234

export default function Post() {
    const [ title, setTitle ] = useState("")
    const [ body, setBody ] = useState("")

    const mutation = useMutation({
        mutationFn: newPost => fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost)
            }
        ),
        onSuccess: () => {
            /* cache invalidation */
        }
    })

    return (
        <form onSubmit={e => {
            e.preventDefault()
            if (title && body && userId) {
                // mutation.mutate({
                //     title: title,
                //     body: body,
                //     userId: userId
                // })
                mutation.mutate({ title, body, userId })
            }
        }}>
            <div>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} />
            </div>
            <div>
                <button>Submit</button>
                {mutation.isPending && <Spinner />}
                {mutation.isSuccess && (
                    <span>Post successfully created!</span>
                )}
                {mutation.isError && (
                    <span>An error occurred: {mutation.error.message}</span>
                )}
            </div>
        </form>
    )
}
