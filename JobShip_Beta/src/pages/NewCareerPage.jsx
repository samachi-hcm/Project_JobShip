import React, { useState } from 'react'

//components
import Header1 from '../components/Header1'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'
import CareerInput from '../components/CareerInput'
import Button from '../components/Button'
import AddButton from '../components/AddButton'
//linked page

//styles
import './css/NewCarrerPage.css'



const NewCareerPage = () => {

  const [handleId, sethandleId] = useState(0)

  const addId = () => {
    sethandleId(handleId+1)
  }


  {/*
    1 変数careerInputをオブジェクトにして、.bodyにコンポーネント、.flagにdeleteFlagを代入する
    2 ステートcareerInputsにcareerInputを配列として格納
    3 .flagがtrueであるとき、そのcareerInputをfilterで取り除く
    4 careerInputsにmapをかけ、careerInputを取り出して.bodyを表示
  */}

  const deleteCareerInput = () => {
    careerInput.flag = true
    let newCareerInputs = careerInputs
    let receivevalue = []
    receivevalue =  newCareerInputs.filter(careerInput => careerInput.flag == false)
    setCareerInputs(receivevalue)
  }


  const careerInput = {
    body:(<CareerInput 
      id = {handleId} 
      onClick = {deleteCareerInput} />),
    flag:false
  }

  const [careerInputs, setCareerInputs] = useState([])
  
  const display = careerInputs.map((careerInput)=>careerInput.body)

  const addCareerInputs = () => {
    addId()
    setCareerInputs((prevs) => {
      return [...prevs, careerInput]
    })
  }

  return (
    <div className='NewCareerPage'>
      <div className='HeaderWrapper'>
        <Header1 />
      </div>
      <div className='Header2Wrapper'>
        <Header2 />
      </div>
      <div className='MainWrapper'>
        {display}
        <AddButton onClick={addCareerInputs}/>
        <Button buttonRabel="次へ" />
      </div>

      <div className='FooterWrapper'>
        <Footer />
      </div>
      {console.log(careerInputs)}
    </div>
  )
}

export default NewCareerPage