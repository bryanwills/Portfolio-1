import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Body from "@/components/modules/blog/post/body";
import Footer from "@/components/modules/blog/post/footer";
import Header from "@/components/modules/blog/post/header";
import { siteConfig } from "@/config/site";

export default function PostTemplate({
  data,
  location,
}: PageProps<Queries.PostBySlugQuery>) {
  return (
    <Layout location={location} className="justify-center flex">
      <article>
        <Header post={data.contentfulBlogPost} />
        <Body content={data.contentfulBlogPost?.body?.body!} />
        <hr />
        <Footer post={data.contentfulBlogPost} />
      </article>
    </Layout>
  );
}

export function Head({ data }: PageProps<Queries.PostBySlugQuery>) {
  const { title, slug, cover, canonical, description } =
    data.contentfulBlogPost!;

  return (
    <Seo
      title={title!}
      description={description!}
      image={cover?.[0]?.url!}
      pathname={`${siteConfig.pages.blog.link}/${slug}`}
      canonicalUrl={canonical ?? undefined}
      ogType="article"
    />
  );
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      canonical
      body {
        body
      }
      publishedAt
      description
      cover {
        gatsbyImageData(placeholder: BLURRED)
        url
      }
      isFeatured
      slug
      isSponsored
      tags
      title
      updatedAt
      recommendedPosts {
        id
        slug
        title
        cover {
          gatsbyImageData(placeholder: BLURRED)
        }
        isFeatured
        excerpt
        tags
        publishedAt
      }
    }
  }
`;