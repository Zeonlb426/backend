import React from "react";
import TitlePage from "@/Component/TitlePage";

export default function HeaderPage({ title, subTitle, description, children }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <TitlePage title={title} subTitle={subTitle} description={description}/>
            <div className="flex gap-2 items-center">
                {children}
            </div>
        </div>
    );
}