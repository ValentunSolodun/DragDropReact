import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { loginAction } from '../../actions/user';

const Login = (props) => {
    return (
        <div className="form_wrapper">
            <form onSubmit={props.login}>
                <div className="form_item">
                    <label htmlFor="">Email</label>
                    <input type="email" id="email_login"/>
                </div>
                <div className="form_item">
                    <label htmlFor="">Password</label>
                    <input type="password" id="password_login"/>
                </div>
                <div className="form_item">
                    <input className="waves-effect waves-light btn" type="submit" value="Login"/>
                </div>
            </form>
        </div>
    );
}


let userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = (state) => ({
    user: userSelector(state)
});

const mapDispatchToProps = dispatch => ({
    login: e => dispatch(loginAction(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);