"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="Toggle theme"
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-yellow-500" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-48 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={`flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "light" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                >
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>Light Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={`flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === "dark" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                >
                    <Moon className="h-4 w-4 text-blue-400" />
                    <span>Dark Mode</span>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}