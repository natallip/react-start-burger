import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";
import sampleBurgers from "../sample-burgers";

class App extends React.Component {
  state = {
    burgers: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.restaurantId);

    if (localStorageRef) this.setState({ order: JSON.parse(localStorageRef)});

    // this.ref = base.sync(`${params.restaurantId}/burgers`, {
    //   context: this,
    //   state: 'burgers'
    // });
  };

  componentDidUpdate() {
    const { params } = this.props.match;

    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
  };

  addBurger = (burger) => {
    const burgers = { ...this.state.burgers };
    burgers[`burger${Date.now()}`] = burger;
    this.setState({ burgers });
  };

  updateBurger = (key, updatedBurger) => {
    const burgers = { ...this.state.burgers };

    burgers[key] = updatedBurger;
    this.setState({ burgers });
  }

  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers });
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  render() {
    return (
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Very Hot Burger" />
          <ul className="burgers">
            {Object.keys(this.state.burgers).map((key) => {
              return (
                <Burger
                  key={key}
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.burgers[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order burgers={this.state.burgers} order={this.state.order} />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSampleBurgers={this.loadSampleBurgers}
          burgers={this.state.burgers}
          updateBurger={this.updateBurger}
        />
      </div>
    );
  }
}

export default App;
