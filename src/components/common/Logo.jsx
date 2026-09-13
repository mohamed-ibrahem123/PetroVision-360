import { Link } from 'react-router-dom';
import logoSrc from '../../assets/logo.svg';

export default function Logo({ className = '', fontColor, fontSize }) {
  const dynamicStyle = {};
  if (fontColor) dynamicStyle.color = fontColor;
  if (fontSize) dynamicStyle.fontSize = fontSize;

  return (
    <Link to="/" className={`pv-logo flex items-center gap-3 ${className}`} style={{ textDecoration: 'none' }}>
      <img
        src={logoSrc}
        alt="PetroVision 360 Logo"
        className="pv-logo-img"
        width="44"
        height="44"
      />
      <span className="pv-brand-text" style={dynamicStyle}>
        PETRO VISION360
      </span>
    </Link>
  );
}
