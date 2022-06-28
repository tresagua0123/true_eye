import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Deploy } from '../Component/Deploy'
import { useState, useEffect } from "react"

const Home: NextPage = () => {
  const [state, setState] = useState()

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api").then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data =>
      setState(data.tutorial))
      .then(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <Deploy state={state} />
    </div>
  )
}

export default Home
