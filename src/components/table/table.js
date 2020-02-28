import React, {Component} from "react";
import {Row, Col, Preloader} from "react-materialize";
import styles from "./Table.module.css";
import FromAddItem from "./formAddItem/formAddItem";
import {history} from "../../helpers/history";
import {Link} from "react-router-dom";

class Tables extends Component {
  render() {

    let {
      items,
      Container,
      type,
      project_id
    } = this.props;


    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = items[dragIndex];
      this.props.dispatch({type: 'CARDMOVE', payload: {dragCard, dragIndex, hoverIndex}})
    }

    let pathName = history.location.pathname === '/' ? '' : history.location.pathname;

    return (
      <div className={`${type} container_my`}>
        <FromAddItem project_id={project_id} type={type}/>
        <Row className={styles.row_background}>
          {
            items.length ? items.map((item, i) => <Col key={i} xl={3} m={12} s={12}>
              {item.edit || type === 'statuses'
                ? <Container moveCard={moveCard} type={type}
                             item={item} i={i}/>
                : (
                  <Link to={`${pathName}/${type}/${item.id}`}>
                    <Container type={type} item={item} i={i}/>
                  </Link>
                )
              }
            </Col>) : <div className={styles.empty_container}>
              <Col s={4}>
                <Preloader size="big"/>
              </Col>
            </div>
          }
        </Row>
      </div>

    )
  }
}


export default Tables;
