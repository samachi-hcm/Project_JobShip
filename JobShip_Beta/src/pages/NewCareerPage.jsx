import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//components
import Header1 from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/RedirectButton'
import AddButton from '../components/AddButton'
import Forms from '../components/Forms'
import Stepper from '../components/Stepper'
import RedirectButton from '../components/RedirectButton'
//linked page

//styles
import { Col, Container, Row } from 'react-bootstrap'

const NewCareerPage = () => {

  const navigate = useNavigate();

  const toNewRecord = () => {
    navigate('/NewPortfolioPage')
  }

  const toNewProfile = () => {
    navigate('/NewProfilePage')   
  }

  return (
    <div className='NewCareerPage' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>

      <Container style={{ marginTop: "30px" }}>
        <Row >
          <Col xs={{ span: 4, offset: 4 }}>
            <Stepper nowStep={2} />
          </Col>
        </Row>
      </Container>

      <Container fluid style={{ marginTop: "30px", flexGrow: 1 }} >
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} xs={12}>
          <p style={{marginTop:"30px", fontSize:"x-large", paddingLeft:"20px"}}>あなたの経歴（学歴・職歴）を入力してください。<br />※後からでも編集できます</p>
            <Forms mode="career" RPageAdd='/NewPortfolioPage' RPageLabel='次へ' LPageAdd='/NewProfilePage' LPageLabel='戻る'/>
          </Col>
        </Row>

      </Container>

      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default NewCareerPage