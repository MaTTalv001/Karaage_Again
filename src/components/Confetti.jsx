import React from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default ({ clearTime }) => {
  const { width, height } = useWindowSize()
  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={true}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-black text-shadow-md z-50">
        <p>ゲームクリア！</p>
        <p>タイム {clearTime}</p>
      </div>
    </>
  )
}