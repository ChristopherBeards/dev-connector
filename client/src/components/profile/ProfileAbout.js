import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">John's Bio</h3>
            <p className="lead">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Provident fuga cum necessitatibus blanditiis vel, officia facere
              porro esse numquam assumenda doloremque saepe aliquam nemo
              excepturi aliquid maiores! Excepturi, libero repudiandae.
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                <div className="p-3">
                  <i className="fa fa-check" /> HTML
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> CSS
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> JavaScript
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> Python
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> C#
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
