import { Component } from 'react';
import './ClimateSensor.css';
import { Thermometer, Drop, ArrowClockwise, SpinnerGap, Clock } from 'phosphor-react';

class ClimateSensor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: false,
      sensor_name: '',
      temperature: '',
      humidity: '',
      date_read: '',
      flash: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.type === 'mousedown') {
      this.setState({
        flash: true
      })
    }
    else {
      this.setState({
        flash: false
      })
    }
  }

  async callAPI() {
    try {
      if (this.props.demo){
        return demoGen();
      }
      else{
        const response = await fetch('/climatesensor');
        return await response.json();
      }
    } catch (error) {
      return error;
    }
  }

  async componentDidMount() {
    const res = await this.callAPI();
    const data = res.data;
    console.log(data)
    const apiResponse = true;
    const { date_read, sensor_name, temperature, humidity } = data;
    this.setState({ date_read, apiResponse, sensor_name, temperature, humidity });
  }

  async componentDidUpdate(prevProps, prevState){
    if (prevState.flash !== this.state.flash){
      const res = await this.callAPI();
      const data = res.data;
      const apiResponse = true;
      const { date_read, sensor_name, temperature, humidity } = data;
      this.setState({ date_read, apiResponse, sensor_name, temperature, humidity });
    }
  }

  render() {
    let className = this.state.flash ?
    'shadow-inner cursor-pointer select-none flex flex-row p-1 mb-1 shadow-xl justify-center' :
    'cursor-pointer select-none flex flex-row p-1 mb-1 shadow-xl justify-center'
    let ClimateSensor;
    let date = new Date(this.state.date_read);
    date.setHours(date.getHours() - 4);
    if (this.state.apiResponse) {
      ClimateSensor =
        <div onMouseDown={this.handleClick} onMouseUp={this.handleClick} className={className}>
          <div className='flex flex-row justify-between items-center bg-gray-700 p-2 m-1'>
            <ArrowClockwise weight='bold' />
          </div>
          <div className='flex items-center justify-between bg-gray-700 p-2 m-1'>
            <Clock weight='bold' />
            <p className='ml-1'>
              {date.toISOString().split('T')[1].substring(0, 5)}
            </p>
          </div>
          <div className='flex items-center justify-between bg-gray-700 p-2 m-1'>
            <Thermometer weight='bold' />
            <p className='ml-1'>
              {this.state.temperature} F
            </p>
          </div>
          <div className='flex items-center justify-between bg-gray-700 p-2 m-1'>
            <Drop weight='bold' />
            <p className='ml-1'>
              {this.state.humidity} %
            </p>
          </div>
        </div>
    }
    else{
      ClimateSensor = 
      <div className={className}>
        <SpinnerGap className='animate-spin' size={50}/>
      </div>
    }
    return (
      <>
        {ClimateSensor}
      </>
    );
  }
}

export default ClimateSensor;

function demoGen(){
  return { 
    data: {
      date_read: new Date(),
      temperature: getRandomInt(60,90),
      humidity: getRandomInt(40,100)
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}