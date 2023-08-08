
const Input = ({handleChange, value, name}) => {
    return (
      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value={value} name={name}/>
        <span className="checkmark"></span>
      </label>
    );
  };
  
  export default Input;