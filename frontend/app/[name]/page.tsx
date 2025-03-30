import React from 'react';
import NavBar from '../components/nav';
import { User } from '../utils/interfaces';
import { Review } from '../utils/interfaces';
import { Cartier } from '../utils/interfaces';
import { Comment } from '../utils/interfaces';
import axios from 'axios';

interface PageProps {
    params: {
      name: string;
    };
}

export default async function Page(props: PageProps) {
    const { params } = await Promise.resolve(props);
    const { name } = await params;

    const { data } = await axios.get<Cartier[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/cartier/name/${name}`
    );

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col bg-[#7f8c8d] min-h-screen">
                <NavBar />
                <h1 className="text-center text-3xl font-bold mt-4">
                    Nu s-au găsit date pentru {params.name}
                </h1>
            </div>
        );
    }
    

    const cartierData = data[0];
    
    return (
        <div className="flex flex-col bg-[#7f8c8d] min-h-screen">
            <NavBar />
            <h1 className="text-center text-3xl font-bold mt-4 font-walter text-[#2D2D2D]">
                {cartierData.name}
            </h1>
            <div className="p-4 text-[#2D2D2D]">
                <p><strong>City:</strong> {cartierData.city}</p>
                <p><strong>Sector:</strong> {cartierData.sector}</p>
                <p><strong>Location:</strong><a href={cartierData.loc}>{cartierData.loc}</a></p>
                <h2 className="text-2xl mt-4">Reviews</h2>
            
                {cartierData.reviews.map((review) => (
                    <div key={review._id} className="border p-4 my-2 rounded">
                        <h3 className="font-bold">{review.title}</h3>
                        <p>{review.text}</p>
                        <p>
                            <strong>Grade:</strong> {review.grade} &nbsp;|&nbsp;
                            <strong>Likes:</strong> {review.nrLikes}
                        </p>
                        {review.comments && review.comments.length > 0 && (
                            <div className="mt-2">
                                <h4 className="font-semibold">Comments:</h4>
                                {review.comments.map((comment) => (
                                    <div key={comment._id} className="ml-4 border-l pl-2">
                                        <p>{comment.text}</p>
                                        <small>
                                            By:
                                        </small>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}