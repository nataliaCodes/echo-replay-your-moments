export default function Logout(props) {

  return (

    <div className="NavbarItem" onClick={props.onClick}>
      <h4>{props.children}</h4>
    </div>

  );
}