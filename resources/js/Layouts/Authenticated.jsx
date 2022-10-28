import React, {useEffect, useState} from 'react';
import { Head, usePage } from '@inertiajs/inertia-react';
import SideBar from '../Component/SideBar';
import Header from "@/Component/Header";

// console.log(children.props.prefix);
// console.log(window.location.pathname);

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
export default function Authenticated({children, title}) {
    const [showingMenu, setShowingMenu] = useState(getWindowDimensions().width > 1279);

    useEffect(() => {
        function handleResize() {
            setShowingMenu(getWindowDimensions().width > 1279);
        }
        window.addEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        // localStorage.theme = 'dark';
        // localStorage.theme = 'light';
        // localStorage.removeItem('theme');
    }, []);

    return (
       <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
           <Head title={title} />
           <SideBar showingMenu={showingMenu} setShowingMenu={setShowingMenu}/>
           <main className={classNames('p-4 ml-0 ', showingMenu ? ' lg:ml-72' : '')}>
               <Header className="w-full flex h-16 items-center px-6 justify-between" setShowingMenu={setShowingMenu} showingMenu={showingMenu}/>
               <div className="w-full py-6">
                   {children}
               </div>
           </main>
       </div>
    );
}
