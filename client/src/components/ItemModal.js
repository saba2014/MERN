import React, { Component } from 'react';
import { connect } from "react-redux";
import { addItem } from "../actions/ItemAction";
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';




class  ItemModal extends Component{

    state = {
        modal:false,
        name:'',
        price:''
    };

    static propTypes = {
         isAuthenticated: PropTypes.bool
    };

     onChange = (e) => {
       this.setState({[e.target.name]: e.target.value})
     };


    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
           name: this.state.name,
           price:this.state.price
        };

        // Add post via addPost action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    };





    render() {
        return(
            <div>
                { this.props.isAuthenticated ?
                <Button
                    className="ml-4 mb-2"
                    color="dark"
                    onClick={this.toggle}>
                    Add Post
                </Button> :<h4 className="mb-3 ml-4 small left">Please log in to manage to items</h4> }


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Item List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input

                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Add name"
                                    onChange={this.onChange}
                                />
                                <Label for="price">Price</Label>
                                <Input

                                    type="text"
                                    name="price"
                                    id="price"
                                    placeholder="Add price"
                                    onChange={this.onChange}
                                />
                               <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    item:state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {addItem})(ItemModal);