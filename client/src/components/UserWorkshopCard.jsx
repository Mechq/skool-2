import React from "react";
import {AiTwotoneCalendar, AiTwotoneClockCircle, AiTwotoneEuro} from "react-icons/ai";

export default function UserWorkshopCard({
                                             userWorkshop,
                                             commissionDate,
                                             commissionName,
                                             commissionTime,
                                             commissionPay
                                         }) {
    return (
        <>
            <a href="#"
               className="relative mb-8 block max-w-2xl p-12 bg-white border border-gray-300 rounded-lg shadow-lg hover:bg-gray-100 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
                <div className="flex justify-start items-center mb-1">
                    <h5 className="text-4xl mb-2 font-bold tracking-tight text-brand-orange light:text-white">{userWorkshop.name}</h5>
                    <p className="ml-4 mt-4 font-bold text-sm text-gray-500 light:text-gray-400">{userWorkshop.category}</p>
                </div>
                <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center text-gray-700 light:text-gray-400">
                        <div className="flex items-center mb-2 sm:mb-0 sm:mr-1">
                            <AiTwotoneCalendar className="mr-2"/>
                            <span>{commissionDate}</span>
                        </div>
                        <div className="flex items-center mb-2 sm:mb-0 sm:mr-1">
                            <AiTwotoneClockCircle className="mr-2"/>
                            <span>{commissionTime}</span>
                        </div>
                        <div className="flex items-center">
                            <AiTwotoneEuro className="mr-2"/>
                            <span>€ {commissionPay}</span>
                        </div>
                    </div>
                    <p className="text-2xl  mt-4 font-bold tracking-tight text-gray-800 light:text-white">Opdracht: {commissionName}</p>
                </div>
                <p className="mt-6 text-lg text-gray-700 light:text-gray-400">
                    {userWorkshop.materials}
                </p>
            </a>
        </>
    );
}
