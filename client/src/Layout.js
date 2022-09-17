import Sidebar from './components/Sidebar';

function Layout({navItems, children}) {
    return (
      <div className="App">
        <Sidebar items={navItems} />
        {children}
      </div>
    );
}

export default Layout;
