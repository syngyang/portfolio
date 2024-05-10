import { fullBlog } from "@/app/global";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

// export const revalidate = 3600 // revalidate at most every hour
export const revalidate = 30; // revalidate at most every 30 second

async function getData(slug:string){
    const query = `
    *[_type == "blog" && slug.current == '${slug}']{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;

    const data = await client.fetch(query);

    return data;
}

async function BlogPage({params}:{params:{slug:string}}) {
    // params.slug 인자로 주어야 함
    const data: fullBlog = await getData(params.slug);
    // console.log(data)
  return (
    <div className="mt-8">
        <h1>
            <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                Syng Yang -Blog
            </span>
            <span className="mt-2 block text-3xl sm:text-4xl text-center leading-8 tracking-tight font-bold">{data.title}</span>
        </h1>
        <Image src={urlFor(data.titleImage).url()} 
            width={800} height={800} 
            alt="Title Image"
            priority
            className="rounded-lg mt-8 border"
        />

        <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
            <PortableText value={data.content} />
        </div>
    </div>
  )
}

export default BlogPage