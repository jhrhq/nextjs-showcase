import matter from 'gray-matter';
import { writeFile as fsWriteFile, opendir, readFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';


export async function readFileAsText(localPath) {
  const fullPath = path.join(process.cwd(), localPath);

  // Node's equivalent requires an explicit encoding to return a string
  return await readFile(fullPath, { encoding: 'utf8' });
}



export async function writeFile(localPath, content) {
  const fullPath = path.join(process.cwd(), localPath);

  // Node's equivalent to Deno.writeTextFile
  await fsWriteFile(fullPath, content, { encoding: 'utf8' });
}


async function readDirectory(localPath) {
  const fullPath = path.join(process.cwd(), localPath);
  const fileNames = [];

  // opendir returns an async iterator similar to Deno.readDir
  const dir = await opendir(fullPath);

  for await (const dirEntry of dir) {
    if (dirEntry.isFile()) { // Note: Node uses a method .isFile()
      fileNames.push(dirEntry.name);
    }
  }

  return fileNames;
}


export async function getBlogPostList() {
  const fileNames = await readDirectory('content');
  const blogPosts = [];

  for (const fileName of fileNames) {
    const rawContent = await readFile(
      path.join('content', fileName)
    );

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) =>
    p1.publishedOn < p2.publishedOn ? 1 : -1
  );
}

export const loadBlogPost = React.cache(
  async function loadBlogPost(slug) {
    const rawContent = await readFile(
      path.join('content', `${slug}.mdx`)
    );

    const { data: frontmatter, content } =
      matter(rawContent);

    return { frontmatter, content };
  }
)