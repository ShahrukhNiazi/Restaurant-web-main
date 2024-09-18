import Image from "next/image";
import styles from "./page.module.css";
import Customerheader from "./__components/CustomerHeader";
import Customerfooter from "./__components/customerfooter";
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <main className={styles.main}>
     <Customerheader />
      <div className="input-wrapper text-center">
         <div className="overlay"></div>
         <Container>
          <Row>
            <Col className='col-lg-12 col-sm-12 col-12'>
              <h1 className="color-white">Food delivery food</h1>
              <div className="d-flex">
                <input type="text" className="form-control" placeholder="Select place" />
                <input type="text" className="form-control" placeholder="Select place" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Customerfooter />
    </main>
  );
}
