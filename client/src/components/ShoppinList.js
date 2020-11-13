import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../redux/actions/itemActions";
import PropTypes from "prop-types";

class ShoppinList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id); //comes from the import (actions) in REDUX
  };
  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shoppinglist">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem className="listItem" style={{ margin: 10 }}>
                  <Button
                    color="danger"
                    className="remove-btn float-right"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppinList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

//map the props into the app to make it available everywhere
const mapStateToProps = (state) => ({
  item: state.item,
});

//connect with redux state
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppinList);
