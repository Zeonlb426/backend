import React from 'react';
import Authenticated from '@/Layouts/Authenticated';

const PortfolioEdit = (props) => {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">Portfolio Edit</div>
                </div>
            </div>
        </div>
    );
}

PortfolioEdit.layout = page => <Authenticated children={page} title="Portfolio Edit"/>

export default PortfolioEdit
