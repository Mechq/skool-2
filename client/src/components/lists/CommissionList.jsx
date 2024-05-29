import React, {useState, useEffect} from "react";

export default function CommissionList({commissions}) {


    return (
        <div>
            <ul className="list">
                {commissions.map(commission => (
                    <li key={commission.id}>
                        {commission.details}
                    </li>
                ))}
            </ul>
        </div>
    );
}
