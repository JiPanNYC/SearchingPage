import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { fetchSearchPost, fetchSearchQuery } from '../../actions/UserSearching/actions';
import {isLoaded} from '../../redux/modules/usersearching.js';
import { asyncConnect } from 'redux-async-connect';
import { Loader } from 'components';
import { InfiniteScroller } from 'containers';
import { Col } from 'react-bootstrap';
import { UserSearchingResultItem } from 'components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(fetchSearchPost()));
    }
    return Promise.all(promises);
  }
}])

@connect(
  state => ({
    usersearching: state.usersearching.searchingresult,
  }))

export default class UserSearchingPage extends Component {
  constructor(props) {
    super(props);
    const rawData = this.props.searchingresult;
    const favoriteFruits = this.createFieldList(rawData,'favoriteFruit');
    const genders = this.createFieldList(rawData,'gender');
    const eyeColors = this.createFieldList(rawData,'eyeColor');

    this.state = {
          workingvalue:'',
          favoriteFruit_value: [],
          gender_value:[],
          eyeColor_value:[],
          favoriteFruit_Options: favoriteFruits,
          gender_Options: genders,
          eyeColor_Options: eyeColors,
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectFavoriteFruitChange = this.handleSelectFavoriteFruitChange.bind(this);
    this.handleSelectGenderChange = this.handleSelectGenderChange.bind(this);
    this.handleSelectEyeColorChange = this.handleSelectEyeColorChange.bind(this);

  }

  createFieldList(rawData, field) {
    const rawFavoriteFruits = [];
    for (let rowid=0; rowid < rawData.length; rowid++) {
        rawFavoriteFruits.push(rawData[rowid][field]);
    }
    const favoriteFruitsSet = new Set(rawFavoriteFruits);
    const favoriteFruitsArray = Array.from(favoriteFruitsSet);
    for (let index=0; index<favoriteFruitsArray.length; index++) {
       if (favoriteFruitsArray[index] == null) favoriteFruitsArray.splice(index,1);
    }
    const favoriteFruits = [];
    for (let index=0; index<favoriteFruitsArray.length; index++) {
      favoriteFruits.push({label: favoriteFruitsArray[index], value: favoriteFruitsArray[index]});
    }
    return favoriteFruits;
  }

  handleSubmit () {
    const workingvalue = this.state.workingvalue == undefined ? this.state.workingvalue : this.state.workingvalue.split(" ");
    const favoriteFruit_value = this.state.favoriteFruit_value.map((item)=>{ const valueArray = [];valueArray.push(item.value);return valueArray;})
    const gender_value = this.state.gender_value != null ? this.state.gender_value.value : undefined;
    const eyeColor_value = this.state.eyeColor_value != null ? this.state.eyeColor_value.value : undefined;
    return this.props.dispatch(fetchSearchQuery(workingvalue, favoriteFruit_value, gender_value, eyeColor_value));
  }

  handleChange(e) {
    this.setState({workingvalue: e.target.value});
  }

  handleSelectFavoriteFruitChange (favoriteFruit_value) {
    this.setState({ favoriteFruit_value });
  }

  handleSelectGenderChange (gender_value) {
    this.setState({ gender_value });
  }

  handleSelectEyeColorChange (eyeColor_value) {
    this.setState({ eyeColor_value });
  }

  render() {
    const userSearchText = "User Infomation Searching";
    const noresultText = "No such results, Please Search again";
    const results = (searchPostList) => searchPostList.length == 0 ? <div className='no_results'>{noresultText}</div> : <InfiniteScroller dataArray = {searchPostList.map((item, i) => <UserSearchingResultItem key={i} item={item} />)} />;

    const userSearchingForm =
      <div className="usersearchingform_container">
        <div className="form-group">
          <div className="search-bar col-md-6 col-sm-12">
            <input type="text" className="form-control" name="keyword" placeholder="type key words" key={1} onChange={this.handleChange}/>
          </div>
          <div className="search-bar col-md-6 col-sm-12">
            <Select  
              multi={true}
              value={this.state.favoriteFruit_value} 
              placeholder="Select users' favorite Fruit" 
              options={this.state.favoriteFruit_Options} 
              onChange={this.handleSelectFavoriteFruitChange}
              key={1} 
            />
          </div> <br/>
          <div className="search-bar col-md-6 col-sm-12">
            <Select  
              multi={false}
              value={this.state.gender_value} 
              placeholder="Select users' gender" 
              options={this.state.gender_Options} 
              onChange={this.handleSelectGenderChange}
              key={2}  
            />
          </div>
          <div className="search-bar col-md-6 col-sm-12">
            <Select  
              multi={false}
              value={this.state.eyeColor_value} 
              placeholder="Select users' eyecolor" 
              options={this.state.eyeColor_Options} 
              onChange={this.handleSelectEyeColorChange} 
              key={3} 
            />
          </div>
          <div className="search-btn col-md-2 col-sm-12">
            <button className="btn btn-success" onClick={this.handleSubmit}>
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>;

    return (
      <div className="user_searching container">
        <Col xs={12} md={12}>
          <div className = "references">
                Data is randomly generated from <a href = 'http://www.json-generator.com/'><u>http://www.json-generator.com/</u></a>
            </div>
          <div className="section-header underlined-section"><span>{userSearchText}</span></div>
          <div className="user searching">
            {userSearchingForm}
          </div>
          <div className="userResultList">
            {results(this.props.usersearching)}
          </div>
        </Col>
      </div>
    );
  }
}
