const FIRST_DAY = moment([2015,7,31]);
const LAST_DAY = moment([2016,5,1]);
const TOTAL_TIMESPAN = LAST_DAY.diff(FIRST_DAY);

const URL = '/static/dash-data.json';

class ClubBox extends React.Component {
  constructor() {
    super();
    let now = moment();
    let elapsed = now.diff(FIRST_DAY);
    this.state = {
      elapsed,
      clubs: []
    }
  }
  tick() {
    this.setState({
      elapsed: this.state.elapsed + 1000
    });
  }
  componentDidMount() {
    $.get(URL, (data) => {
      this.setState({
        clubs: data
      });
    });
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    let createBox = (club, index) => {
      return (
        <div className='col-sm-4' key={index + club.name}>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h2 className='panel-title'>{club.name}</h2>
            </div>
            <div className='panel-body'>
              You should have about <code>{Math.round(this.state.elapsed / TOTAL_TIMESPAN * club.required * 10e7) / 10e7}</code> {club.creditsWord}.  You need {club.required} {club.creditsWord} in total.
              <br/>
              <br/>
              <a className={club.creditSheet?"btn btn-info":"btn btn-info disabled"} href={club.creditSheet} target="_blank">
                View Credit Sheet&nbsp;&nbsp;<i className="fa fa-share"></i>
              </a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="jumbotron" id="content">
        <div className="container" id="main">
          <h1>
            Club Dashboard&nbsp;&nbsp;
            <a href='/' className='btn btn-lg btn-success'>
              Credit Sheet Search&nbsp;&nbsp;
              <i className="fa fa-share"></i>
            </a>
            &nbsp;
            <a href='/gradecalculator' className='btn btn-lg btn-warning'>
              Final Grade Calculator&nbsp;&nbsp;
              <i className="fa fa-share"></i>
            </a>
          </h1>
          <p>We are about <code>{Math.round(this.state.elapsed / TOTAL_TIMESPAN * 10e7) / 10e5}%</code> through the year.</p>
          <br/>
          <div className="row">
            {this.state.clubs.sort((a,b) => {
              // Alphabetize clubs
              return a.name.localeCompare(b.name);
            }).map(createBox)}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ClubBox/>, document.getElementById('app'));