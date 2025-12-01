import matter from 'gray-matter';
import * as path from "node:path";


export async function readFile(localPath) {
  const fullPath = path.join(Deno.cwd(), localPath);
  return Deno.readTextFile(fullPath);
}

export async function writeFile(localPath, content) {
  const fullPath = path.join(Deno.cwd(), localPath);
  await Deno.writeTextFile(fullPath, content);
}

async function readDirectory(localPath) {
  const fullPath = path.join(Deno.cwd(), localPath);
  const fileNames = [];

  for await (const dirEntry of Deno.readDir(fullPath)) {
    if (dirEntry.isFile) {
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

export async function loadBlogPost(slug) {
  const rawContent = await readFile(
    path.join('content', `${slug}.mdx`)
  );

  const { data: frontmatter, content } =
    matter(rawContent);

  return { frontmatter, content };
}