import Link from "next/link";
const Header = () => {
  return (
    <header className="py-2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-4">
            <div className="logo">
              <Link href="/">
                <a>BookFinder</a>
              </Link>
            </div>
          </div>
          <div className="col-8">
            <div className="text-right">
              <Link href="/login">
                <a className="btn btn-primary">logout</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
