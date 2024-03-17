import React from "react"
import { Posts } from "../features/posts/Posts"
import Profile from "../features/profile/Profile"
import About from "../features/about/About"
import { RoutesType } from "./types/RouteTypes"
import Post from "../components/Post/Post"

const screens = {
    Posts,
    Profile,
    About,
    Post,
}

type RoutesKeys = keyof typeof screens
export const routes: RoutesType<RoutesKeys> = {
    Posts: {
        path: "/",
        title: "Posts",
        element: <Posts />,
    },
    Profile: {
        path: "/profile",
        title: "Profile",
        element: <Profile />,
    },
    About: {
        path: "/about",
        title: "About",
        element: <About />,
    },
    Post: {
        path: "/posts/:id",
        title: "Post",
        element: <Post />,
    },
}
