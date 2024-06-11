import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";

export default function UserWorkshopCard({ userWorkshop, commissionDate, commissionName }) {
    return (
        <>
            <a href="#"
               className="relative mb-4 block max-w-md p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
                <div className="flex justify-items-start items-center mb-3">
                    <h5 className="text-3xl font-bold tracking-tight text-brand-orange light:text-white">{userWorkshop.name}</h5>
                    <p className="ml-4 mt-4 font-bold text-xs text-gray-400 light:text-gray-400">{userWorkshop.category}</p>
                </div>
                <p className="mb-4 text-xl font-bold tracking-tight text-gray-700 light:text-white">{commissionName}</p>
                <p className="mt-4 text-gray-700 light:text-gray-400">
                    {userWorkshop.materials}
                </p>
                <div className="absolute bottom-4 right-4 flex items-center text-gray-700 light:text-gray-400">
                    <AiTwotoneCalendar className="mr-2"/>
                    <span>{commissionDate}</span>
                </div>
            </a>
        </>
    );
}