import Link from "next/link";

function Navbar() {
  return(
    <div className="shadow-lg bg-Hamagon flex justify-between items-center pr-5 text-white sticky top-0 z-10">
      <Link href="/">
        <h1 className="text-2xl py-5 px-5 cursor-pointer">Navbar.</h1>
      </Link>
      <div className="links flex gap-10">
        <Link href="/">
          Home
        </Link>
        <Link href="/check-health">
          Check Health
        </Link>
      </div>
    </div>
  )
}

export default Navbar;