const BODY_PATH = 'M50 6C38 6 30 16 30 28C30 34 32 39 35 43C20 52 10 72 10 100C10 132 26 154 50 154C74 154 90 132 90 100C90 72 80 52 65 43C68 39 70 34 70 28C70 16 62 6 50 6Z';
const APRON_PATH = 'M14 95C14 95 30 105 50 105C70 105 86 95 86 95C90 110 90 132 78 144C68 152 58 154 50 154C42 154 32 152 22 144C10 132 10 110 14 95Z';

export function Doll({ body, apron, mark, size = 100, className = '', style }) {
  return (
    <svg viewBox="0 0 100 160" width={size} height={size * 1.6} className={className} style={style}>
      <path fill={body} d={BODY_PATH} />
      <path fill={apron} d={APRON_PATH} />
      <circle cx="40" cy="34" r="3.2" fill="#2E1A2C" />
      <circle cx="60" cy="34" r="3.2" fill="#2E1A2C" />
      <path d="M42 44C45 47 55 47 58 44" stroke="#2E1A2C" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="40" r="3" fill={mark} opacity="0.5" />
      <circle cx="68" cy="40" r="3" fill={mark} opacity="0.5" />
      <circle cx="50" cy="126" r="5" fill={mark} />
    </svg>
  );
}

export default function DollTrio() {
  return (
    <div className="doll-trio" aria-hidden="true">
      <Doll body="#B84F29" apron="#3E1B34" mark="#E8A93B" size={56} className="doll doll-back" />
      <Doll body="#D9683B" apron="#5C2A4D" mark="#F2C572" size={78} className="doll doll-mid" />
      <Doll body="#E8A93B" apron="#7C9473" mark="#FBF1E1" size={62} className="doll doll-front" />
    </div>
  );
}
