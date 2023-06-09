import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import ProfileInput from '../components/ProfileInput'
import RedirectButton from '../components/RedirectButton';
import Stepper from '../components/Stepper';
//linked page

//styles

const ReProfile = () => {const [user, loading] = useAuthState(auth)

  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const [savedData, setSavedData] = useState()

  const userDataRef = useRef({});

  const [isUser, setIsUser] = useState(null)

  useEffect(() => {
    if (user) {
      const { photoURL, displayName, email, uid } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName, email, uid };
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, "UserData", userDataRef.current.uid, 'Data', `profileData`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saveShot = docSnap.data().formData;
          setSavedData(saveShot)
          setIsUser(true)
        }else{
          setIsUser(false)
        }
      }
    };

    fetchData();
  }, [user]);

  const navigate = useNavigate();

  const toNewCareer = () => {
    navigate('/NewCareerPage')
  }

  const toHome = () => {
    navigate('/')
  }

  const onSubmit = async (formData) => {
    console.log(formData)
    userDataRef.current = { ...userDataRef.current, formData }
    await setDoc(doc(db, "UserData", userDataRef.current.uid, "Data", `profileData`), {
      formData,
    });
    toHome()
  };

  useEffect(() => {
    console.log(isUser)
    if(isUser === true){
      navigate('/ReProfile')
    }
  }, [isUser])
  
  if(!savedData){
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div className='NewProfilePage' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='HeaderWrapper' >
        <Header1 />
      </div>

      <div className='MainWrapper' style={{ flexGrow: 1 ,marginBottom:"30px"}}>
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row style={{marginBottom:"30px"}}>
                  <ProfileInput
                    familyName={register(`familyName`, { required: '姓の入力は必須です' })}
                    firstName={register(`firstName`, { required: '名の入力は必須です' })}
                    familyNameE={register(`familyNameE`)}
                    firstNameE={register(`firstNameE`)}
                    gender={register(`gender`)}
                    birthDay={register(`birthDay`, { required: '生年月日の入力は必須です' })}
                    job={register(`job`)} 
                    customJob={register(`customJob`)}
                    savedData={savedData}
                    control={control}
                    isUser={isUser}
                    errors={errors}
                  />
                </Row>
                <Row>
                  <Col xs={{ span: 4, offset: 8 }} style={{ textAlign: "right" }}>
                    <RedirectButton buttonRabel="変更を適用する" />
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='FooterWrapper'>
        <Footer />
      </div>
    </div>
  )
}

export default ReProfile