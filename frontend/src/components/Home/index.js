import React, { Component } from 'react';
import styles from '../../styles/Home.module.css';
import Flexbox from 'flexbox-react';
import Progress from './Progress';
import TimeRange from './TimeRange';
import ImpactStatement from './ImpactStatement';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      emissions: 0,
      cost: 0,
      offset: 0,
      breakdown: null,
      timeRange: 30
    };
    this.getBreakdown = this.getBreakdown.bind(this);
  }
  getBreakdown(timeRange) {
    window
      .fetch('/breakdown/' + timeRange.toString())
      .then(response => response.json())
      .then(data => {
        const emissions = data['emission'];
        const cost = data['cost'];
        const offset = data['offset'];
        const breakdown = data['breakdown'];
        this.setState({ emissions, cost, offset, breakdown });
      });
  }
  componentDidMount() {
    this.getBreakdown(this.state.timeRange);
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <div className={styles.timeRange}>
          <TimeRange getBreakdown={this.getBreakdown} />
        </div>

        <div>
          <Progress emissions={this.state.emissions} offset={this.state.offset}/>
        </div>
        <Flexbox minHeight="100vh" justifyContent="space-around">
          <Flexbox element="header" height="60px">
            Emissions
          </Flexbox>
          <Flexbox>
            <ImpactStatement />
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

export default Home;
