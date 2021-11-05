import Link from 'next/link'

export default function Layout({children}) {
    return (
        <div className = "layout">
            <header>
                <Link href="/">
                    <a>
                        <h1>
                            <span>the</span>
                            <span>Store</span>
                        </h1>
                    </a>
                </Link>
            </header>
        <div className="page-content">
            {children}
        </div>
        <footer>
            <p>
                Copyright 2021 The Store.
            </p>
        </footer>
        </div>
    )
}
