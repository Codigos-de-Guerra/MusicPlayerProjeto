import './Sidebar.css'
import SidebarButton from './SidebarButton'

import { MdFavorite} from "react-icons/md";
import { FaPlay, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { useEffect, useState } from 'react';

import apiClient from '../../spotify';

interface SideBarProps {}

export default function Sidebar({}: SideBarProps) {
  const [profileImg, setProfileImg] = useState('https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg')

  useEffect(() => {
    apiClient.get("me").then( (response : any) => {
      const result = response.data.images[0]
      //console.log(result)
      if(result) {
        setProfileImg(result.url);
      }
    });
  }, []);
    
  return (
    <div className='sidebar-container'>
      <img
        className='profile-img'
        alt='profile'
        src={profileImg}
      />
      <div className='sidebarButtons-container'>
        <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite /> } />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SidebarButton title="Sign out" to="" icon={<FaSignOutAlt />} />
    </div>);
}