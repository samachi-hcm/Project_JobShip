import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { collection, getFirestore, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';

//components
import Header1 from './Header1'
import Header2 from './Header2'
import Footer from './Footer'
import Form from './Form'
import RedirectButton from './RedirectButton';
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
//linked page

//styles
import './css/Forms.css'

const Forms = ({mode}) => {

  const [user, loading] = useAuthState(auth)

  const [count, setCount] = useState(-1)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [savedData, setSavedData] = useState()

  const userDataRef = useRef({});

  useEffect(() => {
    if (user) {
      const { photoURL, displayName,email } = auth.currentUser;
      userDataRef.current = { ...userDataRef.current, photoURL, displayName,email };
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db,"UserData", userDataRef.current.email, 'Data',`${mode}Data`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saveShot = docSnap.data().formData;
          setSavedData(saveShot)
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (savedData) {
      const newForms = savedData.map((_, index) =>
        createForm(index)
      );
      setForms(newForms);
      setCount(savedData.length - 1);
    }
  }, [savedData]);

  const onSubmit = async (data) => {
    const formData = data.year.map((year, index) => ({
      year: year,
      month: data.month[index],
      description: data.description[index],
    }));
    
    userDataRef.current = { ...userDataRef.current, formData }
    await setDoc(doc(db, "UserData",userDataRef.current.email, "Data",`${mode}Data`), {
      formData,
    });
  };


  const deleteForm = (input) => {
    const newForms = Forms.map((item) =>
      item.id === input.id ? { ...item, flag: true } : item
    );
    setForms(newForms);
  };

  const createForm = (currentCount) => {
    const id = uuidv4();
    const form = {
      id: id,
      index: currentCount,
      body: (
        <div className="CareerField" key={id}>
          <Form
            year={register(`year[${currentCount}]`)}
            month={register(`month[${currentCount}]`)}
            description={register(`description[${currentCount}]`)}
          />
          <DeleteButton onClick={() => deleteForm({ id })} />
        </div>
      ),
      flag: false,
    };
    return form;
  };


  const [Forms, setForms] = useState([])

  const display = Forms.map((form) => {
    if (form.flag) {
      return null;
    }
    return (
      <div className="CareerField" key={form.id}>
        <Form
          savedData={savedData?.[form.index]}
          year={register(`year[${form.index}]`)}
          month={register(`month[${form.index}]`)}
          description={register(`description[${form.index}]`)}
        />
        <DeleteButton onClick={() => deleteForm(form)} />
      </div>
    );
  });

  const addForms = () => {
    const newCount = count + 1;
    const newForm = createForm(newCount);
    const newForms = [...Forms, newForm];
    setForms(newForms);
    setCount(newCount);
  };

  return (
    <div className='Forms'>
      <div className='MainWrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {display}
          <AddButton onClick={addForms} />
          <RedirectButton buttonRabel="次へ" />
        </form>
      </div>


    </div>
  )
}

export default Forms