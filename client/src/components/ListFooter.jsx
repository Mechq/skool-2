import React from "react";

export default function ListFooter({amountOfRows, totaalAantalString}) {

    return (
        <div className="w-full">
            <div className="relative overflow-hidden bg-white rounded-b-lg shadow-md light:bg-gray-800">
                <nav className="flex flex-row items-center justify-between p-4" aria-label="Table navigation">
                    <section/>
                    <p className="text-sm">
                        <span className="font-normal text-gray-500 light:text-gray-400">Totaal aantal {totaalAantalString}: </span>
                        <span className="font-semibold text-gray-900 light:text-white">{amountOfRows}</span>
                    </p>
                </nav>
            </div>
        </div>
    );
}