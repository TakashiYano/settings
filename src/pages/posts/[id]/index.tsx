import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import classes from "src/styles/Home.module.css";

export type Post = {
  id: string;
  title: string;
  author: string;
};

// コンポーネントで受け取るpropsのデータ型定義
export type PostIdProps = {
  post: Post;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`http://localhost:8080/posts/${ctx.params?.id}`);
  const post = await res.json();
  return { props: { post } };
};

const PostsId: NextPage<PostIdProps> = (props) => {
  return (
    <div className={classes.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <Link href="/" legacyBehavior>
          <a>戻る</a>
        </Link>
        <h1 className={classes.title}>{props.post?.author}</h1>

        <p className={classes.description}>{props.post?.title}</p>
      </main>

      <footer className={classes.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={classes.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default PostsId;
