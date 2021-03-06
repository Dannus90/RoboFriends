import React, { Component } from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import ErrorBoundry from "../Components/Error.Boundry";
import Scroll from "../Components/Scroll";
import axios from "axios";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: "",
        };
    }

    componentDidMount() {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                this.setState({ robots: response.data });
            });
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    };

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        return !robots.length ? (
            <h1>Loading...</h1>
        ) : (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />;
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
}

export default App;
