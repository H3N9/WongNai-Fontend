import React, { useState, useEffect } from "react"
import {
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation,
} from "react-router-dom"
import Search from "./search"
import "../styles/indexStyles.css"

const Index = () => {
    const [textSearch, setTextSearch] = useState("")
    const history = useHistory()
    const query = useQuery()
    const keyword = query.get("keyword") ?? "" //checking keyword existed

    const submitHandle = (e) => {
        e.preventDefault()
        const searchParams = new URLSearchParams()
        if (textSearch) {
            searchParams.append("keyword", textSearch)
        } else {
            searchParams.delete("keyword")
        }
        history.push({ search: searchParams.toString() })
    } // set search text on params URL

    useEffect(() => {
        setTextSearch(keyword)
    }, [keyword]) // listening keyword when tag's clicked or press enter

    return (
        <>
            <div id="header-box" className="dogeText">
                <h1>เที่ยวไหนดี</h1>
            </div>

            <div id="seach-bar">
                <form onSubmit={submitHandle} id="seach-bar-box">
                    <input
                        id="search"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                        placeholder="หาที่เที่ยวแล้วไปกัน..."
                    />
                </form>
            </div>

            <Switch>
                <Route exact path="/">
                    <Redirect to="/trips" />
                </Route>

                <Route path="/trips">
                    <Search />
                </Route>
            </Switch>
        </>
    )
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

export default Index
