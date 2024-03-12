import { useParams, useLoaderData, useNavigation } from 'react-router-dom'

export function loader({ request, params }) {
    return fetch(`https://api.github.com/orgs/${params.org}/repos`)
}

export default function OrgRepos() {
    const { org } = useParams()
    const repos = useLoaderData()
    const { state } = useNavigation()

    console.log("== state:", state)

    return (
        <>
            <h1>GitHub Repos for {org}</h1>
            <main>
            <ul>
                {repos && repos.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url}>{repo.full_name}</a>
                    </li>
                ))}
            </ul>
            </main>
        </>
    )
}
