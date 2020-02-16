import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { ApolloProvider } from "react-apollo"

import graphqlClient from "#src/api/graphql"
import Home from "#src/pages/Home"
import Manga from "#src/pages/Manga"

import "./global.less"

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
}
const App = () => {
    return (
        <div className="main-container">
            <Switch>
                <Route
                    component={Manga}
                    path="/:mangaId([a-z0-9]{24})-:mangaName([a-z0-9-]+)"
                />

                <Route component={Home} path="/" />
            </Switch>
        </div>
    )
}

render(
    <ApolloProvider client={graphqlClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("app")
)
