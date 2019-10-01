import React from "react";
import { Table, Card, Row, Col} from "react-materialize";
import ButtonsCard from "./buttonsCard/buttonsCard";
import styles from "./Table.module.css";
import FromAddItem from "./formAddItem/formAddItem";
import { NavLink } from "react-router-dom";

const Tables = (props) => {

        let {
            boards,
            labelHead
        } = props;

        return (
            <div className="foo">
                <FromAddItem />
                <Row>
                    {
                        boards.map((item, i) => <Col data-identificator={item.id} key={i} xl={6} m={12} s={12}>
                            <Card
                                className={"blue-grey light-1 " + styles.animation_tr}
                                textClassName="white-text"
                                title={ <NavLink to={'/tasks'}>{item.board_name}</NavLink>}
                            >
                                {item.board_description}
                                <ButtonsCard />
                            </Card>
                        </Col>)
                    }
                </Row>
            </div>

        )
}

export default Tables;