import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./global";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; // revalidate at most every 30 second

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc){
    title,
      smallDescription,
      "currentSlug":slug.current,
      titleImage,
  }`;
  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  // 타입스크립트 표기
  const data: simpleBlogCard[] = await getData();
  // console.log(data);
  return (
    <div className="grid grid-cols-1 mt-5 gap-5">
      <div className="w-full">
        <p >
          <span className="text-primary">GitHub</span>:
          <span className="hover:text-red-500 ml-4">
            <a href="https://github.com/syngyang" target="_blank">
              https://github.com/syngyang.com
            </a>
          </span>
        </p>
        <p className="">
          <span className="text-primary">App related</span> :
          <span className="hover:text-red-500 ml-4">
            <a href="https://bill-splitor.tistory.com" target="_blank">
            https://bill-splitor.tistory.com
            </a>
          </span>
        </p>
        <p className="">
          <span className="text-primary">Web related</span> :
          <span className="hover:text-red-500 ml-4">
            <a href="https://polyframe.tistory.com" target="_blank">
            https://polyframe.tistory.com
            </a>
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 mb-5 gap-5">
        {data.map((post, idx) => (
          <article
            key={idx}
            className="overflow-hidden dark:border-zinc-600 rounded-lg
          border border-gray-100 bg-white shadow-lg dark:bg-black dark:shadow-gray-700 shadow-gray-200"
          >
            <Card>
              <Image
                src={urlFor(post.titleImage).url()}
                alt="image"
                width={500}
                height={500}
                className="rounded-t-lg h-[200px] object-cover"
              />
              <CardContent>
                <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {post.smallDescription}
                </p>
                <Button asChild className="w-full mt-5">
                  <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </div>
  );
}
