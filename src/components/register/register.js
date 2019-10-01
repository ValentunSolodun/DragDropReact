import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { registerAction } from '../../actions/user';
import './register.css';

const Register = (props) => {
    return (
        <div className="form_wrapper row">
            <form className="col" onSubmit={props.registration}>
                <div className="form_item">
                    <label htmlFor="name_register">Name</label>
                    <input type="text" id="name_register"/>
                </div>
                <div className="form_item">
                    <label htmlFor="email_register">Email</label>
                    <input type="email" id="email_register"/>
                </div>
                <div className="form_item">
                    <label htmlFor="password_register">Password</label>
                    <input type="password" id="password_register"/>
                </div>
                <div className="form_item">
                    <input className="waves-effect waves-light btn" type="submit" value="Register"/>
                </div>
            </form>
        </div>
    );
};

let userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = (state) => ({
    user: userSelector(state)
});

const mapDispatchToProps = dispatch => ({
    registration: e => dispatch(registerAction(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);