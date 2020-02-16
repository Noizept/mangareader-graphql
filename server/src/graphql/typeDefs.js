const gql = require("apollo-server-express").gql

const typeDefs = gql`
    enum MangaStatus {
        COMPLETED
        ONGOING
        SUSPENDED
    }

    scalar Date

    type Manga {
        id: ID!
        image: String
        title: String!
        hits: String
        lastUpdated: Date!
        info: MangaInfo
        status: MangaStatus
    }

    type MangaInfo {
        chapters: [Chapter!]!
        id: ID!
    }

    type Chapter {
        id: ID!
        title: String!
        lastUpdated: Date!
        number: String!
        images: [ChapterImage!]!
    }

    type ChapterImage {
        height: Int!
        width: Int!
        url: String!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "mangas" query returns an array of zero or more Manga (defined above).
    type Query {
        mangas(keyword: String): [Manga!]!
        manga(id: ID!): Manga!
    }
`
module.exports = typeDefs
