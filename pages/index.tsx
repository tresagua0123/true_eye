import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Deploy } from "../Component/Deploy";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const nodeEnv = process.env.NODE_ENV ?? "development";
const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

console.log(nodeEnv);

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/api`);
  const tutorial = await res.json();
  return {
    props: {
      tutorial,
    },
  };
}

const Home: NextPage = (props) => {
  const [state, setState] = useState();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [inputTitle, setInputTitle] = useState<string>("");
  const router = useRouter();
  console.log(BASE_URL);
  console.log("props", props);

  //   const blog = async () => {
  //     const blog = await fetch("/blog")
  //     return blog.json()
  // }

  const moveToStation = (stationName: string) => {
    router.push(`stations/${stationName}`);
  };

  const showBlogs = () => {
    fetch(`/blog`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => setBlogs(data.blogs))
      .then((error) => console.log(error));
  };

  const createBlog = async () => {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title: inputTitle, body: "content" }),
    };
    await fetch("/create", params);
    showBlogs();
  };
  // console.log("blog", blog())

  const renderBlogs = () => {
    return blogs.map((blog) => {
      return <div key={blog.title}>{blog.title}</div>;
    });
  };

  useEffect(() => {
    // console.log("showBlogs")
    showBlogs();
    fetch(`/api`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => setState(data.tutorial))
      .then((error) => console.log(error));
  }, []);

  // const clickFlase = () => {
  //   fetch(`/api_false`).then(response => {
  //     if (response.status === 200) {
  //       return response.json()
  //     }
  //   }).then(data =>
  //     setState(data.tutorial))
  //     .then(error => console.log(error))
  // }

  return (
    <div className="App">
      <Deploy state={state} />
      <button onClick={showBlogs}>Blog</button>
      <div onClick={() => moveToStation("shin-okubo")}>新大久保に飛ぶ</div>
      {/* <div> */}
      <p>新規登録画面</p>
      <form>
        <label>タイトル</label>
        <input onChange={(e) => setInputTitle(e.target.value)} type="text" />
        <label>内容</label>
        <input type="text" />
        <input onClick={createBlog} type="submit" value="新規登録" />
      </form>
      {/* </div> */}
      {renderBlogs()}
    </div>
  );
};

export default Home;
