import './Home.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';

import Library from '../Library/Library'
import Favorites from "../Favorites/Favorites";
import Player from "../Player/Player";
import Sidebar from '../../components/Sidebar/Sidebar';
import Login from '../Login/Login';

import { setClientToken } from '../../spotify';

type HomeProps = {}
export default function Home({}: HomeProps) {

  const [token, setToken] = useState("");
  
  useEffect(() => {
    const tokenTmp = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!tokenTmp) {
      if(hash) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
        setClientToken(_token);
      }
    } else {
      setToken(tokenTmp);
      setClientToken(tokenTmp);
    }
  }, []);

  return !token ? (<Login/>) :
  (
    <BrowserRouter>
      <div className='main-body'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
