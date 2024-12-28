import { Post } from './types';

async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await response.json();
    return posts;
}

export default fetchPosts;
