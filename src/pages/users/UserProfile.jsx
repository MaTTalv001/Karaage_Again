import React from 'react'
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  // ユーザー識別idを取得
  const { id } = useParams();
  return (
    <div>{id}</div>
  )
}
