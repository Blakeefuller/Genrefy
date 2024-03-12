import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import ErrorContainer from '../components/ErrorContainer'
import Spinner from '../components/Spinner'

export default function Search() {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const query = searchParams.get("q")
    const [ inputQuery, setInputQuery ] = useState(query || "")

    const { fetchStatus, isLoading, error, data } = useQuery({
        queryKey: [ "searchRepos", query ],
        queryFn: async () => {
            console.log("== query function called")
            // throw new Error("woops!")
            const res = await fetch(
                `https://api.github.com/search/repositories?q=${query}`
            )
            return res.json()
        }
    })

    console.log("== isLoading:", isLoading)
    console.log("== fetchStatus:", fetchStatus)

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
            }}>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <h2>Search query: {query}</h2>
            {error && <ErrorContainer>Error: {error.message}</ErrorContainer>}
            {isLoading && <Spinner />}
            <ul>
                {data?.items && data.items.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url}>{repo.full_name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
