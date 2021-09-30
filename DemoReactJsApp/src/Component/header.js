import React from 'react';



class Header extends React.Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/dashBoard">Demo Admin Panel</a>
                </nav>
            </>
        )
    }
}

export default Header;