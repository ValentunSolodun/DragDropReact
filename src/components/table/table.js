import React from "react";
import { Row, Col} from "react-materialize";
import styles from "./Table.module.css";
import FromAddItem from "./formAddItem/formAddItem";
import {history} from "../../helpers/history";
import { Link } from "react-router-dom";

const Tables = (props) => {

        let {
            items,
            Container,
            type,
            url_id
        } = props;

        let pathName = history.location.pathname === '/' ? '' : history.location.pathname;

        return (
            <div className={`${type} container_my`}>
                <FromAddItem url_id={url_id} type={type}/>
                    <Row className={styles.row_background}>
                        {
                            items.length ? items.map((item, i) => <Col key={i} xl={3} m={12} s={12}>
                                {item.edit || type === 'statuses'
                                ? <Container type={type} item={item} i={i}/>
                                : (
                                    <Link to= {`${pathName}/${type}/${item.id}`}>
                                        <Container type={type} item={item} i={i}/>
                                    </Link>
                                    )
                                }
                            </Col>) : <div className={styles.empty_container}>Empty</div>
                        }
                    </Row>
            </div>

        )
}

export default Tables;