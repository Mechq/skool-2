import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";

export default function UserWorkshopCard({ userWorkshop, commissionDate }) {
    return (
        <>
            <a href="#"
               className="relative mb-4 block max-w-md p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
                <h5 className="mb-4 text-3xl font-bold tracking-tight text-brand-orange light:text-white">{userWorkshop.name}</h5>
                <p className="mb-4 font-bold text-gray-700 light:text-gray-400">{userWorkshop.category}</p>
                <p className="mt-4 text-gray-700 light:text-gray-400">
                    {userWorkshop.materials}
                </p>
                <div className="absolute bottom-4 right-4 flex items-center text-gray-700 light:text-gray-400">
                    <AiTwotoneCalendar className="mr-2" />
                    <span>{commissionDate}</span>
                </div>
            </a>
        </>
    );
}
