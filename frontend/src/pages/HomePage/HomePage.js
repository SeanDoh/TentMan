import { Component } from 'react';
import ClimateSensor from '../../components/ClimateSensor/ClimateSensor';
import ClimateGraph from '../../components/ClimateGraph/ClimateGraph';
import Camera from '../../components/Camera/Camera';

export default class HomePage extends Component {
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
      <div id='HomePage' className='flex p-2'>
        <div className='flex md:flex-row flex-col items-center justify-center xl:flex-row'>
          <div className='flex flex-col'>
            <ClimateSensor demo={process.env.REACT_APP_IS_DEMO}/>
            <ClimateGraph refresh={this.state.refresh} demo={process.env.REACT_APP_IS_DEMO} />
          </div>
          <Camera  demo={process.env.REACT_APP_IS_DEMO} name='grow-tent-1' source='http://192.168.0.211/stream' width='640' height='480'/>
        </div>
      </div>
    );
  }
}