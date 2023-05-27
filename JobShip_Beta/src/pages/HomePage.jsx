import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { getUserData } from '../Firebase';
import { db } from '../Firebase';
import { Container, Row, Col, Accordion, Badge } from 'react-bootstrap';

//components
import Header1 from '../components/Header1'
import News from '../components/News'
import PortfolioButton from '../components/PortfolioButton'
import SuggestButton from '../components/SuggestButton'
import Contest from '../components/Contest'
import Footer from '../components/Footer'
import RedirectButton from '../components/RedirectButton';

//linked pages
import NewCarrerPage from './NewCareerPage'
import NewProfilePage from './NewProfilePage'
import ReCareerPage from './ReCareerPage';

//styles
import './css/HomePage.css'

const HomePage = () => {

  const careerData = getUserData("career")
  const profileData = getUserData("profile")
  const recordData = getUserData("record")
  const accountData = getUserData()
  const profileImg = accountData?.photoURL

  const navigate = useNavigate();

  const toReCareer = () => {
    navigate('/ReCareer')
  }

  const toReRecord = () => {
    navigate('./ReRecord')
  }

  console.log(recordData)

  return (
    <div className='HomePage'>

      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container fluid>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
            <Row className='ProfileW' style={{ marginTop: "50px", paddingRight: "20px" }}>
              {profileData && (
                <>
                  <Container>
                    <Row>
                      <Col className='ImgW' xs={2}>
                        <img src={profileImg} alt="Profile" className="profile-image" style={{ width: '100%', height: 'auto' }} />
                      </Col>
                      <Col className='NameSocialW' xs={6}>
                        <Row className='Name' style={{ fontSize: 'xx-large' }}>
                          <Col xs="auto" >
                            {profileData.familyName}
                          </Col>
                          <Col xs="auto" style={{ padding: 0 }}>
                            {profileData.firstName}
                          </Col>
                        </Row>
                        <Row className='NameE'>
                          <Col xs="auto" >
                            {profileData.familyNameE}
                          </Col>
                          <Col xs="auto" style={{ padding: 0 }}>
                            {profileData.firstNameE}
                            {console.log(profileData.job)}
                          </Col>
                        </Row>
                        <Row className='Social'>
                          {profileData.job.map((job, index) => (
                            <Col xs="auto">
                              <Badge key={index} variant="success" >
                                {job}
                              </Badge>
                            </Col>
                          ))}
                        </Row>

                      </Col>
                    </Row>
                    <Row style={{ paddingTop: "10px" }}>
                      <Col xs="9">
                      </Col>
                      <Col xs="3" style={{ textAlign: 'right' }}>
                        <RedirectButton buttonRabel="編集する" onClick={() => toReCareer()} />
                      </Col>
                    </Row>
                  </Container>
                </>
              )}
            </Row>

            <Row className='CareerW' style={{ border: "solid 1px #c7c7c7", backgroundColor: "white", borderRadius: "4px", marginTop: "50px", padding: "20px" }}>
              <Container>
                <Row>
                  <p style={{ fontSize: "x-large", fontWeight: "bold" }}>
                    経歴
                  </p>
                </Row>
                <Row>
                  {careerData && careerData.map((data, index) => (
                    <Row key={index}>
                      <Col xs={3}>{data.year}年 {data.month}月</Col>
                      <Col xs="auto">{data.description}</Col>
                    </Row>
                  ))}
                </Row>
                <Row style={{ paddingTop: "10px" }}>
                  <Col xs="9">
                  </Col>
                  <Col xs="3" style={{ textAlign: 'right' }}>
                    <RedirectButton buttonRabel="編集する" onClick={() => toReCareer()} />
                  </Col>
                </Row>
              </Container>
            </Row>

            <Row className='RecordW' style={{ border: "solid 1px #c7c7c7", backgroundColor: "white", borderRadius: "4px", marginTop: "50px", padding: "20px" }}>
              <Container>
                <Row>
                  <p style={{ fontSize: "x-large", fontWeight: "bold" }}>
                    レコード
                  </p>
                </Row>
                <Row>
                  {recordData && recordData.map((data, index) => (
                    <Accordion>
                      <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>
                          <Col xs={3}>{data.year}年 {data.month}月</Col>
                          <Col xs="auto">{data.description}</Col>
                        </Accordion.Header>
                        <Accordion.Body>
                          {data.detail}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </Row>
                <Row style={{ paddingTop: "10px" }}>
                  <Col xs="9">
                  </Col>
                  <Col xs="3" style={{ textAlign: 'right' }}>
                    <RedirectButton buttonRabel="編集する" onClick={() => toReRecord()} />
                  </Col>
                </Row>
              </Container>
            </Row>

          </Col>
        </Row>
      </Container>

      <div className='FooterWrapper'>
        <Footer />
      </div>

    </div>
  )
}

export default HomePage
