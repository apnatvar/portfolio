import { useGlitch } from 'react-powerglitch';

export default function GlitchText( {Text} ) {
    const glitch = useGlitch();

    return (
    <h1 ref={glitch.ref}>{Text}</h1>
    );
}