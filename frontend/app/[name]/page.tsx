import NavBar from "../components/nav";
import ReviewsWithModal from "../components/CommentWithModal";
import { Cartier } from "../utils/interfaces";
import axios from "axios";

interface PageProps {
    params: { name: string };
}

export default async function Page({ params }: PageProps) {
    const { name } = params;
    const { data } = await axios.get<Cartier[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/cartier/name/${name}`
    );

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col bg-[#7f8c8d] min-h-screen">
                <NavBar />
                <h1 className="text-center text-3xl font-bold mt-4">
                    Nu s-au găsit date pentru {name}
                </h1>
            </div>
        );
    }

    const cartierData = data[0];

    return (
        <div className="flex flex-col bg-[#7f8c8d] min-h-screen">
            <NavBar />
            <h1 className="text-center text-3xl font-bold mt-4 text-[#2D2D2D]">
                {cartierData.name}
            </h1>
            <div className="p-4 text-[#2D2D2D]">
                <p><strong>City:</strong> {cartierData.city}</p>
                <p><strong>Sector:</strong> {cartierData.sector}</p>
                <p><strong>Location:</strong> <a href={cartierData.loc}>{cartierData.loc}</a></p>
                <h2 className="text-2xl mt-4">Reviews</h2>

                <ReviewsWithModal reviews={cartierData.reviews} />
            </div>
        </div>
    );
}
