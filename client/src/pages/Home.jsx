import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import Search from "#src/antd/Search"
import gql from "graphql-tag"

const query = gql`
    query($keyword: String!) {
        mangas(keyword: $keyword) {
            id
            title
        }
    }
`

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const { data, loading } = useQuery(query, {
        variables: { keyword: searchQuery }
    })

    return (
        <div className="main-search-container">
            <Search
                onChange={searchQuery => {
                    setSearchQuery(searchQuery)
                }}
            />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default Home
