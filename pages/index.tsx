import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Deploy } from '../Component/Deploy'
import { useState, useEffect } from "react"

const nodeEnv = process.env.NODE_ENV ?? 'development';
const BASE_URL = process.env.NEXT_PUBLIC_URL ?? ""

console.log(nodeEnv)

const Home: NextPage = () => {
  const [state, setState] = useState()
  console.log(BASE_URL)

  useEffect(() => {
    fetch(`/api`).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data =>
      setState(data.tutorial))
      .then(error => console.log(error))
  }, [])

  const clickFlase = () => {
    fetch(`/api_false`).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data =>
      setState(data.tutorial))
      .then(error => console.log(error))
  }

  return (
    <div className="App">
      <Deploy state={state} />
      <button onClick={clickFlase}>False</button>
    </div>
  )
}

export default Home
