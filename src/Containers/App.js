import React, { Component } from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import ErrorBoundry from "../Components/Error.Boundry";
import Scroll from "../Components/Scroll";
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
        const url = "https://jsonplaceholder.typicode.com/users";
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        fetch(url + proxyUrl)
            .then((response) => response.json())
            .then((users) => this.setState({ robots: users }));
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
