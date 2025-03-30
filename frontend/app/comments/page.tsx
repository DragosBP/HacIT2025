import { useEffect, useState } from "react";
import { CommentsProps } from "../utils/interfaces";
import axios from "axios";

export default function Comments({ reviewId }: CommentsProps) {

    const [comments, setComments] = useState([])

    useEffect(() => {
        const getComments = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`)
        }

        getComments()
    }, [])

    return(
        <>
        </>
    )
}