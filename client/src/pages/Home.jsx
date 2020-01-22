import React, { useState, useCallback } from "react"
import { useQuery } from "@apollo/react-hooks"
import Search from "#src/antd/Search"
import gql from "graphql-tag"
import graphlClient from "#src/api/graphql"
import _ from "lodash"
import { Tag, Tooltip, AutoComplete } from "antd"
import { Link } from "react-router-dom"

const STATUS_TO_COLOR = {
    COMPLETED: "green",
    ONGOING: "blue",
    SUSPENDED: ""
}
const query = gql`
    query($keyword: String!) {
        mangas(keyword: $keyword) {
            id
            title
            status
        }
    }
`
const sanitiseTitle = title =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-{2,}/g, "-")

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const { data, loading } = useQuery(query, {
        skip: searchQuery.length < 3,
        variables: { keyword: searchQuery }
    })

    const handleChange = useCallback(
        _.throttle(searchQuery => {
            setSearchQuery(searchQuery)
        }, 500),
        [setSearchQuery]
    )

    const dataSource =
        !loading &&
        data &&
        data.mangas &&
        data.mangas.map(manga => (
            <AutoComplete.Option key={manga.id} value={manga.title}>
                <Link to={`${manga.id}-${sanitiseTitle(manga.title)}`}>
                    <Tooltip
                        mouseEnterDelay={0.5}
                        placement="topLeft"
                        title={manga.title}
                    >
                        {manga.title}
                    </Tooltip>
                    <Tag color={STATUS_TO_COLOR[manga.status]}>
                        {manga.status}
                    </Tag>
                </Link>
            </AutoComplete.Option>
        ))

    return (
        <div className="main-search-container">
            <Search dataSource={dataSource} onChange={handleChange} />
        </div>
    )
}

export default Home
