import React from 'react';
import {cookies} from "next/headers";
interface Author {
    _id: string;
    username: string;
}
interface Comment {
    _id: string;
    username: string;
    content: string;
}
interface Post {
    _id: string;
    post: Post;
    title: string;
    content: string;
    author: Author;
    comments: Comment[];
    likes: any[];
    date: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface PageProps {
    params: {
        id: string;
    };
}

const Page: React.FC = async ({params}:any) => {
    const  id = params.id;
    // Define the token type
    const cookieStore = cookies();
    const token: string | undefined = cookieStore.get('token')?.value;

    if (!token) {
        return <div>No token available</div>;
    }
    try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
            cache: 'no-store',
            headers: {
                'Authorization': ` ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const post: Post = await response.json()
        const data:Post=post.post

        console.log(data)

        return (
            <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-[120px]">
                <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                <p className="text-gray-600 mb-4">By {data.author.username} on {new Date(data.date).toLocaleDateString()}</p>
                <div className="text-gray-800 mb-6">
                    {data.content}
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    {data.comments.length > 0 ? (
                        <ul className="space-y-4">
                            {data.comments.map(comment => (
                                <li key={comment._id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                                    <p className="font-semibold">{comment.username}</p>
                                    <p className="text-gray-700 mt-1">{comment.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No comments yet</p>
                    )}
                </div>
            </div>

        );
    } catch (error) {
        console.error('Fetch error:', error);
        return <div>Error fetching data</div>;
    }
};

export default Page;
