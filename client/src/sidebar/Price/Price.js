import Input from "../../components/Input";
import "./Price.css"


function Price({dataFromPrice}) {


    const handleChange = (event) => {
        dataFromPrice(event.target.value)
      };

    


  return <div className="ml">
    <h2 className="sidebar-title price-title">Price</h2>

    <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value="" name="test2"/>
        <span className="checkmark"></span>All
        </label>


        <Input handleChange={handleChange}
          value={100000}
          title="0-100000"
          name="test1"
          color="black"
        />

        <Input handleChange={handleChange}
          value={200000}
          title="100000-200000"
          name="test1"
          color="blue"
        />

        <Input handleChange={handleChange}
          value={300000}
          title="200000-300000"
          name="test1"
          color="red"
        />

        <Input handleChange={handleChange}
          value={400000}
          title="$400000+"
          name="test1"
        />

    </div>
}

export default Price;