import { Component, PureComponent } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Thermometer, Drop, Clock, SpinnerGap, ArrowsClockwise } from 'phosphor-react';
import './ClimateGraph.css';

class ClimateGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiStatus: false,
      data: [],
      refresh: false,
      hours_back: '3',
      hours_options: ['1', '3', '6', '12', '24', '48', '72'],
    };

    this.handleHoursClick = this.handleHoursClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleHoursClick(e) {
    this.setState({
      hours_back: e.target.attributes['data-key'].value
    })
  }

  handleRefreshClick() {
    this.setState({
      refresh: !this.state.refresh
    })
  }

  async callAPI() {
    if(this.props.demo){
      return(demoGen(this.state.hours_back))
    }
    try {
      const response = await fetch(`/climategraph?hours_back=${this.state.hours_back}`);
      let data = await response.json();
      for (const e in data.data) {
        let date = new Date(data.data[e].date_read);
        date.setHours(date.getHours() - 4);
        data.data[e].date_read = date.toISOString().split('T')[1].substring(0, 5);
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async componentDidMount() {
    let res = await this.callAPI();
    this.setState({
      apiStatus: true,
      data: res.data
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.hours_back !== this.state.hours_back) {
      let res = await this.callAPI();
      this.setState({
        apiStatus: true,
        data: res.data
      });
    }
    if (prevState.refresh !== this.state.refresh) {
      let res = await this.callAPI();
      this.setState({
        apiStatus: true,
        data: res.data,
      });
    }
  }

  render() {
    let graph;
    if (this.state.apiStatus) {
      graph =
        <ResponsiveContainer width='99%' height={300}>
          <LineChart data={this.state.data} margin={{ top: 5, right: 5, bottom: 5, left: -30 }}>
            <Line type='monotone' dataKey='temperature' stroke='#ef4444' dot={false} />
            <Line type='monotone' dataKey='humidity' stroke='#3b82f6' dot={false} />
            <XAxis dataKey='date_read' tick={<CustomizedAxisTick />} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip content={CustomTooltip} />
          </LineChart>
        </ResponsiveContainer>
    }
    else {
      graph = <div className='flex flex-row p-4 w-full h-60 justify-center items-center'>
        <SpinnerGap className='animate-spin' size={50} />
      </div>
    }
    return (
      <div id='climate-graph' className='h-full flex flex-col'>
        <div className='flex sm:flex-row flex-col items-center sm:justify-between p-2'>
          <div className='flex flex-row items-center p-3'>
            <h2 className='font-bold text-sm sm:mb-0'>Temp vs Humidity</h2>
            <div onClick={this.handleRefreshClick} className='bg-gray-700 p-2 m-1 flex hover:shadow-inner hover:bg-gray-600'>
              <ArrowsClockwise />
            </div>
          </div>
          <HoursOptions hours_options={this.state.hours_options} hours_back={this.state.hours_back} handle_click={this.handleHoursClick} />
        </div>
        {graph}
      </div>
    );
  }
}

export default ClimateGraph;

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={8} textAnchor='end' fill='#fff' transform='rotate(-35)'>
          {payload.value}
        </text>
      </g>
    );
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip rounded-sm flex flex-col w-20 shadow-lg'>
        <div className='bg-gray-700 flex flex-row items-center justify-between m-1 p-2'>
          <Clock weight='bold' />
          <p className='ml-2'>{label}</p>
        </div>
        <div className='bg-gray-700 flex flex-row items-center justify-between m-1 p-2'><Thermometer weight='bold' />
          <p className='ml-2'>{payload[0].value}</p>
        </div>
        <div className='bg-gray-700 flex flex-row items-center justify-between m-1 p-2'><Drop weight='bold' />
          <p className='ml-2'>{payload[1].value}</p>
        </div>
      </div>
    );
  }
  return null;
};

class HoursOptions extends PureComponent {
  render() {
    const { hours_options, hours_back, handle_click } = this.props;
    let html = []
    hours_options.forEach(e => {
      if (e === hours_back) {
        html.push(
          <li key={e} data-key={e} onClick={handle_click} className='p-1 bg-gray-500 hover:bg-gray-400 hover:shadow-inner cursor-pointer mt-1 ml-1 mr-1'>{e} hr</li>
        )
      }
      else {
        html.push(
          <li key={e} data-key={e} onClick={handle_click} className='p-1 bg-gray-700 hover:bg-gray-600 hover:shadow-inner cursor-pointer mt-1 ml-1 mr-1'>{e} hr</li>
        )
      }
    });
    return (
      <ul className='select-none flex flex-row flex-wrap text-sm lg:text-base'>
        {html}
      </ul>
    )
  }
}

//{"date_read":"2021-09-17T14:57:02.000Z","temperature":"78.08","humidity":"58.00"}
function demoGen(hours_back) {

  let data_count = (hours_back * 60)/5;
  let data = { data: [] };
  for (let i = 0; i <= data_count; i++) {
    let today = new Date();
    let reading = {
      date_read: new Date(today.setMinutes(today.getMinutes() - (i * 5))).toISOString().split('T')[1].substring(0, 5),
      temperature: getRandomInt(70, 90),
      humidity: getRandomInt(40, 100)
    }
    data.data.push(reading);
  }
  return data;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}