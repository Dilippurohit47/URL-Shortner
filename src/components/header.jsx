import React from "react";
import LOGO from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Link2Icon,
  Link2OffIcon,
  LogOut,
  LucideChartGantt,
} from "lucide-react";
import { urlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { getUser, logOut } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();

  const { loading, fn: logout } = useFetch(logOut);

  const { user ,fetchUser } = urlState();
  return (
    <>
    <nav className="py-4 px-10 flex justify-between items-center">
      <Link to="/">
        <img src={LOGO} className="h-16" alt="logo" />
      </Link>
      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full outline-none overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={user.user_metadata.profile_pic}
                  className="object-contain"
                />
                <AvatarFallback>PFP</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/dashboard"} className="flex items-center "> 
                <Link2Icon className="mr-2 h-4 w-4 text-blue-500 " />
                My Links
                </Link>
               
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span
                  onClick={() => {
                    logout().then(() => {
                      fetchUser();
                      navigate("/");
                    });
                  }}
                >
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
    {loading && <BarLoader className="mb-4" width={"100%"} color="blue" />}

    </>

  );
};

export default Header;
