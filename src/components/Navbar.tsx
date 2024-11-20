import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";

export default function Navbar(){
    return (
        <header className="shadow-sm">
            <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-1=3">
                <Image src={logo} alt="JobBoard logo" width={40} height={40} />
                    <span className="text-xl font-bold tracking-tight">JobBoard</span>
                </Link>
                <Button asChild>
                    <Link href="/jobs/new">Post a job</Link>
                </Button>
            </nav>
        </header>

    )
}