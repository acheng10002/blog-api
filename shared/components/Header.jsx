// default mode is access
const Header = ({ mode = "access", user, onLogin, onRegister, onLogout }) => {
  // if user is logged in, button says logout, otherwise evaluate mode
  const buttonLabel = user
    ? "Logout"
    : // if mode is access, button says login to comment
      mode === "access"
      ? "Login to Comment"
      : // if mode is edit, button says login to post
        "Login to Post";

  return (
    <header className="header">
      <h1 className="title">Blog API</h1>
      {!user && (
        <>
          {/* sends user to "/users/register" */}
          <button onClick={onRegister}>Register</button>
          {/* sends user to "/auth/login" */}
          <button onClick={onLogin}>{buttonLabel}</button>
        </>
      )}
      {/* if user is logged in, onLogout, handles logout */}
      {user && <button onClick={onLogout}>Logout</button>}
    </header>
  );
};

export default Header;
