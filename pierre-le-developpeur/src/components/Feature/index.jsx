function Features({ feature }) {
  return (
    <div className="feature-item">
      <img src={feature.icon} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{feature.title}</h3>
      <p>{feature.content}</p>
    </div>
  );
}

export default Features;
