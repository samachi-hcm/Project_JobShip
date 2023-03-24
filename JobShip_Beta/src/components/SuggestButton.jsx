import React from 'react'

import './css/SuggestButton.css'

const Suggest_Logo = {
  imgAddess: "../../public/Suggest_Logo.png",
  pageAddress: "#"
}

const SuggestButton = () => {
  return (
    <div className='SuggestButton'>
      <div className='Title'>
        提案を受け取る
      </div>
      <img src={Suggest_Logo.imgAddess}></img>
      <p>情報を入力して周囲の人に共有</p>
    </div>
  )
}

export default SuggestButton
