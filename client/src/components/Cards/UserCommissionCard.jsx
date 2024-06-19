import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";

export default function UserWorkshopCard({userWorkshop, commissionDate }) {
    return (
        <a href="#" className="relative mb-4 block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-brand-orange">{userWorkshop.name}</h5>
            <p className="mb-2 font-bold text-gray-700">{userWorkshop.category}</p>
            <p className="mb-4 text-gray-700">{userWorkshop.materials}</p>
            <div className="flex items-center text-gray-700">
                <AiTwotoneCalendar className="mr-2" />
                <span>{commissionDate}</span>
            </div>
        </a>
    );
}