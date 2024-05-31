import React from "react";

export default function CommissionList({setSidePanelContent, commissions, setCommissionId, setShowSidePanel}) {

    const editCommission = (id) => {
        setCommissionId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
    };

    return (
        <div>
            <ul className="list">
                {commissions.map(commission => (
                    <li key={commission.id} onClick={() => editCommission(commission.id)}>
                        {commission.details}
                    </li>
                ))}
            </ul>
        </div>
    );
}
