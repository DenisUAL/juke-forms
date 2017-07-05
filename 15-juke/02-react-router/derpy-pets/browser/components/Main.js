import React from "react";
import AnimalsList from "./AnimalsList";
import NotFound from "./NotFound";
import About from "./About";
import AnimalProfile from "./AnimalProfile";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { catsData, dogsData } from "../../data";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: catsData,
      dogs: dogsData
    };
  }

  componentDidMount() {
    const currLocation = location.hash.substr(1);
    console.log("currLocation", currLocation);
    this.setState({ activeView: currLocation });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src="/logo.png" className="App-logo" alt="logo" />
            <h3>derpy pets</h3>
          </div>

          <div className="container cat-or-dog">
            <div className="row">
              <Link to="/cats" className="btn-flat btn-large col s5">
                I WANT A MEOWER
              </Link>
              <Link
                to="/dogs"
                className="btn-flat btn-large col s5 offset-s2"
                onClick={this.navigateToBarkers}>
                I WANT A BARKER
              </Link>
            </div>
          </div>

          <div className="App-content container-fluid">
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  <AnimalsList
                    animals={[...this.state.cats, ...this.state.dogs]}
                    view="All Cuties"
                  />}
              />
              <Route
                path="/dogs"
                render={() =>
                  <AnimalsList animals={this.state.dogs} view="Who let the dogs out?" />}
              />
              <Route
                path="/cats"
                render={() => <AnimalsList animals={this.state.cats} view="Ownnn" />}
              />
              <Route
                path="/profile/:id"
                render={({ match }) =>
                  <AnimalProfile
                    allAnimals={[...this.state.cats, ...this.state.dogs]}
                    id={match.params.id}
                  />}
              />
              <Route path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Main;
