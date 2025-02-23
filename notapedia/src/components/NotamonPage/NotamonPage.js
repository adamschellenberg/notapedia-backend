import React, { useEffect, useState } from 'react';
import './NotamonPage.css';
import { useGetData } from '../../custom-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const NotamonPage = () => {
    const [notamonName, setNotamonName] = useState("");
    const [notamonData, setNotamonData] = useState({});

    const setNotamonNameFromUrlData = () => {
        const urldata = window.location.pathname;
        let notamonUrl = urldata.replace(/\/notamon\//, '');
        setNotamonName(notamonUrl);
    }

    const setSingleNotamon = async () => {
        const result = await useGetData.useGetSingleNotamon(notamonName);
        setNotamonData(result);
    }

    useEffect( () => {
        setNotamonNameFromUrlData();
    }, []);

    useEffect( () => {
        setSingleNotamon();
    }, [notamonName]);


    return (
        <div>
            <div className="notamonBackground" />
            <Container>

                <div className="notamon-header">
                <Row>
                    <Col><h1 className="display-3 text-center">{notamonData.name} <span>#{notamonData.numberPadded}</span></h1></Col>                    
                </Row>
                </div>

                <Row>
                    <Col><img className="notamon-sprite-img float-left" src={notamonData.imgUrl} alt={notamonData.name}/>
                    <span className="align-top text-center">{notamonData.notamonType}<img src={notamonData.typeUrl} className="notamon-element-img" alt={notamonData.notamonType}/></span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}