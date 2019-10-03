import React from "react";
import { Table, Card, Row, Col} from "react-materialize";
import ButtonsCard from "./buttonsCard/buttonsCard";
import styles from "./Table.module.css";
import FromAddItem from "./formAddItem/formAddItem";
import MyInput from "../myInput/myInput"

import { Link } from "react-router-dom";

const Tables = (props) => {
        console.log(props);
        let {
            items,
            Container,
            type,
            url_id
        } = props;

        return (
            <div className={`${type} container_my`}>
                <FromAddItem url_id={url_id} type={type}/>
                <Row className={styles.row_background}>
                    {
                        items.length ? items.map((item, i) => <Col key={i} xl={3} m={12} s={12}>
                            <Link to={`/${type}/${item.id}`}>
                                <Container item={item} i={i}/>
                            </Link>
                        </Col>) : <div className={styles.empty_container}>Empty</div>
                    }
                </Row>
            </div>

        )
}

export default Tables;