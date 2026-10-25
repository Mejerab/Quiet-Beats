import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../User/Login";
import Register from "../User/Register";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashContent from "../Dashboard/DashContent";
import AddSong from "../Dashboard/AddSong";
import Playlists from "../Dashboard/Playlist/Playlists";
import PlayAccess from "../Dashboard/playlist/PlayAccess";
import SongDetails from "../Dashboard/SongDetails";
import Favourites from "../Dashboard/playlist/Favourites";
import ArtistPage from "../Dashboard/ArtistPage";
import AllSongs from "../Dashboard/AllSongs";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <PrivateRoute><DashContent /></PrivateRoute>
      },
      {
        path: '/dashboard/upload',
        element: <PrivateRoute><AddSong /></PrivateRoute>
      },
      {
        path: '/dashboard/song/:id',
        element: <PrivateRoute><SongDetails /></PrivateRoute>
      },
      {
        path: '/dashboard/artist/:artist',
        element: <PrivateRoute><ArtistPage /></PrivateRoute>
      },
      {
        path: '/dashboard/favourites',
        element: <PrivateRoute><Favourites /></PrivateRoute>
      },
      {
        path: '/dashboard/playlists',
        element: <PrivateRoute><Playlists /></PrivateRoute>
      },
      {
        path: '/dashboard/all-songs',
        element: <PrivateRoute><AllSongs /></PrivateRoute>
      },
      {
        path: '/dashboard/playlist/:id',
        element: <PrivateRoute><PlayAccess /></PrivateRoute>
      },
    ]
  }
]);
export default router;