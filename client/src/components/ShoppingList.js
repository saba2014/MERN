import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input, Modal
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { deleteItem, getItems, editItem } from "../actions/ItemAction";

class ShoppingList extends Component{

    state = {
      modal:false,
      name:'',
      price:'',
      id:{}
    };

    static propTypes = {
        deleteItem:PropTypes.func.isRequired,
        getItems: PropTypes.func.isRequired,
        editItem:PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getItems();
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };

    toggle = () => {
        this.setState({modal:!this.state.modal});
    };

    onEdit = (key) => {

        //Open Modal
        this.toggle();
        const { items } = this.props.item;
        items.map(({_id, name, price}) => {
            if(key === _id )   this.setState({name: name});
            this.setState({id:key}); this.setState({price:price});
               });
    };

    onSubmit = (e) => {
        e.preventDefault();

            const newItem = {
                _id: this.state.id,
                name: this.state.name,
                price:this.state.price
            };

        //Edit via editItem action
        this.props.editItem(newItem);

        //Close modal
        this.toggle();
    };

    render() {

        const { items } = this.props.item;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="post-list">
                        {items.map(({_id,name, price}) => (
                            <CSSTransition  key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ?
                                        <Button
                                            style={{float:'right'}}
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;</Button>: null
                                    }

                                    <div onClick={this.onEdit.bind(this, _id)} style={{ height:'95%', width:'92%'}}>
                                        <p>{name}</p>
                                        <p>{price}</p>
                                    </div>
                                    <Modal
                                        isOpen={this.state.modal}
                                        toggle={this.toggle}
                                    >
                                        <ModalHeader toggle={this.toggle}>Edit single Item</ModalHeader>
                                        <ModalBody>
                                            <Form onSubmit={this.onSubmit}>
                                                <FormGroup>
                                                    <Label for="name">Name</Label>
                                                    <Input
                                                        defaultValue = {this.state.name}
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder="Add name"
                                                        onChange={this.onChange}
                                                    />
                                                    <Label for="price">Price</Label>
                                                    <Input
                                                        defaultValue = {this.state.price}
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
                                                        Edit Item
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                    </Modal>

                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}



const mapStateToProps = state => ({
 item: state.item,
 isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{getItems, deleteItem, editItem})(ShoppingList);