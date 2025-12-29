const CreatedBy = () => {
  const content = (
    <div>
      <img
        src={"/AI-ffinity_Logo_Dark.png"}
        alt={`AI|ffinity logo`}
        style={{
          height: 24,
          opacity: 0.85,
        }}
      />
      <div>Created with ❤️ by AI|ffinity</div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "right",
        justifyContent: "center",
        gap: "0.5em",
        fontSize: "0.75rem",
        color: "#6b7280",
        marginTop: "1.5em",
      }}
    >
      <a
        href={"https://aiffinity.com/"}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
      >
        {content}
      </a>
    </div>
  );
};

export default CreatedBy;
