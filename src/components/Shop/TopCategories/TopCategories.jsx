import { Link } from "react-router-dom";

const TopCategories = (props) => {
  const { select } = props;
  console.log("select top", select);
  return (
    <>
      {select?.map((option) => (
        <div key={option?.id} class="col-lg-2 col-md-4 col-6 mt-4">
          <Link
            to="#"
            className="card explore-feature border-0 rounded text-center"
          >
            <div class="card-body">
              <img
                src={option?.image}
                class="avatar avatar-small rounded-circle shadow-md"
                alt=""
              />
              <div class="content mt-3">
                <h6 class="mb-0 text-dark">{option.label}</h6>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

TopCategories.propTypes = {
  // bla: PropTypes.string,
};

TopCategories.defaultProps = {
  // bla: 'test',
};

export default TopCategories;
