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
            type
        } = props;

        const checkNext = e => {
            if(e.target.closest('i') || e.target.closest('input')) {
                e.preventDefault();
            }
        }

        return (
            <div className="foo">
                <FromAddItem />
                <Row className={styles.row_background}>
                    {
                        items.map((item, i) => <Col key={i} xl={3} m={12} s={12}>
                            <Link onClick={checkNext} to={`/tasks/${item.id}`}>
                                <Card
                                className={styles.animation_tr + " " + styles.card_my_style + " next"}
                                textClassName={"white-text " + styles.card_content_my_style}
                                title={ item.edit ? <MyInput Field={"name"} MyStyle={{width: 65+'%'}} Type="text" DefaultValue={item.board_name} /> : item.board_name}
                            >
                                {item.edit ? <MyInput Field={"description"} Type="text" DefaultValue={item.board_description} /> : item.board_description }
                                <ButtonsCard editingBtn={item.edit} index={i} actionWhat={item} actionTo={type}/>
                                </Card>
                            </Link>
                        </Col>)
                    }
                </Row>
            </div>

        )
}

export default Tables;