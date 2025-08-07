'use client'
import { useGlitch } from 'react-powerglitch';

export default function GlitchText( {Text} ) {
    const glitch = useGlitch();

    return (
    <span ref={glitch.ref}>{Text}</span>
    );
}