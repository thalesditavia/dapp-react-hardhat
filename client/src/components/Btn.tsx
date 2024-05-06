import { Link } from "react-router-dom";

interface BtnI {
  isLink?: boolean;
  to?: string;
  btnType?: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
}

function Btn({ isLink, to, btnType, children }: BtnI) {
  return isLink && to ? (
    <Link
      to={to}
      className="mb-8 block bg-slate-500 p-2 w-2/6 text-center rounded-md font-semibold text-base hover:text-slate-800"
    >
      {children}
    </Link>
  ) : (
    <button
      type={btnType}
      className="mb-8 block bg-slate-500 p-2 w-2/6 text-center rounded-md font-semibold hover:text-slate-800"
    >
      {children}
    </button>
  );
}

export default Btn;
