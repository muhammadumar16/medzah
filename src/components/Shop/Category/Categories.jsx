import { Link } from "react-router-dom";
import ProductBadges from "./ProductBadges";
import ProductIcons from "./ProductIcons";
import ProductImages from "./ProductImages";
import ProductRating from "./ProductRating";
import { currencySymbol } from "utility/Currency";

const Categories = (props) => {
  const { select } = props;

  const truncateDescription = (description) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length <= 10) return description;
    return words.slice(0, 10).join(" ") + "...";
  };
  return (
    <>
      {select.map((item, index) => (
        <div className="col mt-4" key={index}>
          <div className="card shop-list border-0 overflow-hidden rounded">
            {/* {select?.productBadges?.length && (
          <ProductBadges ProductBadges={select?.productBadges} />
        )} */}

            <div className="shop-image position-relative overflow-hidden">
              {/* {select?.imageOptions?.length && (
            <ProductImages imageOptions={select?.imageOptions} />
          )} */}
              <Link to={`/productdetails/${item.Id}`}>
                <img
                  src={item?.lstProductImages?.[0]?.ProductImage}
                  className="img-fluid"
                  alt={`${item?.description}`}
                />
              </Link>
              {/* {select?.outOfStock && (
            <div class="overlay-work">
              <div class="py-2 bg-soft-dark out-stock">
                <h6 class="mb-0 text-center">Out of stock</h6>
              </div>
            </div>
          )} */}
              {/* {select?.colorIcons?.length && (
            <ProductIcons colorIcons={select?.colorIcons} />
          )} */}
            </div>
            <div className="card-body content p-3 border-top">
              <Link
                to={`/productdetails/${item.Id}`}
                className="text-dark product-name h6"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 2, // Number of lines to show
                  lineHeight: "1.2em", // Line height
                  maxHeight: "2.4em", // Max height of 2 lines
                }}
              >
                {truncateDescription(item?.ProductTitle)}
              </Link>
              <div className="d-flex justify-content-between mt-1">
                <h6 className="text-dark small fst-italic mb-0 mt-1">
                  Price:{" "}
                  <strong>
                    {currencySymbol} {(item?.Price).toFixed(2)}
                  </strong>
                  {/* <del className="text-danger ms-2">
                    {select?.delPrice}
                  </del>{" "} */}
                </h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

Categories.propTypes = {
  // bla: PropTypes.string,
};

Categories.defaultProps = {
  // bla: 'test',
};

export default Categories;
