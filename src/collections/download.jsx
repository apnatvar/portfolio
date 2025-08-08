import React from "react";
import Link from "next/link";

export default function Download(){
    return (
        <p className="glass-slab PDF">A PDF version of my CV is available <Link href="/ApnatvaSinghRawatCV.pdf">here</Link></p>
    );
}