// import the essential modules and components utilized in this component
import "./ProductPlaceholderMessage.css";

// this component displays a placeholder message that is supplied to it through props attributes
// this allows us to show various messages from the product page
const ProductPlaceholderMessage = (props) => {
  return (
    <div className="placeholderMessage">
      {props.message}
    </div>
  );
};

export default ProductPlaceholderMessage;