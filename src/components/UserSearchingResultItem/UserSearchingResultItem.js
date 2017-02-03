import React, { Component, PropTypes } from 'react';

export default class UserSearchingResultItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { item } = this.props;

    return (
      <div className="usersearchinglist_item">
        <div className="usersearching-title">
        <a href={ item.url }>{item.title}</a>
        </div>
        <div className="post-info">
          <div className="post-companyname">
             Username: {item.name}
          </div>
          <div className="description">
            Age: {item.age} | Favorite fruit: {item.favoriteFruit} | Eye color: {item.eyeColor} | Gender: {item.gender} <br/>
            Company: {item.company} | Email: {item.email} | Phone: {item.phone} <br/>
            Address: {item.address}
          </div>
        </div>
      </div>
    );
  }
}
