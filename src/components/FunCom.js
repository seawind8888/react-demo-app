import React from 'react'

function FunCom() {
  const change = () => {
    console.log('change')
  }
  return (
    <div>
      funCom
    </div>
  )
}
FunCom.onChange = () => {
  // 想调用change
}
export default FunCom
