import React, { Component, Fragment  } from 'react';
import { connect } from 'react-redux';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    } from 'reactstrap';
import PropTypes from 'prop-types';
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";


class AppNavBar extends Component{
    state = {
        isOpen:false
    };

    static propTypes = {
      auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen})  ;
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
                <Fragment>
                    <NavItem>
                        <span className="navbar-text mr-3">
                            <strong>{user ? `Welcome ${user.name}`:''}</strong>
                        </span>
                    </NavItem>
                    <NavItem>
                        <Logout/>
                    </NavItem>
                </Fragment>
            );
        const guestLinks = (
            <Fragment>
                <NavItem >
                    <RegisterModal/>
                </NavItem>
                <NavItem >
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );


        return(
            <div>
                <Navbar color="dark" expand="md" className="mb-3">
                    <NavbarBrand href="/">MyApp</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authLinks: guestLinks }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }

}


const mapStateToProps = state => ({
    item: state.item,
    auth: state.auth
});


export default connect(mapStateToProps,{})(AppNavBar);

