import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';

function AppNavigation({ navItems }) {
  return (
    <>
      {navItems && (
        <nav id='app-navigation'>
          <ul>
            {navItems.map((item, key) => {
              return (
                <li key={key}>
                  <NavLink to={item.to} exact>
                    <span className='icon'>{item.icon && item.icon}</span>
                    <span className='text'>{item.title && item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}

function AppInner({ title, backToPath, helmet, children }) {
  const backPath = backToPath ? backToPath : '/';
  const helmetString = helmet ? helmet : title ? title : '';

  return (
    <>
      <Helmet>
        <title>{helmetString}</title>
      </Helmet>
      <div id='app-inner'>
        <div id='app-header'>
          <Link to={backPath} id='back-to-link'>
            <i className='material-icons'>arrow_back</i>
          </Link>
          <div id='app-title'>{title && title}</div>
        </div>
        <div id='app-content'>{children}</div>
      </div>
    </>
  );
}

function AppContainer({ children, navItems, className }) {
  return (
    <div id='app-container' className={className}>
      {children}
      {navItems && <AppNavigation navItems={navItems} />}
    </div>
  );
}

export { AppContainer, AppInner };
