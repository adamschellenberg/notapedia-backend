import React, { useState, useEffect } from 'react';
import { useGetData } from '../../custom-hooks';
import Container from 'react-bootstrap/Container';
import './DatabasePage.css';


export const DatabasePage = () => {

  const [notamonData, setNotamonData] = useState([]);

  const getNotamonData = async () => {
    const result = await useGetData.useNotamon();
    setNotamonData(result);
  };

  useEffect( () => {
    getNotamonData();
  }, []);

  return (
    <div>
        <div className="databaseBackground" />
        <Container>
          <h1 className="display-3 databaseHeader text-center">
            Notamon Database
          </h1>
            <table className='table table-light table-bordered table-sm mx-auto' id="database-table">
              <thead>
                <tr>
                  <th id="number-col">#</th>
                  <th>Notamon</th>
                  <th>Sprite</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  notamonData.map( (notamon) => {
                    let notamonNumber = notamon.number;
                    let notamonNumberPadded = notamonNumber.toString().padStart(3, "0");
                    let notamonName = notamon.name;
                    let notamonType = notamon.nexomonType;
                    let notamonTypeImagePath = "db/extinction/images/elements/" + notamonType.toLowerCase() + ".png";
                    let notamonImagePath = "db/extinction/images/notamon/small/" + notamonNumberPadded + "-" + notamonName.toLowerCase() + ".png";

                    return (
                      <tr>
                        <td>{notamonNumberPadded}</td>
                        <td>{notamonName}</td>
                        <td><img className="notamon-sprite-img-db" src={notamonImagePath} alt={notamonName} /></td>
                        <td>{notamonType} <br /><img className="element-img" src={notamonTypeImagePath} alt={notamonType} /></td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
        </Container>
    </div>
  )
}
