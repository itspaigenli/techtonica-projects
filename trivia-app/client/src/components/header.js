const Header = (props) => {

  let message;
  if (props.user) {
    message = `Welcome to our Trivia game, ${props.user}!`;
  } else {
    message = `Welcome to Our Trivia Game!`;
  }
  
  return (
    <div className={"textHeader"}>
      <h3>{message}</h3>
    </div>
  );
};

export default Header;