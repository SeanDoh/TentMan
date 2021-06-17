import { Component } from 'react';
import ClimateSensor from '../../components/ClimateSensor/ClimateSensor';
import ClimateGraph from '../../components/ClimateGraph/ClimateGraph';
import Camera from '../../components/Camera/Camera';

export default class GrowTentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false
    };

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    this.setState({
      refresh: !this.state.refresh
    })
  }

  render() {
    return (
      <div id='GrowTentPage' className='flex p-2'>
        <div className='flex md:flex-row flex-col items-center justify-center xl:flex-row'>
          <div className='flex flex-col'>
            <ClimateSensor />
            <ClimateGraph refresh={this.state.refresh} />
          </div>
          <Camera name='grow-tent-1' source='http://192.168.0.210/stream' width='640' height='480' />
        </div>
      </div>
    );
  }
}