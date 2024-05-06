import { Link } from "react-router-dom";

interface BtnModalI {
  isLink: boolean;
  to?: string;
  btnFunc?: () => void;
  children: React.ReactNode;
}

function BtnModal({ isLink, to, btnFunc, children }: BtnModalI) {
  return isLink && to ? (
    <Link
      to={to}
      className="border-2 py-2 px-4 border-slate-950 hover:border-slate-800 hover:text-slate-800"
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      onClick={btnFunc}
      className="border-2 py-2 px-4 border-slate-950 hover:border-slate-800 hover:text-slate-800 "
    >
      {children}
    </button>
  );
}

export default BtnModal;
