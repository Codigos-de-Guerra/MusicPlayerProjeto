import './SidebarButton.css'

import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';

interface SideBarButtonProps {
  title: string;
  to: string;
  icon: JSX.Element;
}

export default function SidebarButton({title, to, icon} : SideBarButtonProps) {
  const isSignOut:boolean = (to === "");
  const signOut = (isSignOut : boolean) => {
    if(isSignOut) {
	    console.log("Cliquei pra sair! e contabilizou");
      window.localStorage.removeItem("token");
      window.location.reload();
    }
  }

  const location = useLocation();
  const isActive = location.pathname === to;
  const btnClassName = isActive ? "btn-body active" : "btn-body";

  return (
    <Link to={to}>
      <div className={btnClassName} onClick={() => signOut(isSignOut)}>
      <IconContext.Provider value={{size: '24px', className: "btn-icon"}}>
        {icon}
        <p className='btn-title'> {title} </p>
      </IconContext.Provider>
      </div>
    </Link>
  )
}