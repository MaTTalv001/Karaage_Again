import React from 'react'

export const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-2.5 bg-green-400">
      <div className="flex ml-10">
        <div className="mx-1">COPY RIGHT</div>
        <div className="mx-1">プラバシーポリシー</div>
        <div className="mx-1">利用規約</div>
      </div>
      <p className="text-base text-black mb-2 mx-4">
        ※本ゲームはPC専用となっております。
      </p>
    </footer>
  )
}
