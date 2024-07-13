import { Link, useLocation } from 'react-router-dom';
import './SidebarButton.css'
import { IconContext } from 'react-icons';

interface SideBarButtonProps {
  title: string;
  to: string;
  icon: JSX.Element;
  isSignOut: boolean
}

export default function SidebarButton({title, to, icon, isSignOut} : SideBarButtonProps) {

  const location = useLocation();
  const isActive = location.pathname === to;
  const btnClassName = isActive ? "btn-body active" : "btn-body";
  
  const signOut = () => {
    window.localStorage.setItem("token", "");
  }

  return (
    <Link to={to}>
      <div className={btnClassName}>
      <IconContext.Provider value={{size: '24px', className: "btn-icon"}}>
        {icon}
        <p className='btn-title'> {title} </p>
      </IconContext.Provider>
      </div>
    </Link>
  )
}