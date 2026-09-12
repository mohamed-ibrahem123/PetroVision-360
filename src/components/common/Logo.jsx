import logoSrc from '../../assets/logo.svg';

export default function Logo({ className = '' }) {
  return (
    <div className={`pv-logo flex items-center gap-3 ${className}`}>
      <img
        src={logoSrc}
        alt="PetroVision 360 Logo"
        className="pv-logo-img"
        width="44"
        height="44"
      />
      <span className="pv-brand-text">
        PETRO VISION360
      </span>
    </div>
  );
}
