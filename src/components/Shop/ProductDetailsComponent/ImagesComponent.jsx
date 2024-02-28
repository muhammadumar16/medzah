const ImagesComponent = (props) => {
  const { item } = props;
  return (
    <>
      {/* {item?.imageOptions?.map((option) => ( */}
      <div className="col-lg-4 col-md-5">
        <div className="tiny-single-item">
          <div className="tiny-slide">
            <img
              src={`${item?.lstProductImages[0].ProductImage}`}
              className="img-fluid rounded"
              alt="Image"
              // style={{ height: 400, width: 400 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagesComponent;
