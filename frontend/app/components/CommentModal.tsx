import { useState } from "react";
import axios from "axios";
import { Dialog, DialogBody, DialogHeader, DialogFooter, Button, Input } from "@material-tailwind/react";

interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
    review: {
        _id: string;
        title: string;
        text: string;
    };
}

export default function CommentModal({ open, onClose, review }: ReviewModalProps) {
    const [comment, setComment] = useState("");

    const handleSendComment = async () => {
        const userToken = localStorage.getItem("secureloginstorage");
        if (!userToken) {
            alert("User not logged in");
            return;
        }
        
        const userId = JSON.parse(userToken).userId;
        if (!userId) {
            alert("Invalid user token");
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
                text: comment,
                userId,
                reviewId: review._id,
            });
            alert("Comment sent successfully");
            setComment("");
            onClose();
        } catch (error) {
            alert("Failed to send comment");
            console.error(error);
        }
    };

    return (
        <Dialog 
            open={open} 
            handler={onClose} 
            size="md" 
            className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-md bg-black/25"
        >
            <div className="w-3/4 max-w-2xl bg-[#5d6d7e] p-6 rounded-lg shadow-lg">
                <DialogHeader className="text-center text-xl font-bold text-white">{review.title}</DialogHeader>
                <DialogBody className="text-white">
                    <p>{review.text}</p>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-white">Leave a comment</label>
                        <Input 
                            type="text" 
                            placeholder="Write your comment here..." 
                            className="mt-2 w-full p-2 rounded-md border border-gray-300"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-end space-x-2">
                <button 
                        className="bg-[#7f8c8d] text-white px-4 py-2 rounded-md hover:bg-opacity-80 cursor-pointer"
                        onClick={handleSendComment}
                    >
                        Send Comment
                    </button>
                    <button 
                        className="bg-[#7f8c8d] text-white px-4 py-2 rounded-md hover:bg-opacity-80 cursor-pointer"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </DialogFooter>
            </div>
        </Dialog>
    );
}
