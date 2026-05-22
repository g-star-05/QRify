const TemplateCard = ({
  title,
  description,
  category,
  image,
}) => {
  return (
    <div className="template-card">

      {/* IMAGE */}
      <div className="template-image">

        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="template-placeholder">
            QR
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="template-content">

        <span className="template-category">
          {category}
        </span>

        <h2>{title}</h2>

        <p>{description}</p>

        <button>
          Use Template
        </button>

      </div>

    </div>
  );
};

export default TemplateCard;