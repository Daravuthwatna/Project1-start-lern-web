/* eslint-disable no-unused-vars */
import React from 'react';
import { Carousel, Col, Row } from "antd";
import Slide1 from "../assets/BN2.png";
import Slide2 from "../assets/BN5.png";
import Slide3 from "../assets/BN7.png";
import Slide4 from "../assets/BN8.png";
import Small1 from "../assets/small (1).png"
import Small2 from "../assets/small (2).png"
import '../pages/style/slide.css';

const Slide = () => {
  return (
    <div className="slide-web-style" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: 1100, margin: "auto" }}>
        <Row justify="center">
          <Col xs={24} sm={24} md={18}>
            <Carousel autoplay>
              <div>
                <div style={{ maxHeight: 500 }}>
                  <img
                    style={{ objectFit: "cover", width: "100%", height:"300px" }}
                    src={Slide1}
                    alt="banner"
                  />
                </div>
              </div>
              <div>
                <div style={{ maxHeight: 500 }}>
                  <img
                    style={{ objectFit: "cover", width: "100%", height:"300px"  }}
                    src={Slide2}
                    alt="banner"
                  />
                </div>
              </div>
              <div>
                <div style={{ maxHeight: 500 }}>
                  <img
                    style={{ objectFit: "cover", width: "100%", height:"300px"  }}
                    src={Slide3}
                    alt="banner"
                  />
                </div>
              </div>
              <div>
                <div style={{ maxHeight: 500 }}>
                  <img
                    style={{ objectFit: "cover", width: "100%", height:"300px"  }}
                    src={Slide4}
                    alt="banner"
                  />
                </div>
              </div>
            </Carousel>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Carousel autoplay>
              <div>
                <div style={{ maxHeight: 300 }}>
                  <img
                    style={{ objectFit: "content", width: "100%" }}
                    src={Small1}
                    alt="banner"
                  />
                </div>
              </div>
              <div>
                <div style={{ maxHeight: 300 }}>
                  <img
                    style={{ objectFit: "content", width: "100%" }}
                    src={Small2}
                    alt="banner"
                  />
                </div>
              </div>
            </Carousel>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Slide;
