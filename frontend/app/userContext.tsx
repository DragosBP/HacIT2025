"use client";
import React, {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
} from "react";
import { User } from "./utils/interfaces";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

interface UserContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
            const token = secureLocalStorage.getItem("token");

            if (!token) {
				setLoading(false);
                return;
            }

			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
					headers: {
                        Authorization: `Bearer ${token}`,
                    },
				});

				if (response.status === 200) {
					setUser(response.data);
				}
			} catch {
				setUser(null);
			}

			setLoading(false);
		};
		fetchUserData();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};