import React from "react";
import Link from "next/link";

export default function Download(){
    return (
        <h1 className="glass-slab PDF">A PDF version of my CV is available <Link href="/ApnatvaSinghRawatCV.pdf" className="download-link">here</Link></h1>
    );
}