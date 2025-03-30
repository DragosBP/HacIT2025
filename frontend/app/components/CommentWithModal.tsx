"use client";
import { useState } from "react";
import CommentModal from "./CommentModal";
import { Review } from "../utils/interfaces";

interface ReviewsWithModalProps {
    reviews: Review[];
}

export default function ReviewsWithModal({ reviews }: ReviewsWithModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const handleOpen = (review: Review) => {
        setSelectedReview(review);
        setOpen(true);
    };

    return (
        <div>
            {reviews.map((review) => (
                <div key={review._id} className="border p-4 my-2 rounded flex justify-between items-center">
                    <div>
                        <h3 className="font-bold">{review.title}</h3>
                        <p>{review.text}</p>
                    </div>
                    <button
                        className="bg-[#34495e]/60 text-white px-3 py-1 rounded hover:underline cursor-pointer"
                        onClick={() => handleOpen(review)}
                    >
                        Add Comment
                    </button>
                </div>
            ))}

            {selectedReview && (
                <CommentModal
                    open={open}
                    onClose={() => setOpen(false)}
                    review={selectedReview}
                />
            )}
        </div>
    );
}
